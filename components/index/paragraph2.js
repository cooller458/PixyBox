import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ArtGallery1 from "../explore/art-gallery1";
import axios from "axios";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "../web3";
import SuccessDialog from "../dialog/success";
import LoaderDialog from "../dialog/loader";

export default function Paragraph2() {
  ///////////////////
  const web3Api = useWeb3();

  const account = web3Api.account;
  const router = useRouter();
  let [loaderOpen, setLoaderOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  //Create LoadAccounts Function
  const [accountBalance, setAccountBalance] = useState(0);
  const [showDialog, setShowDialog] = useState(true);

  let [priceOpen, setPriceOpen] = useState(false);
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

  //Load Contracts Function
  const [nftContract, setNFtContract] = useState(null);
  const [marketContract, setMarketContract] = useState(null);
  const [nftAddress, setNFtAddress] = useState(null);
  const [marketAddress, setMarketAddress] = useState(null);
  const [unsoldItems, setUnsoldItems] = useState([]);

  const indexOfunsold = unsoldItems.length;

  const firstOne = unsoldItems[indexOfunsold - 1];
  const secondOne = unsoldItems[indexOfunsold - 2];
  const thirdOne = unsoldItems[indexOfunsold - 3];
  const galleries = [firstOne, secondOne, thirdOne];

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

      //Get Token Contract

    
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
              image:
                metaData.data.category === "MYSTERY"
                  ? "assets/png/PixyBoxRevisedTransparant.png"
                  : metaData.data.image,
              name: metaData.data.name,
              description: metaData.data.description,
              category: metaData.data.category,
              isBanned: item.isBanned,
              isResell: item.isResell,
              buttonTitle: "View More",
            };

            return myItem;
          })
        );
        const unPanItems = items.filter((item) => !item.isBanned);

        setUnsoldItems(unPanItems);

        setIsLoading(false);
        setShowDialog(false);
     
    };
    web3Api.web3 && account && LoadContracts();
  }, [web3Api.web3, account]);

  //Create nft Buy Function

  //////////////////

  return (
    <div className="w-full h-auto">
      {/* absolute */}
      <div className="relative w-full h-full">
        <img
          src="/assets/svg/dot-square.svg"
          alt="dot-square"
          className="absolute left-0 top-0 w-[10vw]"
        ></img>
      </div>

      <div className="relative grid grid-cols-1 gap-8 mx-8 sm:mx-16 lg:mx-[9vw]">
        {/* galleries */}
        <div className="flex flex-cols">
          <h1 className="flex-grow text-white dark:text-gray-800 text-2xl sm:text-4xl font-bold">
            Check Top Newest NFTs
          </h1>
          <Link href="/categories">
            <a className="flex-none text-right text-[#A2A6D0] dark:text-gray-800 dark:hover:text-gray-600">
              See All
              <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
            </a>
          </Link>
        </div>

        {isLoading ? (
          <LoaderDialog
            show={loaderOpen}
            openLoaderModal={openLoaderModal}
          ></LoaderDialog>
        ) : (
          <>
            {indexOfunsold > 2 ? (
              <ArtGallery1 galleries={galleries}></ArtGallery1>
            ) : (
              <a className="flex-none text-center text-[#A2A6D0] hover:text-white dark:text-gray-800 dark:hover:text-gray-600">
                Dont Have 3 NfTs
              </a>
            )}
          </>
        )}

        <SuccessDialog show={successOpen} closeSuccessModal={closeSuccessModal}>
          {{
            msg: "PLease Connect MetaMask With Binance Smart Chain",
            title: "Attention",
            buttonTitle: "Cancel",
          }}
        </SuccessDialog>
      </div>
    </div>
  );
}
