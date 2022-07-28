import Head from 'next/head'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-regular-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Breadcrumbs from '../../components/breadcrumbs'
import { useRouter } from 'next/router'
import ArtGallery3 from '../../components/explore/art-gallery3'
import { useWeb3 } from '../../components/web3'
import Web3 from "web3"
import { useSelector } from "react-redux";

import axios from 'axios'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileAsViewer() {



    const web3 = useSelector((state) => state.wallet.web3);
	const router = useRouter();
	const {creator} = router.query
	console.log("we are profle as view")
	console.log(creator)
    
      //Create LoadAccounts Function
      const account =   creator;

	 
		const[noProvider,setNoProvider] = useState(true);
	
	
	  
	
		//Create LoadAccounts Function
		const[accountBalance,setAccountBalance]= useState(0);
	
	
		const [isLoading,setIsLoading] = useState(true);
	
	
		//Load Contracts Function
		const[nftContract,setNFtContract]= useState(null)
		const[marketContract,setMarketContract]= useState(null)
		const[nftAddress,setNFtAddress]= useState(null)
		const[marketAddress,setMarketAddress]= useState(null)
		const[unsoldItems,setUnsoldItems]= useState([])
	
		const[tokenContract,setTokenContract]= useState(null)
		const[tokenBalance,setTokenBalnce] =useState("0");
		const [creatorCommissionValueInwei,setCreatorCommissionValueInwei]= useState(null)
	
  
  
	  //Load Contracts Function
	  const[creathedItems,setcreathedItems]= useState([])
	  const[soldItems,setSoldItems]= useState([])
    //Start Add FetchData Without Connect Wallets
let localProvider 
localProvider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");
let localWeb3 = new Web3(localProvider)
let [netWorkId,setnetWorkId]= useState(97)
let localNetWork = 97;
  
	  useEffect(()=>{
		  const LoadContracts = async()=>{
		   //Paths of Json File
		   const nftContratFile =  await fetch("/abis/NFT.json");
		   const marketContractFile = await fetch("/abis/NFTMarketPlace.json");
//Convert all to json
		  const  convertNftContratFileToJson = await nftContratFile.json();
		  const  convertMarketContractFileToJson = await marketContractFile.json();
//Get The ABI
		  const markrtAbi = convertMarketContractFileToJson.abi;
		  const nFTAbi = convertNftContratFileToJson.abi;

          setnetWorkId (await new web3.eth.net.getId()) ;

          const netWorkId = await web3.eth.net.getId();

	
          if(netWorkId === localNetWork ||netWorkId === 5777 ||netWorkId === 137||netWorkId === 80001||netWorkId === 4){

		  const nftNetWorkObject =  convertNftContratFileToJson.networks[netWorkId];
		  const nftMarketWorkObject =  convertMarketContractFileToJson.networks[netWorkId];

	
            if(nftMarketWorkObject && nftMarketWorkObject){
                const nftAddress = nftNetWorkObject.address;
                setNFtAddress(nftAddress)
                const marketAddress = nftMarketWorkObject.address;
                setMarketAddress(marketAddress)
     
                const deployedNftContract = await new web3.eth.Contract(nFTAbi,nftAddress);
                setNFtContract(deployedNftContract)
                const deployedMarketContract = await new web3.eth.Contract(markrtAbi,marketAddress);
                setMarketContract(deployedMarketContract)
     
             
     
                  if(account){
                   const data =  await deployedMarketContract.methods.getMyItemCreated().call({from:account})
                   const items = await Promise.all(data.map(async item=>{
                    const nftUrl = await deployedNftContract.methods.tokenURI(item.tokenId).call();
                    console.log(nftUrl)
                    console.log(item)
                    const priceToWei = Web3.utils.fromWei((item.price).toString(),"ether")
                    const metaData =  await axios.get(nftUrl);
     
                    let classChange;
     
                    if((item.sold||item.soldFirstTime)){
                        classChange = "Sold"
                        
                    }else{
                     classChange = "Created"
                    }
     
       
       //TODO: fix this object
                  let myItem = {
                      
                     price:priceToWei,
                     itemId: item.id,
                     tokenId: item.tokenId,
                     owner :item.owner,
                     seller:item.seller,
                     oldOwner :item.oldOwner,
                     creator:item.creator,
                     oldSeller :item.oldSeller,
     
                     oldPrice:item.oldPrice,
                     image:metaData.data.image,
                     name:metaData.data.name,
                     description:metaData.data.description,
                     category:classChange,
                     isBanned:item.isBanned,
                     isResell:item.isResell,
                     soldFirstTime:item.soldFirstTime
     
                }
       
                return myItem;
       
                  }))
       
                  const unPanItems = items.filter(item=>(!item.isBanned));
     
       
                 //  const mySoldItems = unPanItems.filter(item=>(item.sold||item.isResell));
                 //  setSoldItems(mySoldItems)
                  setcreathedItems(unPanItems)
                  
                  }
                 
                
       
       
       
        
                  }else{
                     console.log("You are at Wrong Netweok")
                 }
          }else{
            const nftNetWorkObject =  convertNftContratFileToJson.networks[localNetWork];
            const nftMarketWorkObject =  convertMarketContractFileToJson.networks[localNetWork];
          
            if(nftMarketWorkObject && nftMarketWorkObject){

                const nftAddress = nftNetWorkObject.address;
                setNFtAddress(nftAddress)
                const marketAddress = nftMarketWorkObject.address;
                setMarketAddress(marketAddress)
     
                const deployedNftContract = await new localWeb3.eth.Contract(nFTAbi,nftAddress);
                setNFtContract(deployedNftContract)
                const deployedMarketContract = await new localWeb3.eth.Contract(markrtAbi,marketAddress);
                setMarketContract(deployedMarketContract)
     
             
     
                  if(account){
                   const data =  await deployedMarketContract.methods.getMyItemCreated().call({from:account})
                   const items = await Promise.all(data.map(async item=>{
                    const nftUrl = await deployedNftContract.methods.tokenURI(item.tokenId).call();
                    console.log(nftUrl)
                    console.log(item)
                    const priceToWei = Web3.utils.fromWei((item.price).toString(),"ether")
                    const metaData =  await axios.get(nftUrl);
     
                    let classChange;
     
                    if((item.sold||item.soldFirstTime)){
                        classChange = "Sold"
                        
                    }else{
                     classChange = "Created"
                    }
     
       
       //TODO: fix this object
                  let myItem = {
                      
                     price:priceToWei,
                     itemId: item.id,
                     tokenId: item.tokenId,
                     owner :item.owner,
                     seller:item.seller,
                     oldOwner :item.oldOwner,
                     creator:item.creator,
                     oldSeller :item.oldSeller,
     
                     oldPrice:item.oldPrice,
                     image:metaData.data.image,
                     name:metaData.data.name,
                     description:metaData.data.description,
                     category:classChange,
                     isBanned:item.isBanned,
                     isResell:item.isResell,
                     soldFirstTime:item.soldFirstTime
     
                }
       
                return myItem;
       
                  }))
       
                  const unPanItems = items.filter(item=>(!item.isBanned));
     
       
                 //  const mySoldItems = unPanItems.filter(item=>(item.sold||item.isResell));
                 //  setSoldItems(mySoldItems)
                  setcreathedItems(unPanItems)
                  
                  }
                 
                
       
       
       
        
                  }else{
                     console.log("You are at Wrong Netweok")
                 }

          }

		
  
  
  
		  }
		  setIsLoading(false) 
		  web3&&LoadContracts()
  
	  },[creator])

	//   setIsLoading(false)




    const [current, setCurrent] = useState(0)  

    const breadcrumbs = ["User Profile"]
    const btnCategories = [  "Created","Sold"]
  
    const [data, setData] = useState(creathedItems);
    const [category, setCategory] = useState("Created");
    
    useEffect(() => {
      const filteredData = creathedItems.filter((d) => d.category === category);
    
      if (category === "Created") {
        setData(creathedItems);
      } else {
        setData(filteredData);
      }
    }, [creathedItems,category]);
    

    return (
        <>
            <Head>
                <title>Account Address</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header current={-1}></Header>

            <div className='bg-[#373F4E] dark:bg-white'>
                <div className='w-full 2xl:max-w-screen-2xl h-auto pt-[104px] m-auto'>
                    <div className='flex flex-col mx-8 sm:mx-16 lg:mx-[9vw] space-y-6 py-12'>
                        {/* custom breadcrubs */}
                        <Breadcrumbs home="Home" breadcrumbs={breadcrumbs}></Breadcrumbs>

                        <div className='border border-[#787984]'></div>

                        <div className='flex flex-col space-y-6'>
                            <div className='relative h-[200px] rounded-md bg-[#fbbe16] '>
                                <div className='absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[128px] h-[128px] rounded-full border-2 border-white dark:border-gray-800'></div>
                                <div className='absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[112px] h-[112px] rounded-full bg-[#fbbe16] '></div>
                            </div>

                            <div className='flex flex-row pt-16'>
                                <div className='flex-none w-16'>
                                </div>

                                <div className='flex-grow flex flex-col items-center space-y-6 text-white dark:text-gray-800 text-center'>
                                    <h1 className='text-xl font-semibold'>Account Address</h1>
                                    <div className='w-[80%] sm:w-[60%] md:w-[40%] text-sm'>{account}</div>

                                    <div className="flex flex-row space-x-4 text-[#FAD804] text-2xl mr-3">
                                        <FontAwesomeIcon icon={faShareAlt} />
                                    </div>

                                    {/* categories */}
                                    <div className='flex flex-row space-x-2'>
                                    {btnCategories.map((item, index) => (
                                <button key={"btn-category" + index.toString()} className={classNames(index === current ? 'bg-[#ffffff] dark:bg-gray-800 text-black' : 'border border-[#2C3166] dark:border-gray-400 bg-[#002046] dark:bg-white text-[#919CC1] dark:text-gray-800', 'text-xs rounded-full px-4 py-1.5')} onClick={() => {setCurrent(index)
                                    setCategory(item)
                                }}>{item}</button>
                            ))}
                                    </div>
                                </div>

                                <div className='flex-none flex flex-col items-center space-y-1'>
                                    <div className='w-16 h-12 rounded-xl bg-white dark:bg-gray-800 text-lg text-center py-[10px]'>
                                        <p className='dark:text-white'>{creathedItems.length}</p>
                                    </div>
                                    <div className='text-white dark:text-gray-800 text-xs'>NFT Count</div>
                                </div>
                            </div>

                            {/* galleries */}
                            {
                                    !data.length?                                <a className="flex-none text-center text-[#A2A6D0] hover:text-white dark:text-gray-800 dark:hover:text-gray-600">
                                    NO NFTs At This Category
                                </a>:    <ArtGallery3 galleries={data}></ArtGallery3> 
                            }
                         
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
