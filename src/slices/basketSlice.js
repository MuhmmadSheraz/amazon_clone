import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      const { payload } = action;
      state.items = [...state.items, payload];
    },
    removeFromBasket: (state, action) => {
      const { payload } = action;
      const { items } = state;
      let products = items.filter((item) => item.id !== payload);
      state.items = products;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const cartItem = (state) => state.basket.items;
export const Subtotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
