import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/loginSlice";
import headerReducer from "./slice/headerSlice.ts";
import notificationReducer from "./slice/notificationSlice.ts";
import productReducer from "./slice/productSlice.ts";
import categoryReducer from "./slice/categorySlice.ts";
import orderReducer from "./slice/orderSlice.ts";
import userReducer from "./slice/userSlice.ts";

const rootReducer = combineReducers({
  auth: authReducer,
  header: headerReducer,
  notification: notificationReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
  user: userReducer
});

export default rootReducer;
