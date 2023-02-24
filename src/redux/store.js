import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authSlice";
import cartReducer from "./features/slices/cartSlice";
const rootReducer = combineReducers({
  authReducer,
  cartReducer,
});
const store = configureStore({ reducer: rootReducer });
export default store;

// import {
//   configureStore,
//   combineReducers,
//   getDefaultMiddleware,
// } from "@reduxjs/toolkit";
// import authReducer from "./features/slices/authSlice";
// import cartReducer from "./features/slices/cartSlice";
// import { meritStorApi } from "./features/slices/StoreData";
// const rootReducer = combineReducers({
//   authReducer,
//   cartReducer,
// });
// const store = configureStore({
//   reducer: {
//     [meritStorApi.reducerPath]: meritStorApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(meritStorApi.middleware),
// });
// export default store;
