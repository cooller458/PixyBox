import { configureStore } from '@reduxjs/toolkit';


import walletSlice from './wallet-slice';

const Store = configureStore({
  reducer: { wallet: walletSlice.reducer },
});

export default Store;
