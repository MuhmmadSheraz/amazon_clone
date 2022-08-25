import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allProducts: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      const { payload } = action
      state.allProducts = payload
    },
  },
})

export const { addAllProducts } = productsSlice.actions

export const getProductsByCategory = (state) => state.products.allProducts

export default productsSlice.reducer
