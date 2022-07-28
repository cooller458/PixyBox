import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    provider: null,
    web3: null,
    account: null,
    isLoading: false,
    wallettype: "",
    brand: "",
    balance: 0,
  },
  reducers: {
    connect(state, action) {
      state.web3 = action.payload.web3;
      state.account = action.payload.account;
      state.balance = action.payload.balance;
      state.wallettype = action.payload.wallettype;
      state.provider = action.payload.pro;
    },
    async disconnect(state,action) {
      try {
        state.web3 = null;
        state.account = null;
        state.balance = 0;
        state.wallettype = null;
        state.provider = null;
        // window.location.reload();
      } catch (e) {
        console.log(e);
      }
    },
    account(state, action) {
      state.account = action.payload;
    },
    balance(state, action) {
      state.balance = action.payload;
    },
    web(state, action) {
      state.web3 = action.payload;
    },

    provider(state, action) {
      state.provider = action.payload;
    },
    brand(state, action) {
      state.brand = action.payload;
    },
  },
});

export const walletActions = walletSlice.actions;

export default walletSlice;
