import React from 'react';
import { Link, Container, Image,ToastContainerProps,Dropdown,Toggle, Accordion, Item, Header, Body } from 'react-bootstrap';

import Aboutus_img from '../assets/img/icon/about-icon.svg';
import Arrowdown from '../assets/img/icon/arrow_down_small.svg';
import Arrowlight from '../assets/img/icon/arrow_right_w.svg';
import Connectchain from '../assets/img/icon/connect_chain.svg';
import Departure from '../assets/img/nft/departure.svg';
import Desincation from '../assets/img/nft/destination.svg';
import Video from '../assets/img/icon/video.svg';
import Avalanche from '../assets/img/nft/Avalanche.svg';
import nft_items_img from '../assets/img/nft_img/nft_items_1.png';
import nft_items_img1 from '../assets/img/nft_img/nft_items_2.png';
import nft_items_img2 from '../assets/img/nft_img/nft_items_3.png';
import nft_items_img3 from '../assets/img/nft_img/nft_items_4.png';
import nft_items_img4 from '../assets/img/nft_img/nft_items_5.png';
import bsc_img from '../assets/img/nft/bsc.svg';
import boken_nft from '../assets/img/nftimages/boken_nft.png';
import nftimg_1 from '../assets/img/nftimages/nft_img_1.png';
import nftimg_2 from '../assets/img/nftimages/nft_img_2.png';
import nftimg_3 from '../assets/img/nftimages/nft_img_3.png';
import nftimg_4 from '../assets/img/nftimages/nft_img_4.png';
import nftimg_5 from '../assets/img/nftimages/nft_img_5.png';
import power from "../assets/img/power.svg";
import Ethereum from '../assets/img/nft/Ethereum.svg';
import HECO from "../assets/img/nft/HECO.svg";
import Elrond from "../assets/img/nft/Elrond.svg";
import BSC from "../assets/img/nft/bsc.svg";
import Cardano from "../assets/img/nft/Cardano.svg";
import Algorand from "../assets/img/nft/Algorand.svg";

function Home() {
    return (
        <>
        <div className="bodyWrap">
		<div className="setting_sidebar">
			<div className="site_setting"><h2>Settings</h2></div>
			<div className="sidebar_content">
				<div className="genarel_setting"><h6>GENERAL SETTINGS</h6></div>
				<div className="setting_list">
					<Accordion defaultActiveKey="0">
						<Accordion.Item eventKey="0">
						  <Accordion.Header>
						  	Smart contract support
						  </Accordion.Header>
						  <Accordion.Body>
							<div className="smartConertbox">
								<div className="smart_con_opt">
									<p>ERC-721</p>
									<div className="approve_btn">
										<input type="checkbox" id="ERC_1"/>
										<label for="ERC_1">
											<span className="approve_box">
											</span>
										</label>
									</div>
								</div>
								<div className="smart_con_opt">
									<p>ERC-1155</p>
									<div className="approve_btn">
										<input type="checkbox" id="ERC_2"/>
										<label for="ERC_2">
											<span className="approve_box">
											</span>
										</label>
									</div>
								</div>
							</div>
						  </Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey="1">
						  <Accordion.Header>
						 	 Integrated Blockchains
						  </Accordion.Header>

						  <Accordion.Body>
							<div className="blockChainCont">
								<ul className="select_block_chain">
									<li className="blockChain_item">
										<div className="select_nft">
											<input type="checkbox" name="" id=""/>
											<span className="icon selectNfticon"></span>
										</div>
										<div className="blockChainItem">
											<img src={Ethereum} alt="Ethereum"/> Ethereum
										</div>
									</li>
									<li className="blockChain_item">
										<div className="select_nft">
											<input type="checkbox" name="" id=""/>
											<span className="icon selectNfticon"></span>
										</div>
										<div className="blockChainItem">
											<img src={HECO} alt="HECO"/> HECO
										</div>
									</li>
									<li className="blockChain_item">
										<div className="select_nft">
											<input type="checkbox" name="" id=""/>
											<span className="icon selectNfticon"></span>
										</div>
										<div className="blockChainItem">
											<img src={Elrond} alt="Elrond"/> Elrond
										</div>
									</li>
									<li className="blockChain_item">
										<div className="select_nft">
											<input type="checkbox" name="test_check" id="test_check"/>
											<span className="icon selectNfticon"></span>
										</div>
										<div className="blockChainItem">
											<img src={BSC} alt="BSC"/> BSC
										</div>
									</li>
									<li className="blockChain_item">
										<div className="select_nft">
											<input type="checkbox" name="test_check1" id="test_check1"/>
											<span className="icon selectNfticon"></span>
										</div>
										<div className="blockChainItem">
											<img src={Cardano} alt="Cardano"/> Cardano
										</div>
									</li>
									<li className="blockChain_item">
										<div className="select_nft">
											<input type="checkbox" name="check_txt_fl" id="check_txt_fl"/>
											<span className="icon selectNfticon"></span>
										</div>
										<div className="blockChainItem">
											<img src={Algorand} alt="Algorand"/> Algorand
										</div>
									</li>
								</ul>
							</div>
						  </Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey="2">
							<Accordion.Header>
								<div className="themcolor_sett">
									<h3>Theme</h3>
									<div className="them">
										<span>Light</span>
										<div className="approve_btn">
											<input type="checkbox" id="them_color" checked />
											<label for="them_color">
												<div className="moon_icon"></div>
												<div className="sun_icon"></div>
												<span className="approve_box">
													<span className="icon"></span>
												</span>
											</label>
										</div>
										<span>Dark</span>
									</div>
								</div>
							</Accordion.Header>
						</Accordion.Item>

						<Accordion.Item eventKey="3">
						  <Accordion.Header>
						  	Typography
						  </Accordion.Header>
						  
						  <Accordion.Body>
							<div className="typographyContainer">
								<div className="typographyBox ">
									<h3>Header</h3>
									<div className="typo-sel header_color_select">
										<h5>Color</h5>
										<div className="select_color">
											<div className="colorInp"><input type="color" name="check_txt_fl2" id="check_txt_f2" /></div>
											<div className="colorCode">
												<input type="text" placeholder="# 000000" id="color_of_head" />
											</div>
										</div>
									</div>
									<div className="typo-sel font-select">
										<h5>Font family</h5>
										<div className="select_font">
											<Dropdown>
												<Dropdown.Toggle id="dropdown-basic">
												Roboto
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<ul>
														<li><a className="dropdown-item" href="#">Open Sance</a></li>
														<li><a className="dropdown-item" href="#">Inter</a></li>
													</ul>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
									<div className="typo-sel font-size-sel">
										<h5>Font size</h5>
										<div className="select_font">
											<Dropdown>
												<Dropdown.Toggle id="dropdown-basic">
													Large (28px)
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<ul>
														<li><a className="dropdown-item" href="#">Medium (22px)</a></li>
														<li><a className="dropdown-item" href="#">Normal (16px)</a></li>
													</ul>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
								</div> 
								<div className="typographyBox ">
									<h3>Body Text</h3>
									<div className="typo-sel header_color_select">
										<h5>Color</h5>
										<div className="select_color">
											<div className="colorInp"><input type="color" id="" /></div>
											<div className="colorCode">
												<input type="text" placeholder="# 000000" id="color_of_head" />
											</div>
										</div>
									</div>
									<div className="typo-sel font-select">
										<h5>Font family</h5>
										<div className="select_font">
											<Dropdown>
												<Dropdown.Toggle id="dropdown-basic">
												Roboto
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<ul>
														<li><a className="dropdown-item" href="#">Open Sance</a></li>
														<li><a className="dropdown-item" href="#">Inter</a></li>
													</ul>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
									<div className="typo-sel font-size-sel">
										<h5>Font size</h5>
										<div className="select_font">
											<Dropdown>
												<Dropdown.Toggle id="dropdown-basic">
													Large (28px)
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<ul>
														<li><a className="dropdown-item" href="#">Medium (22px)</a></li>
														<li><a className="dropdown-item" href="#">Normal (16px)</a></li>
													</ul>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
								</div>
							</div>
						  </Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey="4">
							<Accordion.Header>
								Buttons
							</Accordion.Header>
							<Accordion.Body>
								<div className="button_settCont">
									<div className="typo-sel header_color_select">
										<h5>Color</h5>
										<div className="select_color">
											<div className="colorInp"><input type="color" id="check_txt_fl3" /></div>
											<div className="colorCode">
												<input type="text" placeholder="# 000000" id="color_of_head" />
											</div>
										</div>
									</div>
									<div className="typo-sel header_color_select">
										<h5>Text color</h5>
										<div className="select_color">
											<div className="colorInp"><input type="color" id="check_txt_fl4" /></div>
											<div className="colorCode">
												<input type="text" placeholder="# 000000" id="color_of_head" />
											</div>
										</div>
									</div>
									<div className="typo-sel header_color_select">
										<h5>Corner radius</h5>
										<div className="cornerRadi">
											<input type="text" placeholder="2X" value="2 px" />
										</div>
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Item>

						<Accordion.Item eventKey="5">
						  <Accordion.Header>
						  	Export code
						  </Accordion.Header>
						  <Accordion.Body>
						  		<div className="export_code">
									<div className="typo-sel header_color_select">
										<h5>Paste this code</h5>
										<div className="exportCodeCont">
											<p>235965265252235965265252652sdf235965265252652sdf235965265252652sdf235965265252652sdf235965265252652sdf235965265252652sdf652sdf...</p>
											<button className="copyCode icon"></button>
										</div>
									</div>
								</div>
						  </Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
			</div>
			<div className="sideFooter">
				<div className="help">
					<h3>Help</h3>
					<a href="#" className="help_icon"><span className="icon qustion_icon"></span></a>
				</div>
				<div className="powerBy">
					<a href="#" className="power_by"><img src={power} alt="XP.Network"/></a>
				</div>
			</div>
		</div>

	<div className="bridge_select_contain">
		<div className="nft_title">
		<h1>Transfer NFTs <br/> between blockchains</h1>
		</div>
		<div className="bridge_select_box">
			<div className="bridge_connect_box">
				<div className="bridge_connect">
					<div className="bridge_select selectDepar">
						<Image src={Departure} className="chain"/> <span> Select departure chain</span> <Image src={Arrowdown} className="arrow_down"/>
					</div>
					<span className="connec_chain"><img src={Connectchain}/></span>
					<div className="bridge_select selectDestina">
						<Image src={Departure} className="chain"/> <span>Select departure chain</span> <Image src={Arrowdown} className="arrow_down"/>
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
				<div className="nft_conten_left nft_box_left">
					<div className="nft_cont_left darkBg">
					<div className="nft-cont-top">
							<div className="yorNftOn">
								<h3>Your NFTs on</h3>
								<div className="selectyourNft">
									<div className="dropdown">
										<button className="btn  dropdown-toggle" type="button" id="selectYourNft" data-bs-toggle="dropdown" aria-expanded="false">
										  <img src={bsc_img}/> BSC
										</button>
									</div>
								</div>
								<div className="reloadNft">
									<button className="reloadBtnNft"></button>
								</div>
							</div>
							<div className="seaViewnft">
								<div className="searchNft">
									<div className="dropdown">
										<button className="btn dropdown-toggle" type="button" id="searchNFT" data-bs-toggle="dropdown" aria-expanded="false">
											<span className="icon searchNftIcon"></span>
										</button>
										<div className="dropdown-menu" aria-labelledby="searchNFT">
											<form action="#">
												<input type="search" id="NftsearchInp" placeholder="Search NFT"/>
												<button className="searchBtn"></button>
											</form>
										</div>
									</div>
								</div>
								<div className="viewNft">
									<span className="icon viewNfBtn"></span>
								</div>
								<div className="selectAllNft">
									<a href="#" className="col-bl">Select All</a>
								</div>
							</div>
						</div>
						<div className="nft-on-list">
							<div className="nft-row">
								<div className="nft-col">
									<div className="your_nft_box">
										<div className="nft_box_img">
											<div className="select_nft">
												<input type="checkbox" name="select Nfr" id="select_Nfr"/>
												<span className="icon selectNfticon"></span>
												
											</div>
											<div className="your_nft_img">
												<img src={nftimg_1}/>
											</div>
										</div>
										<div className="nft_box_cont">
											<div className="nft_name">
												<h6>TheMonaLana</h6>
												<h6>784</h6>
											</div>
											<button className="nft_inf"><span className="icon inf_icon"></span></button>	
										</div>
									</div>
								</div>
								<div className="nft-col">
									<div className="your_nft_box">
										<div className="nft_box_img">
											<div className="select_nft">
												<input type="checkbox" name="select Nfr" id="select_Nfr"/>
												<span className="icon selectNfticon"></span>
												
											</div>
											<div className="your_nft_img">
												<img src={nftimg_3}/>
											</div>
										</div>
										<div className="nft_box_cont">
											<div className="nft_name">
												<h6>TheMonaLana</h6>
												<h6>784</h6>
											</div>
											<button className="nft_inf"><span className="icon inf_icon"></span></button>	
										</div>
									</div>
								</div>
								<div className="nft-col">
									<div className="your_nft_box">
										<div className="nft_box_img">
											<div className="select_nft">
												<input type="checkbox" name="select Nfr" id="select_Nfr"/>
												<span className="icon selectNfticon"></span>
												
											</div>
											<div className="your_nft_img">
												<img src={boken_nft}/>
											</div>
										</div>
										<div className="nft_box_cont">
											<div className="nft_name">
												<h6>TheMonaLana</h6>
												<h6>784</h6>
											</div>
											<button className="nft_inf"><span className="icon inf_icon"></span></button>	
										</div>
									</div>
								</div> 
								<div className="nft-col">
									<div className="your_nft_box">
										<div className="nft_box_img">
											<div className="select_nft">
												<input type="checkbox" name="select Nfr" id="select_Nfr"/>
												<span className="icon selectNfticon"></span>
												
											</div>
											<div className="your_nft_img">
												<img src={nft_items_img3}/>
											</div>
										</div>
										<div className="nft_box_cont">
											<div className="nft_name">
												<h6>TheMonaLana</h6>
												<h6>784</h6>
											</div>
											<button className="nft_inf"><span className="icon inf_icon"></span></button>	
										</div>
									</div>
								</div>
								<div className="nft-col">
									<div className="your_nft_box">
										<div className="nft_box_img">
											<div className="select_nft">
												<input type="checkbox" name="select Nfr" id="select_Nfr"/>
												<span className="icon selectNfticon"></span>
												
											</div>
											<div className="your_nft_img">
												<img src={nft_items_img1}/>
											</div>
										</div>
										<div className="nft_box_cont">
											<div className="nft_name">
												<h6>TheMonaLana</h6>
												<h6>784</h6>
											</div>
											<button className="nft_inf"><span className="icon inf_icon"></span></button>	
										</div>
									</div>
								</div> 
								<div className="nft-col">
									<div className="your_nft_box">
										<div className="nft_box_img">
											<div className="select_nft">
												<input type="checkbox" name="select Nfr" id="select_Nfr"/>
												<span className="icon selectNfticon"></span>
												
											</div>
											<div className="your_nft_img">
												<img src={nft_items_img2}/>
											</div>
										</div>
										<div className="nft_box_cont">
											<div className="nft_name">
												<h6>TheMonaLana</h6>
												<h6>784</h6>
											</div>
											<button className="nft_inf"><span className="icon inf_icon"></span></button>	
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="send_nft_box">
					<div className="sendNftCont darkBg">
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
							<div className="nftList_items_box">
								<ul className="nftList_items">
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img} alt="NFT items" /></span> 
											<span className="nft_item_id">77777 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img1} alt="NFT items" /></span> 
											<span className="nft_item_id">99999 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img2} alt="NFT items" /></span> 
											<span className="nft_item_id">333333 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img3} alt="NFT items" /></span> 
											<span className="nft_item_id">2222 NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
									<li className="nft_items">
										<div className="nft_items_left">
											<span className="nft_icon"><img src={nft_items_img4} alt="NFT items" /></span> 
											<span className="nft_item_id">name 111  NFT</span>
										</div>
										<div className="remove_nft_tem"></div>
									</li>
								</ul>
							</div>
							<div className="approve_nft_box">
								<div className="approve_top">
									<h4 className="col-g">Approval</h4>
									<div className="approve_inf">
										<span className="icon inf_icon"></span>
										<div className="apporve_inf">
											We'd like to make sure you really want to send the NFT and pay the associated fees. 
										</div>
									</div>
								</div>
								<div className="nft_approve_bgn">
									<h4>Approve all NFTs</h4> 
									<div className="approve_btn">
										<input type="checkbox" id="nftApprove" name="nftApprove"/>
										<label for="nftApprove">
											<span className="approve_box">
												<span className="approve_check"></span>
											</span>
										</label>
									</div>
								</div>
							</div>
							<div className="nft_fees">
								<h4 className="col-da">Fees</h4> <h4 className="fwn">0 BNB</h4>
							</div>
							<div className="sendNftBtnBox">
								<a href="#" className="blue_btn sendNftBtn">Send</a>
							</div>
						</div>
					</div>
					</div>
					
				</div>
			</div>
	</div>
</div>
        </>
    )
}

export default Home;
