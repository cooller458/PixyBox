import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav,Link,Image, Modal, Button, Header, Title, Body, Container, Dropdown, Toggle, Menu, Item  } from "react-bootstrap";

import "./Global.css";
import Aboutus_img from './assets/img/icon/about-icon.svg';
import Arrowdown from './assets/img/icon/arrow_down_small.svg';
import Arrowlight from './assets/img/icon/arrow_right_w.svg';
import Connectchain from './assets/img/icon/connect_chain.svg';
import Departure from './assets/img/icon/departure.svg';
import Desincation from './assets/img/icon/destination.svg';
import Video from './assets/img/icon/video.svg';
import Avalanche from './assets/img/icon/Avalanche.svg';
import nft_items_img from './assets/img/icon/nft_img/nft_items_1.png';
import nft_items_img1 from './assets/img/icon/nft_img/nft_items_2.png';
import nft_items_img2 from './assets/img/icon/nft_img/nft_items_3.png';
import nft_items_img3 from './assets/img/icon/nft_img/nft_items_4.png';
import nft_items_img4 from './assets/img/icon/nft_img/nft_items_5.png';

function App() {
    
return (
<div className="bodyWrap">
	<div className="bridge_select_contain">
		<div className="nft_title">
		<h1>Transfer NFTs <br/> between blockchains</h1>
		</div>
		<div className="bridge_select_box">
			<div className="bridge_connect_box">
				<div class="bridge_connect">
					<div class="bridge_select selectDepar">
						<Image src={Departure} className="chain"/> <span> Select departure chain</span> <Image src={Arrowdown} className="arrow_down"/>
					</div>
					<span className="connec_chain"><img src={Connectchain}/></span>
					<div className="bridge_select selectDestina">
						<Image src={Departure} class="chain"/> <span>Select departure chain</span> <Image src={Arrowdown} className="arrow_down"/>
					</div>
				</div>
				<a href="#" className="connect_bridge">Continue bridging <img src={Arrowlight}/></a>
			</div>
			<div className="connect_bridge_tutorial">
					<a href="#" className="tutorial_links col-g"><Image src={Video}/> Learn how to use NFT bridge</a>
					<a href="#" className="tutorial_links col-g"><Image src={Aboutus_img}/> What is NFT</a>
			</div>
		</div>
	</div>
	<div className="nft_container_area">
			<div className="my_nft_are">
				<div className="nft_conten_left">

				</div>
				<div className="send_nft_box">
					<div className="send_title">
						<h3>Send NFT</h3>
					</div>
					<div className="nft_destination">
						<div className="destination_title">
							<h4>Destination Chain </h4>
							<div className="destinatio_logo">
								<img src={Avalanche} /> <span>Avalanche</span>
							</div>
						</div>
						<div className="inp_des_ad">
							<form action="#">
								<div className="destination_address">
									<input type="text" placeholder="Paste destination address" /> 
								</div>
							</form>
						</div>
						<div className="selected_nft_list">
							<div className="nft_list_title">
								<div className="selected_nft">
									<span className="col-g">Selected NFT</span> <span>/8</span>
								</div>
								<a href="#" className="clear_all_nft">Clear all</a>
							</div>
							<div class="nftList_items_box">
								<ul class="nftList_items">
								<li class="nft_items">
										<div class="nft_items_left">
											<span class="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span class="nft_item_id">77777 NFT</span>
										</div>
										<div class="remove_nft_tem"></div>
									</li>
									<li class="nft_items">
										<div class="nft_items_left">
											<span class="nft_icon"><img src={nft_items_img1} alt="NFT items" /></span> 
											<span class="nft_item_id">99999 NFT</span>
										</div>
										<div class="remove_nft_tem"></div>
									</li>
									<li class="nft_items">
										<div class="nft_items_left">
											<span class="nft_icon"><img src={nft_items_img2} alt="NFT items" /></span> 
											<span class="nft_item_id">333333 NFT</span>
										</div>
										<div class="remove_nft_tem"></div>
									</li>
									<li class="nft_items">
										<div class="nft_items_left">
											<span class="nft_icon"><img src={nft_items_img3} alt="NFT items" /></span> 
											<span class="nft_item_id">2222 NFT</span>
										</div>
										<div class="remove_nft_tem"></div>
									</li>
									<li class="nft_items">
										<div class="nft_items_left">
											<span class="nft_icon"><img src={nft_items_img4} alt="NFT items" /></span> 
											<span class="nft_item_id">name 111  NFT</span>
										</div>
										<div class="remove_nft_tem"></div>
									</li>
								</ul>
							</div>
							<div class="approve_nft_box">
								<div class="approve_top">
									<h4 class="col-g">Approval</h4>
									<div class="approve_inf">
										<span class="icon inf_icon"></span>
										<div class="apporve_inf">
											We'd like to make sure you really want to send the NFT and pay the associated fees. 
										</div>
									</div>
								</div>
								<div class="nft_approve_bgn">
									<h4>Approve all NFTs</h4> 
									<div class="approve_btn">
										<input type="checkbox" id="nftApprove" name="nftApprove"/>
										<label for="nftApprove">
											<span class="approve_box">
												<span class="approve_check"></span>
											</span>
										</label>
									</div>
								</div>
							</div>
							<div class="nft_fees">
								<h4 class="col-da">Fees</h4> <h4 class="fwn">0 BNB</h4>
							</div>
							<div class="sendNftBtnBox">
								<a href="#" class="blue_btn sendNftBtn">Send</a>
							</div>
						</div>
					</div>
				</div>
			</div>
	</div>
</div>
  
  );
}

export default App;
