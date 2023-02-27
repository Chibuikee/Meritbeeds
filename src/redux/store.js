import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "./features/slices/authSlice";
import cartReducer from "./features/slices/cartSlice";
import { meritStorApi } from "./features/slices/StoreData";
// import { cartApi } from "./features/slices/cartApiSlice";
const rootReducer = combineReducers({
  authReducer,
  cartReducer,
});
const store = configureStore({
  reducer: {
    rootReducer,
    [meritStorApi.reducerPath]: meritStorApi.reducer,
    // [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      meritStorApi.middleware
      // cartApi.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
