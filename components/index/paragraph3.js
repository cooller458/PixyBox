import { useContext } from 'react'
import { ThemeContext } from './../../pages/_app'

export default function Paragraph3() {
    const {themeMode, toggleThemeMode} = useContext(ThemeContext)

    const sellNftDetails = [
      
        
        {
            iconUrl : "/assets/svg/sell-nft-icon3",
            title : "Set Up Your Wallet",
            description : "Make sure you have MetaMask installed to login the Marketplace.",
        },
        {
            iconUrl : "/assets/svg/sell-nft-icon1",
            title : "Sell Your NFTs",
            description : "Anyone can sell there NFTS on BNBNFT. Upload your Artwork and start Selling.",
        },
        {
            iconUrl : "/assets/svg/sell-nft-icon4",
            title : "Items For Sale",
            description : "All items for sale incure a 2.5% for Seller!  Sell Fee. This small Fee keeps the Markeplace Stable.",
        },
        {
            iconUrl : "/assets/svg/sell-nft-icon2",
            title : "Resell NFTS You Buy",
            description : "You can resell any NFT that is bought from other user with your price. Its, that simple",
        },

        {
            iconUrl : "/assets/svg/sell-nft-icon2",
            title : "Powered by BNB , Polygon WETH",
            description : "All Buy/Sell Transactions is Powered By $BNB. Make sure to Buy Tokens to Purchase NFTS",
        },
    ]

    return (
        <div className='w-full h-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mx-8 mt-8 sm:mx-16 sm:mt-16 lg:mx-[9vw] lg:mt-[9vw]'>
                {sellNftDetails.map((item, index) => (
                    <div key={"sell-nft" + index.toString()} className='grid grid-cols-1 gap-4'>
                        <img src={item.iconUrl + (themeMode ? '.svg' : '-dark.svg')}></img>
                        <h1 className='text-white dark:text-gray-800 text-xl'>{item.title}</h1>
                        <p className='text-[#A2A6D0] dark:text-gray-800 text-sm'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}