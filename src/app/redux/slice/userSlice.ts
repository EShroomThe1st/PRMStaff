import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "~/app/models/user";

export interface UserState {
  users: User[];
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: UserState = {
  users: [],
  isFetching: false,
  error: false,
  displayError: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.isFetching = true;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.isFetching = false;
      state.users = action.payload;
      state.error = false;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },

    updateUserStart: (state) => {
      state.isFetching = true;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.error = false;
      const index = state.users.findIndex((user) => user.user_id === action.payload.user_id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    
    changeUserStatusStart: (state) => {
      state.isFetching = true;
    },

    changeUserStatusSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.error = false;
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.user_id === updatedUser.user_id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    
    changeUserStatusFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    createUserStart: (state) => {
      state.isFetching = true;
    },
    createUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.users.push(action.payload);
    },
    createUserFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const { 
  fetchUsersStart, 
  fetchUsersSuccess, 
  fetchUsersFailure, 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  changeUserStatusStart,
  changeUserStatusSuccess,
  changeUserStatusFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure
} = productSlice.actions;

export default productSlice.reducer;
