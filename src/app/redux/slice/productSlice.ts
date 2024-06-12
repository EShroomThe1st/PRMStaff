import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "~/app/models/product";

export interface ProductState {
  products: Product[];
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: ProductState = {
  products: [],
  isFetching: false,
  error: false,
  displayError: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.isFetching = true;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.isFetching = false;
      state.products = action.payload;
      state.error = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },

    updateProductStart: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state, action: PayloadAction<Product>) => {
      state.isFetching = false;
      state.error = false;
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateProductFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    
    changeProductStatusStart: (state) => {
      state.isFetching = true;
    },

    changeProductStatusSuccess: (state, action: PayloadAction<Product>) => {
      state.isFetching = false;
      state.error = false;
      const updatedProduct = action.payload;
      const index = state.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    
    changeProductStatusFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    createProductStart: (state) => {
      state.isFetching = true;
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      state.isFetching = false;
      state.error = false;
      state.products.push(action.payload);
    },
    createProductFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const { 
  fetchProductsStart, 
  fetchProductsSuccess, 
  fetchProductsFailure, 
  updateProductStart, 
  updateProductSuccess, 
  updateProductFailure,
  changeProductStatusStart,
  changeProductStatusSuccess,
  changeProductStatusFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure
} = productSlice.actions;

export default productSlice.reducer;
