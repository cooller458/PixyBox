import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Breadcrumbs from "../../components/breadcrumbs";
import ArePreview from "../../components/explore/art-preview";
import ArtGallery2 from "../../components/explore/art-gallery2";
import { useWeb3 } from "../../components/web3";

export default function SingleNftItem() {
  const [uniqid, setuniqid] = useState("");
  const [uniqtoken, setuniqtoken] = useState("");

  const initialize = (token, id) => {
    if (token && id) {
      setuniqid(id);
      setuniqtoken(token);
    } else {
      const href = window.location.href;
      const arr = href.split("/");
      const arr2 = arr[4].split("?id=");
      arr2[1] ? setuniqid(arr2[1]) : "";
      arr2[0] ? setuniqtoken(arr2[0]) : "";
    }
    // LoadContracts();
  };
  useEffect(() => {
    initialize();
  }, []);
  const web3Api = useWeb3();

  const account = web3Api.account;
  const router = useRouter();
  const { itemId } = router.query;
  const { id } = router.query;
  const [validToViewSinglePost, setValidToViewSinglePost] = useState(false);

  let [priceOpen, setPriceOpen] = useState(false);
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
    setLoaderOpen(true);
  }

  function closeSuccessModal() {
    setSuccessOpen(false);
  }

  function openSuccessModal() {
    setSuccessOpen(true);
  }

  //Load Contracts Function
  const [nftContract, setNFtContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [nftAddress, setNFtAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [singleItem, setSingleItem] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
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

      try {
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


          try {
            if (Number(uniqtoken)) {
              const nftUrl = await deployedNftContract.methods
                .tokenURI(uniqtoken)
                .call();

              const item = await deployedMarketContract.methods
                .fetchSingleItem(uniqid)
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
  

              let myItem = {
                price: priceToWei,
                itemId: item.id,
                tokenId: item.tokenId,
                owner: item.owner,
                seller: item.seller,
                oldOwner: item.oldOwner,
                creator: item.creator,
                oldSeller: item.oldSeller,
                sold: item.sold,

                oldPrice: item.oldPrice,
                image: metaData.data.image,
                name: metaData.data.name,
                description: metaData.data.description,
                category: metaData.data.category,

                isResell: item.isResell,
              };

              setSingleItem(myItem);
              setIsLoading(false);
              closeLoaderModal();

              //Fetch all unsold items
              const data = await deployedMarketContract.methods
                .getAllUnsoldItems()
                .call();
    
              const items = await Promise.all(
                data.map(async (item) => {
                  const nftUrl = await deployedNftContract.methods
                    .tokenURI(item.tokenId)
                    .call();
    
                  const priceToWei = Web3.utils.fromWei(
                    item.price.toString(),
                    "ether"
                  );
                  const metaData = await axios.get(nftUrl);

                  //TODO: fix this object
                  let myItem = {
                    price: priceToWei,
                    itemId: item.id,
                    tokenId: item.tokenId,
                    owner: item.owner,
                    seller: item.seller,
                    oldOwner: item.oldOwner,
                    creator: metaData.data.category === "MYSTERY" ? "Mystery" :  item.creator,
                    oldSeller: item.oldSeller,

                    oldPrice: item.oldPrice,
                    image: metaData.data.image,
                    name: metaData.data.name,
                    description: metaData.data.description,
                    category: metaData.data.category,

                    sold: item.sold,
                    isResell: item.isResell,
                    buttonTitle: "Buy Now",
                  };
             

                  return myItem;
                })
              );

              const myCategoriyItems = items.filter(
                (item) => item.category == singleItem.category
              );

              setCategoryItems(myCategoriyItems);
              setIsLoading(false);

              closeLoaderModal();

            
              setValidToViewSinglePost(true);

              return myItem;
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          window.alert("You are at Wrong Network, Connect with Binance Please");
        }
      } catch (e) {
        console.log("error at fetch single nft", e);
      }
    };
    web3Api.web3 && LoadContracts();
  }, [uniqid, uniqtoken, web3Api.web3, isLoading]);

  //Create nft Buy Function
  const buyNFT = async (nftItem) => {


    const convertIdtoInt = Number(nftItem.itemId);

    const priceFromWei = Web3.utils.toWei(nftItem.price.toString(), "ether");
    ////

    console.log("nftItem.price", priceFromWei);

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

  const breadcrumbs = ["Explore", "NFT Artwork Details"];

  return (
    <>
      <Head>
      <title>PixyBox | NFT Mint & Box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header current={-1}></Header>

      <div className="bg-[#0D0F23] dark:bg-white">
        <div className="w-full 2xl:max-w-screen-2xl h-auto pt-[104px] m-auto">
          <div className="flex flex-col mx-8 sm:mx-16 lg:mx-[9vw] space-y-6 py-12">
            {/* custom breadcrubs */}
            <Breadcrumbs home="Home" breadcrumbs={breadcrumbs}></Breadcrumbs>

            <div className="flex flex-col space-y-12">
              {/* art details */}
              <ArePreview>
                {{ item: singleItem, buyFunction: buyNFT }}
              </ArePreview>

              <div className="flex flex-cols items-center">
                <h1 className="flex-grow text-white text-2xl sm:text-4xl font-bold">
                  Related {singleItem.category} Nfts{" "}
                </h1>
                <Link href="/categories">
                  <a className="flex-none text-right text-[#A2A6D0] hover:text-white">
                    See All
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                  </a>
                </Link>
              </div>

              {/* galleries */}
              {isLoading ? (
                "Loading"
              ) : (
                <ArtGallery2 refresh={initialize} galleries={categoryItems}>
                  {{ buyFunction: buyNFT }}
                </ArtGallery2>
              )}
            </div>
          </div>
        </div>
        {/* <LoaderDialog
          show={loaderOpen}
          openLoaderModal={openLoaderModal}
        ></LoaderDialog> */}
      </div>
      <Footer></Footer>
    </>
  );
}
