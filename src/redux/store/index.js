import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "../reducers/orderReducer";
import categoryReducer from "../reducers/categoryReducer";
import productReducer from "../reducers/productReducer";
import errorReducer from "../reducers/errorReducer";

const rootReducer = combineReducers({
  order: orderReducer,
  category: categoryReducer,
  product: productReducer,
  error: errorReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
