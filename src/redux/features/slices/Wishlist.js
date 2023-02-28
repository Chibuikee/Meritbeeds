import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

export const favouriteApi = createApi({
  reducerPath: "favouriteApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Favourite"],
  endpoints: (builder) => ({
    fetchMeritFavourite: builder.query({
      async queryFn(user) {
        try {
          const cartRef = doc(db, "favourite", user);
          const docSnap = await getDoc(cartRef);
          if (docSnap.exists()) {
            return { data: docSnap.data().items };
          }
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Favourite"],
    }),

    addToMeritFavourite: builder.mutation({
      async queryFn({ user, newState }) {
        try {
          if (user) {
            const favouriteRef = doc(db, "favourite", user);
            await setDoc(favouriteRef, { items: newState });
          }
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Favourite"],
    }),
  }),
});
export const { useFetchMeritFavouriteQuery, useAddToMeritFavouriteMutation } =
  favouriteApi;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [];
// function findItemInCart(state, product) {
//   return state.find((item) => item.id === product.id);
// }
// export const wishListSlice = createSlice({
//   name: "wishList",
//   initialState,
//   reducers: {
//     AddToWishList: (state, action) => {
//       const insideList = findItemInCart(state, action.payload);
//       if (!insideList) {
//         return [...state, action.payload];
//       } else {
//         return state;
//       }
//     },
//     RemoveFromWishList: (state, action) => {
//       const insideList = findItemInCart(state, action.payload);
//       if (insideList) {
//         const udpatedList = state.filter(
//           (item) => item.id !== action.payload.id
//         );
//         return udpatedList;
//       } else {
//         return state;
//       }
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { AddToWishList, RemoveFromWishList } = wishListSlice.actions;

// export default wishListSlice.reducer;
