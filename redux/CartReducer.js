import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    productId: null,
    paymentMode: "",
    paymentDuration: "",
    address: {
      state: "",
      city: "",
      pickupLocation: "",
      town: "",
      streetAddress: "",
      landmark: "",
      addressType: "",
    },
  },
  reducers: {
    // Existing reducers for checkout
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload;
    },
    setPaymentDuration: (state, action) => {
      state.paymentDuration = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    // New reducers for address
    setAddressState: (state, action) => {
      state.address.state = action.payload;
    },
    setAddressCity: (state, action) => {
      state.address.city = action.payload;
    },
    setPickupLocation: (state, action) => {
      state.address.pickupLocation = action.payload;
    },
    setAddressTown: (state, action) => {
      state.address.town = action.payload;
    },
    setAddressStreetAddress: (state, action) => {
      state.address.streetAddress = action.payload;
    },
    setAddressLandmark: (state, action) => {
      state.address.landmark = action.payload;
    },
    // New reducer to set addressType
    setAddressType: (state, action) => {
      state.address.addressType = action.payload;
    },
    clearCart: (state) => {
      state.productId = null;
      state.paymentMode = "";
      state.paymentDuration = "";
      state.address.state = "";
      state.address.city = "";
      state.address.pickupLocation = "";
      state.address.town = "";
      state.address.streetAddress = "";
      state.address.landmark = "";
      state.address.addressType = "";
    },
  },
});

export const {
  setPaymentMode,
  setPaymentDuration,
  setProductId,
  setAddressState,
  setAddressCity,
  setPickupLocation,
  setAddressTown,
  setAddressStreetAddress,
  setAddressLandmark,
  setAddressType,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
