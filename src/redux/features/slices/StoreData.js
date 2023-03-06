import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

export const meritStorApi = createApi({
  reducerPath: "meritStorApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Store"],
  endpoints: (builder) => ({
    fetchMeritStore: builder.query({
      async queryFn() {
        try {
          const quarySnapshop = await getDocs(collection(db, "products"));
          let productsData = [];
          quarySnapshop?.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
          });
          return { data: productsData };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Store"],
    }),
    fetchProduct: builder.query({
      async queryFn(productId) {
        try {
          const docSnap = await getDoc(doc(db, "products", productId));
          if (docSnap.exists()) {
            return { data: docSnap.data() };
          }
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Store"],
    }),
    addToMeritStore: builder.mutation({
      async queryFn(formData) {
        try {
          await addDoc(collection(db, "products"), {
            ...formData,
            createdAt: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Store"],
    }),
    deleteMeritStoreProduct: builder.mutation({
      async queryFn(productId) {
        try {
          await deleteDoc(doc(db, "products", productId));

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Store"],
    }),
    updateMeritStoreProduct: builder.mutation({
      async queryFn({ productEditId, formData }) {
        try {
          await updateDoc(doc(db, "products", productEditId), {
            ...formData,
            createdAt: serverTimestamp(),
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Store"],
    }),
  }),
});
export const {
  useFetchMeritStoreQuery,
  useDeleteMeritStoreProductMutation,
  useAddToMeritStoreMutation,
  useFetchProductQuery,
  useUpdateMeritStoreProductMutation,
} = meritStorApi;
// export const WholestoreSlice = createSlice({
//   name: "Wholestore",
//   initialState,
//   reducers: {
//     FetchedAllItems: (state, action) => {
//       return [...action.payload];
//     },
//     UpdatedAllItems: (state, action) => {
//       return [...state, action.payload];
//     },
//   },
// });
// export const { FetchedAllItems, UpdatedAllItems } = WholestoreSlice.actions;
// export default WholestoreSlice.reducer;
