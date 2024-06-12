import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Order } from "~/app/models/order"; // Adjust the import path based on your project structure

export interface OrderState {
  orders: Order[];
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: OrderState = {
  orders: [],
  isFetching: false,
  error: false,
  displayError: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isFetching = true;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.isFetching = false;
      state.orders = action.payload;
      state.error = false;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
    changeOrderStatusStart: (state) => {
      state.isFetching = true;
    },

    changeOrderStatusSuccess: (state, action: PayloadAction<Order>) => {
      state.isFetching = false;
      state.error = false;
      const updatedOrder = action.payload;
      const index = state.orders.findIndex((orders) => orders.id === updatedOrder.id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    },
    
    changeOrderStatusFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const { 
  fetchOrdersStart, 
  fetchOrdersSuccess, 
  fetchOrdersFailure,
  changeOrderStatusStart,
  changeOrderStatusSuccess,
  changeOrderStatusFailure
} = orderSlice.actions;

export default orderSlice.reducer;
