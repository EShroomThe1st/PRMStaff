import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "~/app/models/category";

export interface CategoryState {
  categories: Category[];
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: CategoryState = {
  categories: [],
  isFetching: false,
  error: false,
  displayError: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.isFetching = true;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.isFetching = false;
      state.categories = action.payload;
      state.error = false;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    changeCategoryStatusStart: (state) => {
      state.isFetching = true;
    },
    changeCategoryStatusSuccess: (state, action: PayloadAction<Category>) => {
      state.isFetching = false;
      state.error = false;
      const updatedCategory = action.payload;
      const index = state.categories.findIndex((category) => category.id === updatedCategory.id);
      if (index !== -1) {
        state.categories[index] = updatedCategory;
      }
    },
    changeCategoryStatusFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    createCategoryStart: (state) => {
      state.isFetching = true;
    },
    createCategorySuccess: (state, action: PayloadAction<Category>) => {
      state.isFetching = false;
      state.error = false;
      state.categories.push(action.payload);
    },
    createCategoryFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const { 
  fetchCategoriesStart, 
  fetchCategoriesSuccess, 
  fetchCategoriesFailure,
  changeCategoryStatusStart,
  changeCategoryStatusSuccess,
  changeCategoryStatusFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
