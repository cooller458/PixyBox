import { walletActions } from "./wallet-slice";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
// import { DeFiWeb3Connector } from "deficonnect";
import WalletConnectProvider from "@walletconnect/web3-provider";

export const update = () => {
  const manualWeb3cronosTestNet = new Web3(
    new Web3.providers.HttpProvider("https://cronos-testnet-3.crypto.org:8545")
  );
  console.log(manualWeb3cronosTestNet);
  return async (dispatch) => {
    detectEthereumProvider()
      .then((provider) => {
        let s = localStorage.getItem("wallet");
        if (provider && s) {
          const eb3 = new Web3(provider);
          dispatch(walletActions.web(eb3));
          dispatch(walletActions.provider(provider));
          window.ethereum
            .request({
              method: "eth_accounts",
            })
            .then((accounts) => {
              const addr = accounts.length <= 0 ? "" : accounts[0];
              if (accounts.length > 0) {
                dispatch(walletActions.account(addr));
                eb3.eth.getBalance(accounts[0]).then((amount) => {
                  dispatch(walletActions.balance(amount));
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch(walletActions.web(manualWeb3cronosTestNet));
          dispatch(walletActions.provider(manualWeb3cronosTestNet));
          console.log("workingggggggggggg");
        }
      })
      .catch((err) => {
        console.log("it is update error");
        console.log(err);
      });
  };
};

////////////////////=<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>

export const connectMetamask = () => {
  return async (dispatch) => {
    // Runs only they are brand new, or have hit the disconnect button
    console.log("working");
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const provider = await detectEthereumProvider();
    if (provider) {
      if (!window.ethereum.selectedAddress) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }
      await window.ethereum.enable();
      let currentAddress = window.ethereum.selectedAddress;

      const eb3 = new Web3(provider);
      let amount = await eb3.eth.getBalance(currentAddress);
      amount = eb3.utils.fromWei(eb3.utils.toBN(amount), "ether");
      dispatch(
        walletActions.connect({
          web3: eb3,
          account: currentAddress,
          balance: amount,
          wallettype: "MetaMask",
        })
      );
    } else {
      console.log("Please install MetaMask!");
    }
  };
};
////////////////////=<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>
//DEFI WALLET FUNCTION
export const connectDefi = () => {
  return async (dispatch) => {
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [1, 338],
      rpc: {
        1: "https://mainnet.infura.io/v3/17e978710e44440cadf40a13e0ebeaff",
        338: "https://cronos-testnet-3.crypto.org:8545",
      },
      pollingInterval: 15000,
    });
    await connector.activate();
    const provider = await connector.getProvider();
    const eb3 = new Web3(provider);
    const address = (await eb3.eth.getAccounts())[0];
    let amount = await eb3.eth.getBalance(address);

    amount = eb3.utils.fromWei(eb3.utils.toBN(amount), "ether");
    dispatch(
      cartActions.connect({
        web3: eb3,
        account: address,
        wallettype: "Defi Wallet",
        balance: amount,
      })
    );
  };
};

///////////////
//THis mobile connect that can connect mobile
/**
 *
 * @returns
 * Do u use
 */
export const walletConnect = () => {
  return async (dispatch) => {
    try {
      console.log("Mobile Wallet");
      console.log("1");
      const mobileWalletProvider = new WalletConnectProvider({
        rpc: {
          1: "https://mainnet.infura.io/v3/47b829e7e62f4ccfa9fe9dbd1bde1714",
          338: "https://cronos-testnet-3.crypto.org:8545",
          // ...
        },
      });
      console.log("2");
      await mobileWalletProvider.enable();
      //Need Fix At Mobile
      console.log("3");
      const eb3 = new Web3(mobileWalletProvider);

      const currentAddress = (await eb3.eth.getAccounts())[0];
      let amount = await eb3.eth.getBalance(currentAddress);
      amount = eb3.utils.fromWei(eb3.utils.toBN(amount), "ether");
      localStorage.setItem("mobile", true);
      dispatch(
        walletActions.connect({
          web3: eb3,
          account: currentAddress,
          balance: amount,
          wallettype: "Wallet Connect",
        })
      );
    } catch (e) {
      console.log(e, "Disconnect");
    }
  };
};

export const disconnect = () => {
  return async (dispatch) => {
    // Close provider session
    const mobileWalletProvider = new WalletConnectProvider({
      rpc: {
        1: "https://mainnet.infura.io/v3/47b829e7e62f4ccfa9fe9dbd1bde1714",
        338: "https://cronos-testnet-3.crypto.org:8545",
        // ...
      },
    });
    await mobileWalletProvider.disconnect();

    localStorage.removeItem("mobile");
    localStorage.removeItem("wallet");
    localStorage.removeItem("walletconnect");
    dispatch(walletActions.disconnect());
  };
};

// if (mobileWalletProvider) {
//   if (!window.ethereum.selectedAddress) {
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//   }

//   let currentAddress = window.ethereum.selectedAddress;

//   const eb3 = new Web3(mobileWalletProvider);
//   let amount = await eb3.eth.getBalance(currentAddress);
//   amount = eb3.utils.fromWei(eb3.utils.toBN(amount), "ether");
//   dispatch(
//     cartActions.connect({
//       web3: eb3,
//       account: currentAddress,
//       balance: amount,
//       wallettype: "Mobile Connect",
//     })
//   );
// } else {
//   console.log("Please install Mobile Connect!");
// }

export const baglanti = async () => {
  // Runs only they are brand new, or have hit the disconnect button
  console.log("asgdkasjhflksdajslkfdjaskldjlsakjdlaskjdjl");
  return async (dispatch) => {
    console.log("jmuzoooo");

   try {
    const provider = await detectEthereumProvider();

    await window.ethereum.enable();
    let currentAddress = window.ethereum.selectedAddress;

    const eb3 = new Web3(provider);
    let amount = await eb3.eth.getBalance(currentAddress);
    amount = eb3.utils.fromWei(eb3.utils.toBN(amount), "ether");
    let accInfo = {
      web3: eb3,
      account: currentAddress,
      balance: amount,
      wallettype: "MetaMask",
    };
    dispatch(
      walletActions.connect({
        web3: eb3,
        account: currentAddress,
        balance: amount,
        wallettype: "MetaMask",
      })
    );
   } catch (error) {
    console.log(error);
   }
  };
};
