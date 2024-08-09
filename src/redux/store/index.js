import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/categoryReducer";
import productReducer from "../reducers/productReducer";
import errorReducer from "../reducers/errorReducer";
import orderDetailsReducer from "../reducers/orderDetailReducer";
import orderReducer from "../reducers/orderReducer";
import tableReducer from "../reducers/tableReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  order: orderReducer,
  orderDetail: orderDetailsReducer,
  category: categoryReducer,
  product: productReducer,
  error: errorReducer,
  table: tableReducer,
  user: userReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
