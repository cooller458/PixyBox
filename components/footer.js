export default function Footer() {
    return (
      <div className="bg-[#000000] text-white">
        <div className="w-full 2xl:max-w-screen-2xl m-auto">
          <div className="grid grid-cols-1">
            <div className="flex flex-col lg:flex-row m-4 sm:m-8 lg:m-[1vw] leading-normal">
              <div className="flex-grow flex flex-col md:flex-row mt-0 md:mt-8">
                <div className="grow leading-8 my-8 md:my-0  flex flex-col footer-content">
                  <h1 className="text-2xl leading-10">About</h1>
                  <a
                    href="https://docs.balancenetwork.io/views/About/aboutus.html"
    
                  >
                    About Us
                  </a>
                  <a
                    href="https://docs.balancenetwork.io/views/About/termsofuse.html"
              
                  >
                    Terms Of Use
                  </a>
                  {/* <a href="https://docs.balancenetwork.io/riskcompliance" target={"_blank"}>Risk & Compilance Disclaimer</a> */}
                  <a
                    href="https://docs.balancenetwork.io/views/About/privacypolicy.html"
         
                  >
                    Privacy Policy Statement
                  </a>

                </div>
                <div className="grow leading-8 my-8 md:my-0  flex flex-col footer-content">
                  <h1 className="text-2xl leading-10 text-[#E42876]">Services</h1>
{/*           
                  <a href="/explore" >
                    NFT Marketplace
                  </a> */}
                  {/* <a href="https://ido.balancenetwork.io/" target={"_blank"}>IDO Launchpad</a>
                                  <a href="https://market.balancenetwork.io" target={"_blank"}>Balance Market</a>
                                  <a href="https://swap.balancenetwork.io/" target={"_blank"}>Swap</a>
                                  <a href="https://multiswap.balancenetwork.io/" target={"_blank"}>MultiSwap</a>
                                  <a href="https://wallet.balancenetwork.io" target={"_blank"}>Mobile Wallet</a>
                                  <a href="https://game.balancenetwork.io" target={"_blank"}>Game Zone</a> */}
                  {/* <a href="#">Explorer</a> */}
                  <a href="https://bridge.balancenetwork.io/">NFT Bridge</a>
                  {/* <a href="#">Token Brdige</a> */}
                </div>
  
                <div className="grow leading-8 my-8 md:my-0  flex flex-col footer-content">
                  <h1 className="text-2xl leading-10 text-[#E42876]">Support</h1>
                  <a
                    href="mailto:support@pixybox.io"
   
                  >
                    Support
                  </a>
                  <a
                    href="https://docs.balancenetwork.io/views/Support/feespolicy.html"

                  >
                    Fees Policy
                  </a>
                  {/* <a href="https://docs.balancenetwork.io/thirdpartysoftwaredisclaimer" target={"_blank"}>Third Party Software Disclaimer</a>
                                  <a href="https://docs.balancenetwork.io/poolserviceuseragreement" target={"_blank"}>Pool Service User Agreement</a>
                                  <a href="https://docs.balancenetwork.io/stakinguseragreement" target={"_blank"}>Staking User Agreement</a> */}
                  <a
                    href="https://docs.balancenetwork.io/views/Support/bst.html"
           
                  >
                    Bridge Service Terms
                  </a>
                  {/* <a href="https://docs.balancenetwork.io/defiserviceterms" target={"_blank"}>DeFi Service Terms</a>
                                  <a href="https://docs.balancenetwork.io/verification" target={"_blank"}>Verification</a>
                                  <a href="https://docs.balancenetwork.io/learn" target={"_blank"}>Learn</a>
                                  <a href="https://docs.balancenetwork.io/career" target={"_blank"}>Career</a> */}
                </div>
  
                <div className="grow leading-8 my-8 md:my-0  flex flex-col footer-content">
                  <h1 className="text-2xl leading-10 ">Community</h1>
                  <a href="https://twitter.com/pixyboxnft" >Twitter</a>
                  <a
                    href="https://www.instagram.com/pixyboxweb3/"
      
                  >
                    Instagram
                  </a>
                  {/* <a href="https://balancenetwork.medium.com/" target={"_blank"}>Medium</a>
                                  <a href="https://discord.com/invite/S9397zV3ay" target={"_blank"}>Discord</a>
                                  <a href="https://www.twitch.tv/balancenetwork" target={"_blank"}>Twitch</a> */}
                  {/* <a href="https://t.me/BalanceNetwork" >
                    Telegram
                  </a> */}
                  {/* <a href="https://www.reddit.com/user/balancenetwork" target={"_blank"}>Reddit</a>
                                  <a href="https://tr.pinterest.com/NFTBalanceNetwork/" target={"_blank"}>Pinterest</a>
                                  <a href="https://www.linkedin.com/in/balance-network-900956236/" target={"_blank"}>Linkedin</a> */}
                </div>
  
                <div className="flex flex-row">
                  <img
                    src="/assets/svg/footer-helper.svg"
                    alt="footer-helper"
                    className="w-[2rem] h-[2rem] mt-2"
                  ></img>
                  <div className="flex-grow flex flex-col ml-4 ">
                    <p>Help center</p>
                    <p>We are here</p>
                    <p>for you!</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="flex flex-col justify-center lg:flex-row mx-4 mb-2 sm:mx-8 sm:mb-4 lg:mx-[6vw] lg:mt-[3vw] text-[#E42876]">
              <p className="flex-none">© 2022 . All rights reserved PixyBox.io</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  