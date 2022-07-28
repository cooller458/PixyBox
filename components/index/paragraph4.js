import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ArtGallery2 from "../explore/art-gallery2";
import axios from "axios";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "../web3";
import LoaderDialog from "../../components/dialog/loader";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Paragraph4() {
  const { active, account, library, connector, chainId, activate, deactivate } =
  useWeb3React();
  const ADMIN_ADDRESS_FEES = "0x15672E12486127dcF7930e734eF01D5E9a888821";
  const accountt = useSelector((state) => state.wallet.account);

  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"),
    library
  );
  console.log(account,"reduxxxx");
  const router = useRouter();
  const [noProvider, setNoProvider] = useState(false);
  const [marketNftData,setMarketNftData] = useState()
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

  //Create LoadAccounts Function
  const [accountBalance, setAccountBalance] = useState(0);

  //Start Add Token
  const [tokenContract, setTokenContract] = useState(null);
  const [tokenBalance, setTokenBalnce] = useState("0");

  //Load Contracts Function
  const [nftContract, setNFtContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [nftAddress, setNFtAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [unsoldItems, setUnsoldItems] = useState([]);

  const indexOfunsold = unsoldItems.length;

  //Start Add FetchData Without Connect Wallets
  let localProvider;
  localProvider = new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );
  let localWeb3 = new Web3(localProvider);
  let [netWorkId, setnetWorkId] = useState(97);
  let localNetWork = 97;
    console.log(web3,"aaaaaaaaaaaaaaa");
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

      setnetWorkId(await new web3.eth.net.getId());

      const netWorkId = await web3.eth.net.getId();

      //Get Token Contract
      const TokenContractFile = await fetch("/abis/Token.json");
      const convertTokenContractFileToJson = await TokenContractFile.json();
      const tokenAbi = await convertTokenContractFileToJson.abi;

      //Start Add Token
      if (
        netWorkId === localNetWork ||
        netWorkId === 5777 ||
        netWorkId === 137 ||
        netWorkId === 80001 ||
        netWorkId === 4
      ) {
        const nftNetWorkObject =
          convertNftContratFileToJson.networks[netWorkId];
        const nftMarketWorkObject =
          convertMarketContractFileToJson.networks[netWorkId];
        const TokenMarketWorkObject =
          convertTokenContractFileToJson.networks[netWorkId];

        if (nftMarketWorkObject && nftMarketWorkObject) {
          const nftAddress = nftNetWorkObject.address;
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
          console.log(
            deployedMarketContract,
            "bu ney bende bilmiyorum ama bakmak için logladım"
          );
          setMarketContract(deployedMarketContract);
          //Start Add Token

          const tokenAddress = TokenMarketWorkObject.address;
          console.log("Token Adresss", tokenAddress);
          const deployedTokenContract = await new web3.eth.Contract(
            tokenAbi,
            "0x7f43aa0ff697b7a2747c16cb7f10c6f7c87666ed"
          );
          setTokenContract(deployedTokenContract);
          console.log("account from index", account);

          if (account) {
            const myBalance = await web3.eth.getBalance(account);
            const convertBalance = await web3.utils.fromWei(myBalance, "ether");
            setAccountBalance(convertBalance);

            //Start Add Token

            const getTokenBalance = await deployedTokenContract.methods
              .balanceOf(account)
              .call();
            const tokenPriceToWei = Web3.utils.fromWei(
              getTokenBalance,
              "ether"
            );

            setTokenBalnce(tokenPriceToWei.toString());
            console.log("my balnce Token  is ", tokenPriceToWei);
            console.log(tokenPriceToWei);
          }
          if (!account) {
            const myBalance = await web3.eth.getBalance("0x7f43aa0ff697b7a2747c16cb7f10c6f7c87666ed");
            const convertBalance = await web3.utils.fromWei(myBalance, "ether");
            setAccountBalance(convertBalance);

            //Start Add Token

            const getTokenBalance = await deployedTokenContract.methods
              .balanceOf(account)
              .call();
            const tokenPriceToWei = Web3.utils.fromWei(
              getTokenBalance,
              "ether"
            );

            setTokenBalnce(tokenPriceToWei.toString());
            console.log("my balnce Token  is ", tokenPriceToWei);
            console.log(tokenPriceToWei);
          }
          //Fetch all unsold items
          const data = await deployedMarketContract.methods
            .getAllUnsoldItems()
            .call();
          console.log(data, "bu datatatatat");
          const items = await Promise.all(
            data.map(async (item) => {
              const nftUrl = await deployedNftContract.methods
                .tokenURI(item.tokenId)
                .call();
              console.log(nftUrl, "resimnuuuu");
              console.log(item, "items altındaki item");
              const priceToWei = Web3.utils.fromWei(
                item.price.toString(),
                "ether"
              );
              const metaData = await axios.get(nftUrl);
              console.log(items, "buda bilmem ne itemi");
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

                isResell: item.isResell,
                isBanned: item.isBanned,

                buttonTitle: "BUY NOW",
              };
              console.log(item);

              return myItem;
            })
          );
          console.log(items, "bu öenmli olan buna bakkkkk");
          const unPanItems = items.filter((item) => !item.isBanned);
          console.log(unPanItems,"bu filtrelenmiş");
          setMarketNftData(unsoldItems)
          setUnsoldItems(unPanItems);
        } else {
          console.log("You are at Wrong Netweok, Connect with Biance Please");
        }
      } else {
        const nftNetWorkObject =
          convertNftContratFileToJson.networks[localNetWork];
        const nftMarketWorkObject =
          convertMarketContractFileToJson.networks[localNetWork];
        const TokenMarketWorkObject =
          convertTokenContractFileToJson.networks[localNetWork];
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
          //Start Add Token

          const tokenAddress = TokenMarketWorkObject.address;
          console.log("Token Adresss", tokenAddress);
          const deployedTokenContract = await new localWeb3.eth.Contract(
            tokenAbi,
            tokenAddress
          );
          setTokenContract(deployedTokenContract);
          console.log("account from index", account);

          //Fetch all unsold items
          const data = await deployedMarketContract.methods
            .getAllUnsoldItems()
            .call();
          console.log(data);
          const items = await Promise.all(
            data.map(async (item) => {
              const nftUrl = await deployedNftContract.methods
                .tokenURI(item.tokenId)
                .call();
              console.log(nftUrl);
              console.log(item);
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

                isResell: item.isResell,
                isBanned: item.isBanned,

                buttonTitle: "Wrong Network",
              };
              console.log(item);

              return myItem;
            })
          );
          const unPanItems = items.filter((item) => !item.isBanned);

          setUnsoldItems(unPanItems);
        } else {
          console.log("You are at Wrong Netweok, Connect with Biance Please");
        }
      }
    };
    web3 && LoadContracts();
  }, [web3]);

  //Create nft Buy Function
  const buyNFT = async (nftItem) => {
    console.log("********");
    console.log(account, "aaa");
    console.log(nftAddress);
    console.log("nftItem.price", nftItem.price);

    const convertIdtoInt = Number(nftItem.itemId);

    const priceFromWei = Web3.utils.toWei(nftItem.price.toString(), "ether");
    ////

    console.log("nftItem.price", priceFromWei);
    openLoaderModal();

    try {
      if (account && tokenContract) {
        openLoaderModal();

        const creatorCommission = (Number(nftItem.price) / 100) * 2.5;
        console.log(typeof nftItem.price);

        const creatorCommissionPriceToWei = Web3.utils.toWei(
          creatorCommission.toString(),
          "ether"
        );

        console.log("creatorCommission", typeof creatorCommission);

        const sendNftCommissionToCreator = await tokenContract.methods
          .transfer(ADMIN_ADDRESS_FEES, creatorCommissionPriceToWei)
          .send({ from: account });

        let sellerMoney = Number(nftItem.price) - creatorCommission;

        const sellerMoneypriceToWei = Web3.utils.toWei(
          sellerMoney.toString(),
          "ether"
        );

        const sendNftPriceToSeller = await tokenContract.methods
          .transfer(nftItem.seller, sellerMoneypriceToWei)
          .send({ from: account });

        const convertIdtoInt = Number(nftItem.itemId);

        if ((sendNftCommissionToCreator, sendNftPriceToSeller)) {
          //Transfare token
          const result = await marketContract.methods
            .buyNFt(nftAddress, convertIdtoInt)
            .send({ from: account });
          closeLoaderModal();

          router.push("/market/nft-purchased");
        } else {
          console.log("cannot comlete buy because you dont send money");
        }
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
    console.log(unsoldItems, "bak bunuda anlamadım ne ki");

    if (category === "ALL") {
      setData(unsoldItems);
    } else {
      setData(filteredData);
    }
  }, [unsoldItems, category]);

  const [current, setCurrent] = useState(0);

  const btnCategories = [
    "ALL",
    "ART",
    "COLLECTIBLES",
    "PHOTOGRAPHY",
    "SPORT",
    "TRADING CARDS",
    "UTILITY",
    "VIRTUAL WORDS ",
  ];
console.log(data,"data bu");
  return (
    <div className="w-full h-auto">
      <div className="relative grid grid-cols-1 gap-8 m-8 sm:m-16 lg:m-[9vw]">
        {/* categories */}
        <div className="flex flex-col space-y-12">
          <h1 className="text-white dark:text-gray-800 text-2xl sm:text-4xl font-bold">
            Explore all NFTs and Start to Collect
          </h1>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
              {btnCategories.map((item, index) => (
                <button
                  key={"btn-category" + index.toString()}
                  className={classNames(
                    index === current
                      ? "bg-[#] dark:bg-gray-800 text-white"
                      : "border border-[#2C3166] dark:border-gray-400 bg-[#000000] dark:bg-white text-white dark:text-gray-800",
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
            <div className="flex-grow"></div>
            <div className="flex-none">
              <Link href="/categories">
                <a className="flex-none text-right text-[#A2A6D0] hover:text-white dark:text-gray-800 dark:hover:text-gray-600">
                  See All
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* galleries */}
        {!data.length ? (
          <a className="flex-none text-center text-[#A2A6D0] hover:text-white dark:text-gray-800 dark:hover:text-gray-600">
            NO NFTs At This Category
          </a>
        ) : (
          <ArtGallery2 galleries={data}>{{ buyFunction: buyNFT }}</ArtGallery2>
        )}
        <LoaderDialog
          show={loaderOpen}
          openLoaderModal={openLoaderModal}
        ></LoaderDialog>
      </div>
    </div>
  );
}
