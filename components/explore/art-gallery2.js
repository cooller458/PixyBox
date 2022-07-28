import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { useState,useEffect } from 'react';
import { useSelector } from "react-redux";

export default function ArtGallery2(props) {
    const web3 = useSelector((state) => state.wallet.web3);
    const [dynamicCustomTokenName,setDynamicCustomTokenName]= useState("BNB")
    console.log(props,"by propssss");
  
    useEffect(()=>{
  
  
  
      try{
        web3.eth.net.getId().then(networkId => {
      
          switch(networkId) {
            case 5777:
              // code block
              setDynamicCustomTokenName("ETH")
              break;
            case 1:
                setDynamicCustomTokenName("ETH")
              break;
              case 56:
                setDynamicCustomTokenName("BNB")
              break;
        
              case 97:
                setDynamicCustomTokenName("BNB")
              break;
              case 80001:
                setDynamicCustomTokenName("ETH")
              break;
              case 137:
                setDynamicCustomTokenName("ETH")
              break;
            default:
                setDynamicCustomTokenName("BNB")
          }
        })
      
       }catch(e){
      
       }
             
    },[web3])
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {props.galleries.map((item, index) => (
                <div key={item.artId} className='w-full h-auto grid grid-cols-1 bg-[#000000] border-2 border-[#101230] dark:bg-white rounded-2xl text-white dark:text-gray-800 dark:border-2 dark:border-gray-200'>
                    <div className='grid grid-cols-1 gap-2 p-4'>
                        <div className='bg-white rounded-xl  '>
                        <Link href={{
                            pathname:`/market/${item.tokenId}/`,
                            query: {
                                id: `${item.itemId}`,
                               
                            }
                                }}>
                                       <img 
                                        onClick={() =>
                                            props.refresh
                                              ? props.refresh(item.tokenId, item.itemId)
                                              : ""
                                          }
                                       src="/assets/png/PixyBoxRevisedTransparant.png" alt={item.name} className='w-full h-auto '></img>
                            </Link>
                        </div>
                        <div className='flex flex-row'>
                            <h1 className="flex-grow text-base">{item.name}</h1>
                            <Link href={{
                            pathname:`/market/${item.tokenId}/`,
                            query: {
                                id: `${item.itemId}`,
                               
                            }
                                }}>
                            <button className="rounded-full border-2 border-[#2E357B] dark:border-0 dark:bg-[#325BC5] w-[1.75rem] h-[1.75rem] text-white">
                                <FontAwesomeIcon icon={faAngleRight} className="" />
                            </button>
                            </Link >
                        </div>
                        <p className="text-[#A2A6D0] text-sm">{item.category}</p>
                        <div className='flex flex-row py-4'>
                            <div className="rounded-full w-[1.5rem] text-center bg-[#325BC5] text-white">
                                <FontAwesomeIcon icon={faEthereum} className="" />
                            </div>
                            <h1 className="flex-grow text-[#47DEF2] text-base ml-2">{item.price} {dynamicCustomTokenName}</h1>
                        </div>
                        <Link href={`/account/${item.creator}`}>
                        <a className="text-sm truncate ...">{item.creator}</a>
                        </Link >
                        <p className="text-[#A2A6D0] text-xs">Creatore</p>
                    </div>                            
                    
                    <div className="border-t-2 border-[#2E357B] dark:border-gray-200 p-4">
                       {item.sold?"":<button className='rounded-full bg-[#E42876]  text-white text-base w-full px-4 py-2 shadow-md' onClick={()=>props.children.buyFunction(item)} >⚡ {item.buttonTitle} </button>} 
                    </div>
                </div>
            ))}
        </div>
    )
}