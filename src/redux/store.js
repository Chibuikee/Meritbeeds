import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "./features/slices/authSlice";
import { cartApi } from "./features/slices/cartApiSlice";
import cartReducer from "./features/slices/cartSlice";
import { orderApi } from "./features/slices/ordersSlice";
import { meritStorApi } from "./features/slices/StoreData";
import { favouriteApi } from "./features/slices/Wishlist";
const rootReducer = combineReducers({
  authReducer,
  cartReducer,
});
const store = configureStore({
  reducer: {
    rootReducer,
    [meritStorApi.reducerPath]: meritStorApi.reducer,
    [favouriteApi.reducerPath]: favouriteApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      meritStorApi.middleware,
      favouriteApi.middleware,
      cartApi.middleware,
      orderApi.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
