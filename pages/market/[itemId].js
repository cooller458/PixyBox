import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import {
  faHomeAlt,
  faAngleRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Breadcrumbs from "../../components/breadcrumbs";
import ArePreview from "../../components/explore/art-preview";
import ArtGallery2 from "../../components/explore/art-gallery2";
import { useWeb3 } from "../../components/web3";
import LoaderDialog from "../../components/dialog/loader";
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";
export default function SingleNftItem() {
  const [uniqid, setuniqid] = useState("");
  const [uniqtoken, setuniqtoken] = useState("");
  // const web3Api = useWeb3();
  console.log("markeweeeeeet");
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

  const account = useSelector((state) => state.wallet.account);
  const web3 = useSelector((state) => state.wallet.web3);
  const router = useRouter();
  const { itemId } = router.query;
  const { id } = router.query;
  const [validToViewSinglePost, setValidToViewSinglePost] = useState(false);

  let [priceOpen, setPriceOpen] = useState(false);
  let [loaderOpen, setLoaderOpen] = useState(false);
  let [successOpen, setSuccessOpen] = useState(false);
  //Start Add Token
  const[tokenContract,setTokenContract]= useState(null)
  const[tokenBalance,setTokenBalnce] =useState("0");
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
  const ADMIN_ADDRESS_FEES = "0x15672E12486127dcF7930e734eF01D5E9a888821"

  //Load Contracts Function
  const [nftContract, setNFtContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [nftAddress, setNFtAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [singleItem, setSingleItem] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

    //Start Add FetchData Without Connect Wallets
let localProvider 
localProvider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
let localWeb3 = new Web3(localProvider)
let [netWorkId,setnetWorkId]= useState(97)
let localNetWork = 97;

  useEffect(() => {
    const LoadContracts = async () => {

      
      openLoaderModal();
      //Paths of Json File
      const nftContratFile = await fetch("/abis/NFT.json");
      const marketContractFile = await fetch("/abis/NFTMarketPlace.json");
      const TokenContractFile = await fetch("/abis/Token.json");

      //Convert all to json
      const convertNftContratFileToJson = await nftContratFile.json();
      const convertMarketContractFileToJson = await marketContractFile.json();
      const  convertTokenContractFileToJson = await TokenContractFile.json();

      //Get The ABI
      const markrtAbi = convertMarketContractFileToJson.abi;
      const nFTAbi = convertNftContratFileToJson.abi;
      const tokenAbi =  convertTokenContractFileToJson.abi;


      const netWorkId = await web3.eth.net.getId();

      const nftNetWorkObject = convertNftContratFileToJson.networks[netWorkId];
      const nftMarketWorkObject =
        convertMarketContractFileToJson.networks[netWorkId];

         //Start Add Token

             //Get Token Contract
            
          
     
             const TokenMarketWorkObject =  convertTokenContractFileToJson.networks[netWorkId];
       
        //Start Add Token             


        if(netWorkId === localNetWork ||netWorkId === 5777 ||netWorkId === 137||netWorkId === 80001||netWorkId === 4){
          try {
            if (nftMarketWorkObject && nftMarketWorkObject) {
              const nftAddress = nftNetWorkObject.address;
              const tokenAddress = TokenMarketWorkObject.address

              setNFtAddress(nftAddress);
              const marketAddress = nftMarketWorkObject.address;
              setMarketAddress(marketAddress);
    
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
    
              console.log(uniqtoken);
              console.log(uniqid);
    
              console.log("Token Adresss",tokenAddress)
              const deployedTokenContract = await new web3.eth.Contract(tokenAbi,tokenAddress);
              setTokenContract(deployedTokenContract);
              console.log("account from index",account);
    
                                    //Start Add Token
    
                                    const getTokenBalance = await deployedTokenContract.methods.balanceOf(account).call();
                                    const tokenPriceToWei =  Web3.utils.fromWei(getTokenBalance,"ether")
                         
                                    setTokenBalnce(tokenPriceToWei.toString());
                                    console.log("my balnce Token  is ", tokenPriceToWei);
                                    console.log( tokenPriceToWei);
                    
    
              try {
                if (Number(uniqtoken)) {
                  const nftUrl = await deployedNftContract.methods
                    .tokenURI(uniqtoken)
                    .call();
    
                  const item = await deployedMarketContract.methods
                    .fetchSingleItem(uniqid)
                    .call();
    
                  console.log("Single item Data", item);
    
                  const priceToWei = Web3.utils.fromWei(
                    item.price.toString(),
                    "ether"
                  );
                  const metaData = await axios.get(nftUrl);
    
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
                    isBanned: item.isBanned,
    
                    isResell: item.isResell,
                  };
    
                  setSingleItem(myItem);
                  setIsLoading(false);
                  closeLoaderModal();
    
                  //Fetch all unsold items
                  const data = await deployedMarketContract.methods
                    .getAllUnsoldItems()
                    .call();
                  console.log("Data", data);
                  const items = await Promise.all(
                    data.map(async (item) => {
                      const nftUrl = await deployedNftContract.methods
                        .tokenURI(item.tokenId)
                        .call();
                      console.log(nftUrl);
                      console.log("item ", item);
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
                        creator: item.creator,
                        oldSeller: item.oldSeller,
    
                        oldPrice: item.oldPrice,
                        image: metaData.data.image,
                        name: metaData.data.name,
                        description: metaData.data.description,
                        category: metaData.data.category,
                        isBanned: item.isBanned,
    
                        sold: item.sold,
                        isResell: item.isResell,
                        buttonTitle: "Buy Now",
                      };
                      console.log(item);
    
                      return myItem;
                    })
                  );
    
                  const myCategoriyItems = items.filter(
                    (item) => item.category == singleItem.category
                  );
    
                  setCategoryItems(myCategoriyItems);
                  setIsLoading(false);
    
                  closeLoaderModal();
    
                  console.log("Item from Item", singleItem.owner);
                  setValidToViewSinglePost(true);
    
                  return myItem;
                }
              } catch (e) {
                console.log(e);
              }
            } else {
            }
          } catch (e) {
            console.log("error at fetch single nft", e);
          }
}else{
  const nftNetWorkObject =  convertNftContratFileToJson.networks[localNetWork];
  const nftMarketWorkObject =  convertMarketContractFileToJson.networks[localNetWork];
  const TokenMarketWorkObject =  convertTokenContractFileToJson.networks[localNetWork];

  try {
    if (nftMarketWorkObject && nftMarketWorkObject) {
      const nftAddress = nftNetWorkObject.address;
      setNFtAddress(nftAddress);
      const marketAddress = nftMarketWorkObject.address;
      setMarketAddress(marketAddress);

      const deployedNftContract = await new localWeb3.eth.Contract(
        nFTAbi,
        nftAddress
      );
      setNFtContract(deployedNftContract);
      const deployedMarketContract = await new localWeb3.eth.Contract(
        markrtAbi,
        marketAddress
      );
      setMarketContract(deployedMarketContract);

      console.log(uniqtoken);
      console.log(uniqid);
      const tokenAddress = TokenMarketWorkObject.address

      console.log("Token Adresss",tokenAddress)
      const deployedTokenContract = await new localWeb3.eth.Contract(tokenAbi,tokenAddress);
      setTokenContract(deployedTokenContract);



      try {
        if (Number(uniqtoken)) {
          const nftUrl = await deployedNftContract.methods
            .tokenURI(uniqtoken)
            .call();

          const item = await deployedMarketContract.methods
            .fetchSingleItem(uniqid)
            .call();

          console.log("Single item Data", item);

          const priceToWei = Web3.utils.fromWei(
            item.price.toString(),
            "ether"
          );
          const metaData = await axios.get(nftUrl);

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
            isBanned: item.isBanned,

            isResell: item.isResell,
          };

          setSingleItem(myItem);
          setIsLoading(false);
          closeLoaderModal();

          //Fetch all unsold items
          const data = await deployedMarketContract.methods
            .getAllUnsoldItems()
            .call();
          console.log("Data", data);
          const items = await Promise.all(
            data.map(async (item) => {
              const nftUrl = await deployedNftContract.methods
                .tokenURI(item.tokenId)
                .call();
              console.log(nftUrl);
              console.log("item ", item);
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
                creator: item.creator,
                oldSeller: item.oldSeller,

                oldPrice: item.oldPrice,
                image: metaData.data.image,
                name: metaData.data.name,
                description: metaData.data.description,
                category: metaData.data.category,
                isBanned: item.isBanned,

                sold: item.sold,
                isResell: item.isResell,
                buttonTitle: "Buy Now",
              };
              console.log(item);

              return myItem;
            })
          );

          const myCategoriyItems = items.filter(
            (item) => item.category == singleItem.category
          );

          setCategoryItems(myCategoriyItems);
          setIsLoading(false);

          closeLoaderModal();

          console.log("Item from Item", singleItem.owner);
          setValidToViewSinglePost(true);

          return myItem;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  } catch (e) {
    console.log("error at fetch single nft", e);
  }

}

   
    };
     web3&&LoadContracts();
  }, [uniqid, uniqtoken,web3, isLoading]);

 

  const breadcrumbs = ["Explore", "NFT Artwork Details"];
     //Create nft Buy Function
     const buyNFT = async (nftItem)=>{
        console.log("********")
        console.log(account)
        console.log(nftAddress)
        console.log("nftItem.price",nftItem.price)
    
        
        const convertIdtoInt = Number(nftItem.itemId)
    
    
        const priceFromWei = Web3.utils.toWei((nftItem.price).toString(),"ether")
    ////
    
    console.log("nftItem.price",priceFromWei)
    openLoaderModal()

   try{
      if(account && tokenContract){
        openLoaderModal()

        const creatorCommission =  ((Number(nftItem.price) / 100) ) * (2.5);
        console.log(typeof nftItem.price);

        const creatorCommissionPriceToWei = Web3.utils.toWei((creatorCommission).toString(),"ether")

        console.log("creatorCommission",typeof creatorCommission);

        const sendNftCommissionToCreator = await tokenContract.methods.transfer(ADMIN_ADDRESS_FEES,creatorCommissionPriceToWei).send({from:account})

       
        let sellerMoney = (Number(nftItem.price)) - creatorCommission;

        const sellerMoneypriceToWei = Web3.utils.toWei((sellerMoney).toString(),"ether")

        const sendNftPriceToSeller = await tokenContract.methods.transfer(nftItem.seller,sellerMoneypriceToWei).send({from:account})


        const convertIdtoInt = Number(nftItem.itemId)

        if(sendNftCommissionToCreator,sendNftPriceToSeller){
            //Transfare token
        const result =  await marketContract.methods.buyNFt(nftAddress,convertIdtoInt).send({from:account})
        closeLoaderModal()

      router.push("/market/nft-purchased")
        }else{
          console.log("cannot comlete buy because you dont send money")
        }

      
        }else{
          console.log("Error at Buy Function")
          closeLoaderModal()

        }
         
   }catch(e) {
       console.log("Error catch of buy ",e)
       closeLoaderModal()

   }
    
    
    }

  return (
    <>
      <Head>
        <title>Beautiful Artwork</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header current={-1}></Header>

      <div className="bg-[#373F4E] dark:bg-white">
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
        <LoaderDialog
          show={loaderOpen}
          openLoaderModal={openLoaderModal}
        ></LoaderDialog>
      </div>
      <Footer></Footer>
    </>
  );
}
