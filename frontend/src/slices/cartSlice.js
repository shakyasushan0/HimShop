import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  itemPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.cartItems.push(item);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {},
  },
});

export const { addToCart, clearCart, removeItem } = cartSlice.action;
export default cartSlice.reducer;
