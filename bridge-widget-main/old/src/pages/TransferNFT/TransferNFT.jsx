import React, { useState } from "react";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import TransferNFTSwitcher from "./components/TransferNFTSwitcher";
import CardWrap from "../../UIElemnts/CardWrap";
import AccUser from "../../assets/images/users/accuser.png";
import Styles from "./TransferNFT.module.css";
import TransferNFTStorage from "./components/TransferNFTStorage";
import TransferNFTSend from "./components/TransferNFTSend";
import TransferNFTModal from "./components/TransferNFTModal";
import TransferNFTSuccess from "./components/TransferNFTSuccess";
import TransferNFTModalNftDetail from "./components/TransferNFTModalNftDetail";
import TransferNFTModalWarning from "./components/TransferNFTModalWarning";
import TransferNFTModalSelectNft from "./components/TransferNFTModalSelectNft";
import TransferNFTModalNftSelecNftList from "./components/TransferNFTModalNftSelecNftList";
import TransferNFTModalNftSelect from "./components/TransferNFTModalSelect";
import { useSelector } from "react-redux";
import TransferNFTModalError from "./components/TransferNFTError";
import TransferNFTSend2 from "./components/TransferNFTSend2";
const TransferNFT = () => {
    const {step} = useSelector(s => s.general)

  return (
    <div className="wraper">
      <Container className="mainContainer">
        {step === 1 ?<TransferNFTSwitcher /> : ''}
        {/* <TransferNFTStorage/> */}
        {step === 2 ? <TransferNFTSend/> : ''}
        {step === 3 ? <TransferNFTSuccess /> : ''}
        {/* <TransferNFTModalNftSelecNftList /> */}
        {/* <TransferNFTModalSelectNft /> */}
        <TransferNFTModalWarning />
        <TransferNFTModalError />
        <TransferNFTModal />
        <TransferNFTModalNftDetail />
        <TransferNFTSend2 />
      </Container>
    </div>
  );
};

export default TransferNFT;
