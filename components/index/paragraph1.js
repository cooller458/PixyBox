import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { create } from "ipfs-http-client";
import Breadcrumbs from "../breadcrumbs";

import Web3 from "web3";
import NFT from "../../public/abis/NFT.json";
import LoaderDialog from "../dialog/loader";
import { SuccessDialog } from "../dialog/success";
import { useSelector } from "react-redux";
import InputError from "../dialog/InputError";
import SelectBoxError from "../dialog/SelectBoxError";
import ChoseBoxError from "../dialog/ChoseBoxError";
import DescError from "../dialog/DescError";
import PriceError from "../dialog/PriceError";
const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");
const nftInfos = {
  price: "",
  name: "",
  ChooseBox: "",
  category: "",
  description: "",
  imgUrl: "",
};
export default function Paragraph1() {
  const title = "Where Words Fail, Art Speaks";
  const descriptionn = "DISCOVER UNIQUE NFTs. Buy and sell with BNB";
  const [nftModel, setNftModel] = useState(false);
  const breadcrubs = ["Create NFT Box"];
  const [isHovering, setIsHovering] = useState(false);
  const [nftContract, setNFtContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const [addMetaMask, setAddMetaMask] = useState();
  const ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      console.log("mask var");
      setAddMetaMask(true);
      return true;
    }
    console.log("mask yok");
    setAddMetaMask(false);
    return false;
  };
  useEffect(() => {
    ethEnabled();
  }, []);
  const account = useSelector((state) => state.wallet.account);
  const web3 = useSelector((state) => state.wallet.web3);

  const [buttonTitle, setButtonTitle] = useState("Please Fill All Fields");

  const [box, setBoxContract] = useState(null);
  const [lootcontract, setLootcontract] = useState(null);
  const [unsoldItems, setUnsoldItems] = useState(null);
  const [dateError, setDateError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [CreateBtn, setCreateBtn] = useState(true);
  const [img, setImg] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const [nftFormInput, setNftFormInput] = useState(nftInfos);

  const [urlHash, setUrlHash] = useState();
  const onChange = async (e) => {
    const file = e.target.files[0];
    let files = Array.from(e.target.files);
    files.forEach(async (img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(`${img.name} dedteklenmeyen formatta`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} desteklenen boyuttan büyük`);
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      try {
        console.log("after try");
        const addedFile = await ipfsClient.add(file);

        const ipfsUrl = `https://ipfs.infura.io/ipfs/${addedFile.path}`;
        console.log(ipfsUrl);
        setUrlHash(ipfsUrl);
        setNftFormInput({ ...nftFormInput, imgUrl: ipfsUrl });
      } catch (e) {
        console.log(e);
      }
    });
    console.log(error);
  };

  const { price, name, category, description, imgUrl, ChooseBox } =
    nftFormInput;
  const valid = (price, name, category, description, imgUrl, ChooseBox) => {
    if (
      price === "" ||
      name === "" ||
      category === "" ||
      description === "" ||
      imgUrl === "" ||
      ChooseBox === ""
    )
      return "eksik";
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    console.log("şuan burda button durumu", CreateBtn);

    const errMsg = valid(
      nftFormInput.price,
      nftFormInput.name,
      nftFormInput.category,
      nftFormInput.description,
      nftFormInput.imgUrl,
      nftFormInput.ChooseBox
    );
    console.log(errMsg, "valid degeri buda");
    if (errMsg === "eksik") {
      console.log(errMsg, "abi bu ne");
      setCreateBtn(true);
    } else {
      setCreateBtn(false);
    }
    setNftFormInput({ ...nftFormInput, [name]: value });
  };
  console.log(nftFormInput);
  const createNftValidation = Yup.object({
    price: Yup.number().required("Lütfen bir değer girin"),
    name: Yup.string().required("lütfen bir isim girin"),
    category: Yup.string().required("Lütfen kategori seçin"),
    description: Yup.string().required("Lütfen açıklama girin"),
  });
  const [load, setLoad] = useState(false);
  const [errorr, setErrorr] = useState("");
  const [success, setSuccess] = useState("");
  const checkNftDetails = async () => {
    //Paths of Json File
    setLoad(true);
    const nftContratFile = await fetch("/abis/NFT.json");
    const marketContractFile = await fetch("/abis/NFTMarketPlace.json");
    //Convert all to json
    const convertNftContratFileToJson = await nftContratFile.json();
    const convertMarketContractFileToJson = await marketContractFile.json();
    //Get The ABI
    const markrtAbi = convertMarketContractFileToJson.abi;
    const nFTAbi = convertNftContratFileToJson.abi;

    const netWorkId = await web3.eth.net.getId();

    const nftNetWorkObject = convertNftContratFileToJson.networks[netWorkId];
    const nftMarketWorkObject =
      convertMarketContractFileToJson.networks[netWorkId];

    if (nftMarketWorkObject && nftMarketWorkObject) {
      const nftAddress = nftNetWorkObject.address;
      const marketAddress = nftMarketWorkObject.address;

      const deployedNftContract = await new web3.eth.Contract(
        nFTAbi,
        nftAddress
      );
      setNFtContract(deployedNftContract);
      const deployedMarketContract = await new web3.eth.Contract(
        markrtAbi,
        marketAddress
      );
      setMarketContract(deployedMarketContract);

      if (account) {
        //Start to create NFt Item Token To MarketPlace
        openLoaderModal();
        let createTokenResult = await deployedNftContract.methods
          .createNFtToken(urlHash)
          .send({ from: account });

        const tokenid = createTokenResult.events.Transfer.returnValues["2"];

        setIsActive(false);
        openLoaderModal();
        setButtonTitle("Wait Mint Processing the NFT");

        const marketFees = Number(nftFormInput.price) * (1.5 / 100); //1.5

        const feesToWei = Web3.utils.toWei(marketFees.toString(), "ether");

        const priceToWei = Web3.utils.toWei(nftFormInput.price, "ether");

        openLoaderModal();
        const lanchTheNFtForSale = await deployedMarketContract.methods
          .createItemForSale(nftAddress, tokenid, priceToWei)
          .send({ from: account });
        openLoaderModal();
        setLoad(false);
        setSuccess("Success");
        if (lanchTheNFtForSale) {
          openLoaderModal();
          router.push("/");
        }
      } else {
      }
    } else {
      setErrorr("You are at Wrong Network");
    }
  };

  const createBoxItem = async (e) => {
    const { price, name, description, category, imgUrl } = nftFormInput;
    if (!price || !name || !description || !category || !urlHash) return;
    setButtonTitle("Wait Mint Processing the NFT");
    openLoaderModal();

    const data = JSON.stringify({
      name,
      description,
      category,
      image: imgUrl,
    });
    try {
      setIsActive(false);
      const addedFile = await ipfsClient.add(data);
      const ipfsUrl = "htpps://ipfs.infura.io/ipfs/${addedfile.path}";
      createBoxItem(ipfsUrl);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const LoadContracts = async () => {
      const netWorkId = await web3.eth.net.getId();
    };
    web3 && account && LoadContracts();
  }, [web3 && account]);

  const createBoxItemForSale = async (url) => {
    //paths of json - json dosyaları
    const boxContractFile = await fetch("/abis/LootBox.json");
    const marketContractFile = await fetch(NEWJSONCONTRACTFİLE);
    //Json dönüştürme
    const convertMarketContractFileToJson = await marketContractFile.json();
    const convertBoxContratFileToJson = await boxContractFile.json();
    //get abi
    const marketAbi = convertMarketContractFileToJson.abi;
    const boxAbi = convertBoxContratFileToJson.abi;

    const networkId = await web3.eth.net.getId();

    const boxNetWorkObject = convertBoxContratFileToJson.networks[networkId];
    const NFTMarketWorkObject =
      convertMarketContractFileToJson.network[networkId];
    if (nftMarketWorkObject && nftMarketWorkObject) {
      const boxAddress = BoxNetWorkObject.address;
      const marketAddress = nftMarketWorkObject.address;

      const deployedBoxContract = await new web3.eth.net.Contract(
        boxAbi,
        boxAddress
      );
      setBoxContract(deployedBoxContract);
      const deployedMarketContract = await new web3.eth.net.Contract(marketAbi);
      setMarketContract(deployedMarketContract);

      if (account) {
        //start to create Box Item to market.
        openLoaderModal();
        let createTokenResult = await deployedBoxContract.methods
          .createBoxToken(url)
          .send({ from: account });

        const tokenId = createTokenResult.events.Transfer.returnValue["2"];

        console.log(tokenId);

        setIsActive(false);
        openLoaderModal();
        setButtonTitle("Waiting Box Processing the NFT");

        const marketFees = Number(nftFormInput.price) * (1.5 / 100); //1,5

        const feesTowei = web3.utils.toWei(marketFees.toString(), "ether");
        const priceToWei = web3.utils.toWei(nftFormInput.toString(), "ether");

        openLoaderModal();
        const lanchTheBoxForSale = await deployedMarketContract.methods
          .createBoxItemForSale(boxAddress, tokenId, priceToWei)
          .send({ from: account });
        openLoaderModal();

        if (lanchTheBoxForSale) {
          openLoaderModal();
          router.push("/");
        }
      } else {
      }
    } else {
      console.log("You're at Wrong Network");
    }
  };
  let [priceOpen, setPriceOpen] = useState(false);
  let [LoaderOpen, setLoaderOpen] = useState(false);
  let [successOpen, setSuccessOpen] = useState(false);

  function closePriceModal() {
    setPriceOpen(false);
  }
  function openPriceModal() {
    setPriceOpen(false);
  }
  function closeLoaderModal() {
    setLoaderOpen(false);
  }
  function openLoaderModal() {
    closePriceModal();
    setLoaderOpen(true);
    setTimeout(purchaseSuccesss, 1000);
  }
  function closeSuccessModal() {
    closePriceModal();
    closeLoaderModal();
    setSuccessOpen(false);
  }
  function openSuccessModal() {
    setSuccessOpen();
    closeLoaderModal();
  }
  function purchaseSuccesss() {
    closeLoaderModal();
    openSuccessModal();
  }
  const [dynamicCustomTokenName, setDynamicCustomTokenName] = useState("BNB");
  useEffect(() => {
    try {
      web3.eth.net.getId().then((netWorkId) => {
        switch (netWorkId) {
          case 5777:
            //codeblock
            setDynamicCustomTokenName("ETH");
            break;
          case 1:
            setDynamicCustomTokenName("ETH");
            break;
          case 56:
            setDynamicCustomTokenName("BNB");
            break;
          case 97:
            setDynamicCustomTokenName("BNB");
            break;
          case 80001:
            setDynamicCustomTokenName("ETH");
            break;
          case 137:
            setDynamicCustomTokenName("ETH");
            break;
          default:
            setDynamicCustomTokenName("BNB");
        }
      });
    } catch (e) {}
  }, [web3]);
  const [myMessage, setMyMessage] = useState(
    <>
      {" "}
      <div
        className=" absolute w-96 h-96 text-center loading"
        style={{
          background: "gray",
          color: "white",
          top: 0,
          width: "100%",
          height: "100%",
          left: 0,
          position: "absolute",
          zIndex: 9,
        }}
      >
        <svg width="380" height="380" viewBox="0 0 40 50">
          <polygon
            strokeWidth="1"
            stroke="#fff"
            fill="none"
            points="20,1 40,40 1,40"
          ></polygon>
          <text fill="#fff" x="5" y="47">
            Loading
          </text>
        </svg>
      </div>
    </>
  );
  const [laodMessage, setLoadMessage] = useState(
    "The process consists of two steps, please confirm all the steps and wait. This process may take some time."
  );

  return (
    <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:items-center m-8 sm:m-16 ">
      {/* left element */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h1 className="text-white dark:text-gray-800 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
          {title}
        </h1>
        <p className="text-white dark:text-gray-800 text-base leading-tight mt-2 sm:mt-6">
          {descriptionn}
        </p>
        <div className="flex-1 flex flex-row gap-4 mt-[4vw]">
          <div className="">
            <Link href="./categories">
              <button className="rounded-full  bg-[#e42876]  text-white text-xs sm:text-base px-6 sm:px-10 py-1.5 sm:py-2 shadow-lg">
                Collection
              </button>
            </Link>
          </div>
          <div className="">
            <button
              onClick={() => setNftModel(true)}
              className="rounded-full border text-white dark:text-gray-800 text-xs sm:text-base px-6 sm:px-10 py-1.5 sm:py-2 dark:border-gray-300 shadow-lg"
            >
              Create NFT
            </button>
            {nftModel ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden h-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="bg-[#373F4E] dark:bg-white">
                        <div className="w-full 2x1:max-w-screen-2x1 h-auto pt-[104px] m-auto">
                          <div className="flex flex-col mx-8 sm:mx-12 lg:mx-[9vw] space-y-6 py-12 text-white dark:text-white-gray-800">
                            {/* custom breadcrumbs*/}

                            <div className="border border-[#787984]"></div>

                            <div className="flex flex-col lg:flex-row items-center">
                              {/* left input element */}

                              <div className="w-full lg:w-[40%] flex-none flex flex-col space-y-4">
                                <Formik
                                  enableReinitialize
                                  initialValues={{
                                    price,
                                    name,
                                    category,
                                    description,
                                    img,
                                  }}
                                  validationSchema={createNftValidation}
                                  onSubmit={() => {}}
                                >
                                  {(formik) => (
                                    <Form className="register_form">
                                      <div className="bg-[#000000] dark:bg-white h-[160px] rounded-md border-dashed border border-[#9FA4FF] text-[#B4BAEF]">
                                        <label className="h-full flex flex-col text-center p-2 cursor-pointer">
                                          <div className="flex-1 text-6xl my-2">
                                            {urlHash ? (
                                              <img
                                                className="object-fit svg-inline--fa fa-image "
                                                width="60"
                                                src={urlHash}
                                                alt="preview image"
                                              />
                                            ) : (
                                              <FontAwesomeIcon
                                                icon={faImage}
                                                className=""
                                              />
                                            )}
                                          </div>
                                          <span className="flex-1 text-xs leading-normal">
                                            Drag and Drop File
                                          </span>
                                          <span className="flex-1 text-xs leading-normal">
                                            Browse Media on Your Device
                                          </span>
                                          <span className="flex-1 text-[8px] leading-normal">
                                            JPG, PNG, GIF, SVG, WEBM,{" "}
                                          </span>
                                          <input
                                            type="file"
                                            className="hidden"
                                            id="file-chooser"
                                            name="imgselect"
                                            onChange={onChange}
                                          />
                                        </label>
                                      </div>
                                      <InputError
                                        className="text-[B4BEAF] text-sm p-3.5 rounded-md border border-[#9FA4FF] bg-[#000000] dark:bg-white focus:outline-none focus:ring-2"
                                        type="text"
                                        placeholder="Box Tittle"
                                        name="name"
                                        onChange={handleRegisterChange}
                                      />
                                      <div>
                                        <SelectBoxError
                                          className="text-[#B4BEAF] text-sm px-3.5 py-3.5 rounden rounded-md border border-[#000000] bg-black  focus:outline-none focus:ring-2 appearance-none "
                                          handleRegisterChange={
                                            handleRegisterChange
                                          }
                                          placeholder="Chose Box"
                                          name="category"
                                        />
                                      </div>
                                      {nftFormInput.category === "Locked" ? (
                                        <>
                                          <p></p>
                                        </>
                                      ) : (
                                        <ChoseBoxError
                                          className="text-[#B4BEAF] text-sm px-3.5 py-3.5 rounden rounded-md border border-[#000000] bg-black  focus:outline-none focus:ring-2 appearance-none "
                                          handleRegisterChange={
                                            handleRegisterChange
                                          }
                                          placeholder="Chose Time"
                                          name="ChooseBox"
                                        />
                                      )}

                                      <PriceError
                                        type="text"
                                        placeholder="Price"
                                        name="price"
                                        onChange={handleRegisterChange}
                                      />
                                      <DescError
                                        className="text-[#B4BEAF] text-sm p-3.5 !w-full rounded-md border border-[#9FA4FF] bg-[#000000] dark:bg-white focus:outline-none focus=ring-2"
                                        rows={6}
                                        placeholder="Description"
                                        name="description"
                                        onChange={handleRegisterChange}
                                      />

                                      <div className="reg_btn_wrapper">
                                        {addMetaMask === false ? (
                                          <>
                                            <a
                                              href="#"
                                              className="rounded-full bg-[#a71d56]  text-white text-base px-6 sm:px-10 py-2 shadow-md m-auto"
                                              id="btn-create-nft"
                                            >
                                              Install MetaMask
                                            </a>
                                          </>
                                        ) : (
                                          <>
                                            {account === null ? (
                                              <>
                                                <button
                                                  className="rounded-full bg-[#a71d56]  text-white text-base px-6 sm:px-10 py-2 shadow-md m-auto"
                                                  id="btn-create-nft"
                                                  type="submit"
                                                >
                                                  Connect MetaMask
                                                </button>
                                              </>
                                            ) : (
                                              <>
                                                {load ? null : (
                                                  <>
                                                    <button
                                                      className="rounded-full bg-[#a71d56]   text-white text-base px-6 sm:px-10 py-2 shadow-md !m-auto"
                                                      id="btn-create-nft"
                                                      onClick={checkNftDetails}
                                                      type="submit"
                                                      disabled={CreateBtn}
                                                    >
                                                      Create Box
                                                    </button>
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        )}
                                      </div>
                                      {error}
                                    </Form>
                                  )}
                                </Formik>
                              </div>
                              {/*right art elements */}
                              <div className="flex-1 w-full h-full mt-8 lg:mt-0 pl-8 lg:pl-24 lg:pr-0">
                                <div className="relative w-full h-auto">
                                  {load ? (
                                    <>
                                      {" "}
                                      <div>{laodMessage}</div>
                                      <ClipLoader
                                        color="#ac1e59"
                                        loading={load}
                                        size={150}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <img
                                        src="/assets/png/PixyBoxRevisedTransparant.png"
                                        className="w-5/4"
                                      />
                                      <img
                                        src=""
                                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5"
                                      />
                                      {errorr && (
                                        <div className="error_text">
                                          {errorr}
                                        </div>
                                      )}
                                      {success && (
                                        <div className="success_text">
                                          {success}
                                        </div>
                                      )}
                                    </>
                                  )}

                                  <div className="absolute left-0 top-1/2 w-[57.5%] h-full flex flex-col items-start p-3 sm:p-6 lg:p-4 xl:pl-8">
                                    <h1 className="flex-none text-white text-xl sm:text-2x1 py-2 "></h1>
                                    <div className="flex-none flex flex-row items-center w-full">
                                      <div className="flex-none">
                                        <img src="" className="w-2/3" />
                                      </div>
                                      <p className="flex-grow text-white text-sm sm:text-x1"></p>
                                    </div>
                                    <div className="flex-grow"></div>
                                    <div className="">
                                      <div className="flex-1 flex flex-col space-y-1">
                                        <p className="text-xs"></p>
                                        <div className="mr-1">
                                          {/* <FontAwesomeIcon icon={faEthereum} className="" /> */}
                                        </div>
                                        <div className="flex flex-row text-xs sm:text-base lg:text-sm xl:text-base font-bold">
                                          <div></div>
                                          <div className="ml-1 sm:ml-2"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*footer*/}
                      <div className="flex items-center bg-[#373F4E] justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        {load ? (
                          <></>
                        ) : (
                          <>
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setNftModel(false)}
                            >
                              Close
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* right element : background image */}
      <div className="flex-1 flex items-left">
        <img
          src="favicon.ico"
          alt="BgEthereumNFT"
          className="w-2/3 h-auto object-cover"
        ></img>
      </div>
    </div>
  );
}
