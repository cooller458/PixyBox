import { Fragment, useRef,useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { useSelector } from "react-redux";

export default function InputDialog(props) {
    let inputPriceRef = useRef(null)
    const[newPrice,setNewPrice]=useState(0)
    const web3 = useSelector((state) => state.wallet.web3);
  const [dynamicCustomTokenName,setDynamicCustomTokenName]= useState("BNB")

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
        <Transition appear show={props.show} as={Fragment}>
            <Dialog
            as="div"
            className="fixed inset-0 z-100 overflow-y-auto"
            initialFocus={inputPriceRef}
            onClose={props.openPriceModal}
            >
            <div className="min-h-screen px-4 text-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the PriceModal contents. */}
                <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
                >
                &#8203;
                </span>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#24274D] dark:bg-white shadow-xl">
                    <Dialog.Title
                    as="h3"
                    className="text-white text-2xl font-semibold leading-6 "
                    >
                    </Dialog.Title>

                    <div className='flex flex-col space-y-2'>
                        <div className='flex flex-row'>
                            <div className='flex-grow text-white dark:text-gray-800 text-2xl font-semibold'>⚡ Process to Resell</div>
                            <button className='flex-none text-[#000000] text-2xl' onClick={props.closePriceModal}>
                                <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
                            </button>
                        </div>

                        <div className='text-[#6C71AD] text-sm pb-4'>
                            <p>Please write the new price</p>
                        </div>

                        <div className='border border-[#AEB4B4] dark:border-gray-200'></div>

                        <div className='relative text-[#B4BAEF] dark:text-gray-600 py-4'>
                            <input className='w-full text-sm p-3.5 pr-16 rounded-md border border-[#9FA4FF] bg-[#000000] dark:bg-white focus:outline-none focus:ring-2' type="number" min={0}  placeholder='New Price' ref={inputPriceRef} id="nft-price"    onChange = {e=>setNewPrice(e.target.value)}></input>
                            <p className='absolute top-1/2 right-8 -translate-y-1/2 text-sm'> {dynamicCustomTokenName}</p>
                            <FontAwesomeIcon icon={faEthereum} className='absolute top-1/2 right-4 -translate-y-1/2 text-sm' />
                        </div>
                    </div>

                    <div className="mt-2">
                        <button
                            type="button"
                            className="px-10 py-2 text-sm font-medium bg-[#000000]  text-white border border-transparent rounded-full hover:bg-blue-200"
                            onClick={()=>props.children.resellFucnction(props.children.item,newPrice)}
                        >Resell</button>
                    </div>
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    )
}