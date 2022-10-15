import Head from "next/head";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Breadcrumbs from "../../components/breadcrumbs";
import ArtGallery3 from "../../components/explore/art-gallery3";
import { useWeb3 } from "../../components/web3";
import Web3 from "web3";
import axios from "axios";
import SuccessDialog from "../../components/dialog/success";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MyProfilePage() {
  const web3Api = new useWeb3();

  const [isLoading, setIsLoading] = useState(true);

  //Load Contracts Function
  const [nftContract, setNFtContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [nftAddress, setNFtAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [unsoldItems, setUnsoldItems] = useState([]);

  const [tokenContract, setTokenContract] = useState(null);
  const [tokenBalance, setTokenBalnce] = useState("0");
  const [creatorCommissionValueInwei, setCreatorCommissionValueInwei] =
    useState(null);

  //Load Contracts Function
  const [creathedItems, setcreathedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  //Craete function to listen the change in account changed and network changes

  //Create LoadAccounts Function
  const account = web3Api.account;

  useEffect(() => {
    const LoadContracts = async () => {
      //Paths of Json File
      const nftContratFile = await fetch("/abis/NFT.json");
      const marketContractFile = await fetch("/abis/NFTMarketPlace.json");
      //Convert all to json
      const convertNftContratFileToJson = await nftContratFile.json();
      const convertMarketContractFileToJson = await marketContractFile.json();
      //Get The ABI
      const markrtAbi = convertMarketContractFileToJson.abi;
      const nFTAbi = convertNftContratFileToJson.abi;

      const netWorkId = await web3Api.web3.eth.net.getId();

      const nftNetWorkObject = convertNftContratFileToJson.networks[netWorkId];
      const nftMarketWorkObject =
        convertMarketContractFileToJson.networks[netWorkId];

      if (nftMarketWorkObject && nftMarketWorkObject) {
        const nftAddress = nftNetWorkObject.address;
        setNFtAddress(nftAddress);
        const marketAddress = nftMarketWorkObject.address;
        setMarketAddress(marketAddress);

        const deployedNftContract = await new web3Api.web3.eth.Contract(
          nFTAbi,
          nftAddress
        );
        setNFtContract(deployedNftContract);
        const deployedMarketContract = await new web3Api.web3.eth.Contract(
          markrtAbi,
          marketAddress
        );
        setMarketContract(deployedMarketContract);

        if (account) {
          const data = await deployedMarketContract.methods
            .getMyItemCreated()
            .call({ from: account });

          setcreathedItems(data);
          const items = await Promise.all(
            data.map(async (item) => {
              const nftUrl = await deployedNftContract.methods
                .tokenURI(item.tokenId)
                .call();

              const priceToWei = Web3.utils.fromWei(
                item.price.toString(),
                "ether"
              );
              var config = {
                method: 'get',
                url: `${nftUrl}`,
                headers: { 
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjM2QwY2VlNC1kMGU3LTQ2YWUtYjYzYi00YmJiNTQyM2I5YmUiLCJlbWFpbCI6Im0ubXVyYXRkcnpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImEzMTBiYjQxNjYxZjg0YTdkZDc1Iiwic2NvcGVkS2V5U2VjcmV0IjoiN2QyMjZlMWRmYzU4YTliYzY1NWEyOThkNzUyY2M0MGQ3OGFmYTBiZTJjMmU1YmY3ZWQ5MzFhNTBkOWQyMGNiOSIsImlhdCI6MTY2NTQ4MjY2NH0.nR-jmcyjywSLGuhNjQ54FpygQh4p1lYPVTFn37iOArw'
                }
              };
              const metaData = await axios.get(nftUrl.split("/")[2] === 'gateway.pinata.cloud' ? `https://balancemainnft.mypinata.cloud/ipfs/${nftUrl.split("/")[4]}`:`/${nftUrl}`);

              let classChange;

              if (item.sold || item.soldFirstTime || !item.isBanned) {
                classChange = "Sold";
              } else {
                classChange = "Created";
              }

              //TODO: fix this object
              let myItem = {
                ClassChange: classChange,
                price: priceToWei,
                itemId: item.id,
                tokenId: item.tokenId,
                owner: item.owner,
                seller: item.seller,
                oldOwner: item.oldOwner,
                creator:
                  metaData.data.category === "MYSTERY"
                    ? "Mystery"
                    : item.creator,
                oldSeller: item.oldSeller,

                oldPrice: item.oldPrice,
                image: metaData.data.image,
                name: metaData.data.name,
                description: metaData.data.description,
                category: classChange,
                allCate: metaData.data.category,
                isResell: item.isResell,
                soldFirstTime: item.soldFirstTime,
                isBanned: item.isBanned,
              };

              return myItem;
            })
          );

          const unPanItems = items.filter(
            (item) => !item.isBanned || item.isResell
          );

          setcreathedItems(unPanItems);
        }
      } else {
        openSuccessModal();
      }
    };
    setIsLoading(false);
    web3Api.web3 && LoadContracts();
  }, [account]);

  //   setIsLoading(false)

  const [current, setCurrent] = useState(0);

  const breadcrumbs = ["My Profile"];
  const btnCategories = ["Created", "Sold"];

  const [data, setData] = useState(creathedItems);
  const [category, setCategory] = useState("Created");

  useEffect(() => {
    const filteredData = creathedItems.filter((d) => d.category === category);

    if (category === "Created") {
      setData(creathedItems);
    } else {
      setData(filteredData);
    }
  }, [creathedItems, category]);

  let [priceOpen, setPriceOpen] = useState(false);
  let inputPriceRef = useRef(null);
  let [loaderOpen, setLoaderOpen] = useState(false);
  let [successOpen, setSuccessOpen] = useState(false);

  function closePriceModal() {
    setPriceOpen(false);
  }

  function openPriceModal() {
    setPriceOpen(true);
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
    setSuccessOpen(true);
  }

  function purchaseSuccesss() {
    closeLoaderModal();
    openSuccessModal();
  }
  return (
    <>
      <Head>
        <title>Account Address</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header current={-1}></Header>

      <div className="bg-[#0D0F23] dark:bg-white">
        <div className="w-full 2xl:max-w-screen-2xl h-auto pt-[104px] m-auto">
          <div className="flex flex-col mx-8 sm:mx-16 lg:mx-[9vw] space-y-6 py-12">
            {/* custom breadcrubs */}
            <Breadcrumbs home="Home" breadcrumbs={breadcrumbs}></Breadcrumbs>

            <div className="border border-[#787984]"></div>

            <div className="flex flex-col space-y-6">
              <div className="relative h-[200px] rounded-md bg-gradient-to-b from-[#3461FF] to-[#8454EB]">
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[128px] h-[128px] rounded-full border-2 border-white dark:border-gray-800"></div>
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[112px] h-[112px] rounded-full bg-gradient-to-b from-[#3461FF] to-[#8454EB]"></div>
              </div>

              <div className="flex flex-row pt-16">
                <div className="flex-none w-16"></div>

                <div className="flex-grow flex flex-col items-center space-y-6 text-white dark:text-gray-800 text-center">
                  <h1 className="text-xl font-semibold">Account Address</h1>
                  <div className="w-[80%] sm:w-[60%] md:w-[40%] text-sm">
                    {account}
                  </div>

                  <div className="flex flex-row space-x-4 text-[#FAD804] text-2xl mr-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://opensky-nft.vercel.app/account/${account}`
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                  </div>

                  {/* categories */}
                  <div className="flex flex-row space-x-2">
                    {btnCategories.map((item, index) => (
                      <button
                        key={"btn-category" + index.toString()}
                        className={classNames(
                          index === current
                            ? "bg-[#FF457D] dark:bg-gray-800 text-white"
                            : "border border-[#2C3166] dark:border-gray-400 bg-[#002046] dark:bg-white text-[#919CC1] dark:text-gray-800",
                          "text-xs rounded-full px-4 py-1.5"
                        )}
                        onClick={() => {
                          setCurrent(index);
                          setCategory(item);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-none flex flex-col items-center space-y-1">
                  <div className="w-16 h-12 rounded-xl bg-white dark:bg-gray-800 text-lg text-center py-[10px]">
                    <p className="dark:text-white">{creathedItems.length}</p>
                  </div>
                  <div className="text-white dark:text-gray-800 text-xs">
                    NFT Count
                  </div>
                </div>
              </div>

              {/* galleries */}
              {!data.length ? (
                <a className="flex-none text-center text-[#A2A6D0] hover:text-white dark:text-gray-800 dark:hover:text-gray-600">
                  NO NFTs At This Category
                </a>
              ) : (
                <ArtGallery3 galleries={data}></ArtGallery3>
              )}
            </div>
          </div>
        </div>
      </div>
      <SuccessDialog show={successOpen} closeSuccessModal={closeSuccessModal}>
        {{
          msg: "PLease Connect MetaMask With Binance Smart Chain",
          title: "Attention",
          buttonTitle: "Cancel",
        }}
      </SuccessDialog>

      <Footer></Footer>
    </>
  );
}
