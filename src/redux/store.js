import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authSlice";
const rootReducer = combineReducers({
  authReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;
