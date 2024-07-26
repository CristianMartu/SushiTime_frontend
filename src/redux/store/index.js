import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "../reducers/orderReducer";
import categoryReducer from "../reducers/categoryReducer";
import productReducer from "../reducers/productReducer";

const rootReducer = combineReducers({
  order: orderReducer,
  category: categoryReducer,
  product: productReducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
