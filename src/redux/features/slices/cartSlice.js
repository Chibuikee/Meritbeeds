import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    uploadToCart: (state, action) => {
      if (action.payload) {
        // console.log(action.payload, "from upload to cart reducer");
        return [...action.payload];
      } else {
        return state;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { uploadToCart } = cartSlice.actions;

export default cartSlice.reducer;
