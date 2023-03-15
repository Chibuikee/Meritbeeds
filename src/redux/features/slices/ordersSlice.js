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

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    fetchOrders: builder.query({
      async queryFn() {
        try {
          const quarySnapshop = await getDocs(collection(db, "order"));
          let orderData = [];
          quarySnapshop?.forEach((doc) => {
            orderData.push({ orderId: doc.id, ...doc.data() });
          });
          return { data: orderData };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Order"],
    }),
    fetchOrder: builder.query({
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
    addToOrders: builder.mutation({
      async queryFn(formData) {
        try {
          await addDoc(collection(db, "order"), {
            ...formData,
            createdAt: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Order"],
    }),
    deleteFromOrders: builder.mutation({
      async queryFn(productId) {
        try {
          await deleteDoc(doc(db, "order", productId));

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Order"],
    }),
    updateOrders: builder.mutation({
      async queryFn({ productEditId, formData }) {
        try {
          await updateDoc(doc(db, "order", productEditId), {
            ...formData,
            createdAt: serverTimestamp(),
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Order"],
    }),
  }),
});
export const {
  useAddToOrdersMutation,
  useDeleteFromOrdersMutation,
  useUpdateOrdersMutation,
  useFetchOrdersQuery,
} = orderApi;
