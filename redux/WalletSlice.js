// WalletSlice.js

import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0, // Initial value, you can set it to the user's actual wallet balance
  },
  reducers: {
    setWalletBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { setWalletBalance } = walletSlice.actions;
export default walletSlice.reducer;
