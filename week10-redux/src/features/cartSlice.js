import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  // `name` is a label. It prefixes every action type this slice produces,
  // so the one below becomes the string 'cart/itemAdded'.
  name: "cart",

  // the shape this slice owns, before anything happens
  initialState: {
    items: [],
  },

  // Each function in here is a reducer: current state in, next state out.
  // Exactly the shape you wrote by hand in Week 08.
  reducers: {
    itemAdded(state, action) {
      const print = action.payload;
      const existing = state.items.find((item) => item.id === print.id);

      // if we already have that item in our cart, but we click it again,
      // we don't add a new line item, we only update the quantity and return
      if (existing) {
        existing.quantity = existing.quantity + 1;
        return;
      }

      // this directly mutates state because toolkit is using inner under the hood
      // when inner is useed, all of the copying and setting is done behind the scenes for us, so we can write code that looks like it is mutating state, but it is not.
      state.items.push({ ...print, quantity: 1 });
    },
  },

  quantityIncreased(state, action) {
    // the payload is just the ID this time, not the entire print object
    // an action carries whatever the reducer needs, and NO MORE
    const item = state.items.find((item) => item.id === action.payload);

    if (item) {
      item.quantity = item.quantity + 1;
    }
  },

  quantityDecreased(state, action) {
    const item = state.items.find((item) => item.id === action.payload);
    if (!item) {
      return;
    }

    //  going below 1 removes the row, which is what most people expect
    if (item.quantity === 1) {
      state.items = state.items.filter((entry) => entry.id !== action.payload);
      return;
    }

    item.quantity = item.quantity - 1;
  },

  itemRemoved(state, action) {
    state.items = state.items.filter((item) => item.id !== action.payload);
  },

  cartCleared(state) {
    // no action needed here: this one carries no info at all
    state.items = [];
  },
});

// createSlice writes the action creators for us, one per reducer, with
// matching names. We just have to export them.
export const {
  itemAdded,
  quantityIncreased,
  quantityDecreased,
  itemRemoved,
  cartCleared,
} = cartSlice.actions;

// and the reducer itself, which is what the store wants
export default cartSlice.reducer;
