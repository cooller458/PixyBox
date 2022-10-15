import Head from "next/head";

import Header from "./../components/header";
import Footer from "./../components/footer";
import ArtGallery2 from "../components/explore/art-gallery2";
import axios from "axios";
import Web3 from "web3";
import Breadcrumbs from "../components/breadcrumbs";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "../components/web3";
import SuccessDialog from "../components/dialog/success";
import LoaderDialog from "../components/dialog/loader";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategoryPage() {
  const breadcrumbs = ["Categories"];
  const web3Api = useWeb3();

  const account = web3Api.account;
  const router = useRouter();
  const [noProvider, setNoProvider] = useState(false);

  //Create LoadAccounts Function
  const [accountBalance, setAccountBalance] = useState(0);

  //Load Contracts Function
  const [nftContract, setNFtContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [nftAddress, setNFtAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [unsoldItems, setUnsoldItems] = useState([]);

  const indexOfunsold = unsoldItems.length;

  const firstOne = unsoldItems[indexOfunsold - 1];
  const seconsOne = unsoldItems[indexOfunsold - 2];
  const thirdOne = unsoldItems[indexOfunsold - 3];
  const fourthOne = unsoldItems[indexOfunsold - 4];
  const fivthOne = unsoldItems[indexOfunsold - 5];

  const [showDialog, setShowDialog] = useState(true);

  let [priceOpen, setPriceOpen] = useState(false);
  let [successOpen, setSuccessOpen] = useState(false);
  let [loaderOpen, setLoaderOpen] = useState(false);

  function closeLoaderModal() {
    setLoaderOpen(false);
  }

  function openLoaderModal() {
    setLoaderOpen(true);
  }

  function closeSuccessModal() {
    setSuccessOpen(false);
  }

  function openSuccessModal() {
    setSuccessOpen(true);
  }

  useEffect(() => {
    const LoadContracts = async () => {
      openLoaderModal();
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

      //Get Token Contract

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
          const myBalance = await web3Api.web3.eth.getBalance(account);
          const convertBalance = await web3Api.web3.utils.fromWei(
            myBalance,
            "ether"
          );
          setAccountBalance(convertBalance);
        }

        //Fetch all unsold items
        const data = await deployedMarketContract.methods
          .getAllUnsoldItems()
          .call();
   
        const items = await Promise.all(
          data.map(async (item) => {
            const nftUrl = await deployedNftContract.methods
              .tokenURI(item.tokenId)
              .call();
            console.log(nftUrl.split("/")[2],"selammm");
            const priceToWei = Web3.utils.fromWei(
              item.price.toString(),
              "ether"
            );
            var config = {
              method: 'get',
              url: `https://balancemainnft.mypinata.cloud/ipfs/${nftUrl.split("/")[4]}`,
              // headers: { 
              //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjM2QwY2VlNC1kMGU3LTQ2YWUtYjYzYi00YmJiNTQyM2I5YmUiLCJlbWFpbCI6Im0ubXVyYXRkcnpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImEzMTBiYjQxNjYxZjg0YTdkZDc1Iiwic2NvcGVkS2V5U2VjcmV0IjoiN2QyMjZlMWRmYzU4YTliYzY1NWEyOThkNzUyY2M0MGQ3OGFmYTBiZTJjMmU1YmY3ZWQ5MzFhNTBkOWQyMGNiOSIsImlhdCI6MTY2NTQ4MjY2NH0.nR-jmcyjywSLGuhNjQ54FpygQh4p1lYPVTFn37iOArw'
              // }
              
            };
         
            const metaData = await axios.get(nftUrl.split("/")[2] === 'gateway.pinata.cloud' ? `https://balancemainnft.mypinata.cloud/ipfs/${nftUrl.split("/")[4]}`:`/${nftUrl}`);
 

            //TODO: fix this object
            let myItem = {
              price: priceToWei,
              itemId: item.id,
              tokenId: item.tokenId,
              owner: item.owner,
              seller: item.seller,
              oldOwner: item.oldOwner,
              creator: item.creator,
              oldSeller: item.oldSeller,

              oldPrice: item.oldPrice,
              image: metaData.data.image,
              name: metaData.data.name,
              description: metaData.data.description,
              category: metaData.data.category,
              isBanned :item.isBanned,
              isResell: item.isResell,
              buttonTitle: "BUY NOW",
            };
       

            return myItem;
          })
        );

        const unPanItems = items.filter(item=>(!item.isBanned));

  
        setUnsoldItems(unPanItems);;
        closeLoaderModal();
      } else {
        openSuccessModal();
      }
    };
    web3Api.web3 && account && LoadContracts();
  }, [web3Api.web3, account]);

  //Create nft Buy Function
  const buyNFT = async (nftItem) => {


    const convertIdtoInt = Number(nftItem.itemId);

    const priceFromWei = Web3.utils.toWei(nftItem.price.toString(), "ether");
    ////


    openLoaderModal();

    try {
      if (priceFromWei) {
        openLoaderModal();

        const convertIdtoInt = Number(nftItem.itemId);
        const result = await marketContract.methods
          .buyNFt(nftAddress, convertIdtoInt)
          .send({ from: account, value: priceFromWei });
        closeLoaderModal();

        router.push("/market/nft-purchased");
      } else {
        console.log("Error at Buy Function");
        closeLoaderModal();
      }
    } catch (e) {
      console.log("Error catch of buy ", e);
      closeLoaderModal();
    }
  };

  const [data, setData] = useState(unsoldItems);
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    const filteredData = unsoldItems.filter((d) => d.category === category);

    if (category === "ALL") {
      setData(unsoldItems);
    } else {
      setData(filteredData);
    }
  }, [unsoldItems, category]);

  const [current, setCurrent] = useState(0);

  const btnCategories = [
    "ALL",
    "MYSTERY",
    "ART",
    "COLLECTIBLES",
    "PHOTOGRAPHY",
    "SPORT",
    "TRADING CARDS",
    "UTILITY",
    "VIRTUAL WORDS ",
  ];

  return (
    <>
      <Head>
        <title>Categories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header current={3}></Header>

      <div className="bg-[#0D0F23] dark:bg-white">
        <div className="w-full 2xl:max-w-screen-2xl h-auto pt-[104px] m-auto">
          <div className="flex flex-col mx-8 sm:mx-16 lg:mx-[9vw] space-y-6 py-12">
            {/* custom breadcrubs */}
            <Breadcrumbs home="Home" breadcrumbs={breadcrumbs}></Breadcrumbs>

            <div className="border border-[#787984]"></div>

            {/* categories */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
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

            {/* galleries */}
            {!data.length ? (
              <a className="flex-none text-center text-[#A2A6D0] hover:text-white dark:text-gray-800 dark:hover:text-gray-600">
                NO NFTs At This Category
              </a>
            ) : (
              <ArtGallery2 galleries={data}>
                {{ buyFunction: buyNFT }}
              </ArtGallery2>
            )}
            <SuccessDialog
              show={successOpen}
              closeSuccessModal={closeSuccessModal}
            >
              {{
        msg: "PLease Connect MetaMask With Binance Smart Chain",
                title: "Attention",
                buttonTitle: "Cancel",
              }}
            </SuccessDialog>
            <LoaderDialog
              show={loaderOpen}
              openLoaderModal={openLoaderModal}
            ></LoaderDialog>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
