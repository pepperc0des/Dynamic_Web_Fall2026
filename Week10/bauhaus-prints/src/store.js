import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import uiReducer from "./features/uiSlice";
import favouritesReducer from "./features/favouritesSlice";

// Three branches on the state tree: state.cart, state.ui, state.favourites.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    favourites: favouritesReducer,
  },
});
