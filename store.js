import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import walletReducer from "./redux/WalletSlice";

export default configureStore({
    reducer: {
        cart: CartReducer,
        wallet: walletReducer,
    }
})