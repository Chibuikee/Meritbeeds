import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchCart: builder.query({
      async queryFn(user) {
        try {
          const cartRef = doc(db, "carts", user);
          const docSnap = await getDoc(cartRef);
          if (docSnap.exists()) {
            return { data: docSnap.data().items };
          }
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      async queryFn({ user, newState, product }) {
        try {
          // check that all the parameters are available and product does not exists in database
          if (user && newState && product) {
            const cartRef = doc(db, "carts", user);
            if (newState?.find((item) => item?.id === product?.id)) {
              await setDoc(cartRef, {
                items: newState?.map((item) =>
                  item?.id === product?.id
                    ? { ...item, qty: item?.qty + 1 }
                    : item
                ),
              });
            } else {
              await setDoc(cartRef, {
                items: [...newState, { ...product, qty: 1 }],
              });
            }
          }

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Cart"],
    }),
    reduceQtyInCart: builder.mutation({
      async queryFn({ user, newState, product }) {
        try {
          // check that all the parameters are available and product does not exists in database
          if (user && newState && product) {
            const cartRef = doc(db, "carts", user);
            const insideCart = newState?.find(
              (item) => item?.id === product?.id
            );
            if (insideCart && insideCart.qty === 1) {
              await setDoc(cartRef, {
                items: newState.filter((item) => item.id !== product?.id),
              });
            } else if (insideCart && insideCart?.qty > 1) {
              const updatedCart = newState.map((item) =>
                item.id === product?.id ? { ...item, qty: item.qty - 1 } : item
              );

              await setDoc(cartRef, {
                items: updatedCart,
              });
            } else {
              await setDoc(cartRef, {
                items: newState,
              });
            }
          }

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      async queryFn({ user, newState, product }) {
        try {
          // check that all the parameters are available
          if (user && newState && product) {
            const cartRef = doc(db, "carts", user);
            // and product does  exist in database
            if (newState?.find((item) => item?.id === product?.id)) {
              await setDoc(cartRef, {
                items: newState.filter((item) => item.id !== product?.id),
              });
            }
          }
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useReduceQtyInCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
