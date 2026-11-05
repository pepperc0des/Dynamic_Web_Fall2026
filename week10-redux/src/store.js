import { configureStore } from "@reduxjs/toolkit";

// import all of our reducers from each slice so we can combine them in our store below.

import cartReducer from "./features/cartSlice";

// from here on out, to access our state from our cartSlice it would be state.cart.items[0]
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
