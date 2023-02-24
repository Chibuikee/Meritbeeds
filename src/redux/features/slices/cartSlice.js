import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
function findItemInCart(state, product) {
  return state.find((item) => item.id === product.id);
}
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    uploadToCart: (state, action) => {
      if (action.payload) {
        console.log(action.payload, "from upload reducer");
        return [...action.payload];
      } else {
        return state;
      }
    },
    addToCart: (state, action) => {
      const insideCart = findItemInCart(state, action.payload);
      if (insideCart) {
        const updatedCart = state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
        return updatedCart;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },

    reduceQtyInCart: (state, action) => {
      const insideCart = findItemInCart(state, action.payload);
      if (insideCart && insideCart.qty === 1) {
        const updatedCart = state.filter(
          (item) => item.id !== action.payload.id
        );
        return updatedCart;
      } else if (insideCart && insideCart.qty > 1) {
        const updatedCart = state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
        );
        return updatedCart;
      } else {
        return state;
      }
    },

    removeFromCart: (state, action) => {
      const insideCart = findItemInCart(state, action.payload);
      if (insideCart) {
        const updatedCart = state.filter(
          (item) => item.id !== action.payload.id
        );
        return updatedCart;
      } else {
        return state;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, reduceQtyInCart, removeFromCart, uploadToCart } =
  cartSlice.actions;

export default cartSlice.reducer;
