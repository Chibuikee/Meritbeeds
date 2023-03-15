import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useFetchCartQuery,
  useReduceQtyInCartMutation,
  useRemoveFromCartMutation,
} from "../redux/features/slices/cartApiSlice";
import {
  useAddToOrdersMutation,
  useDeleteFromOrdersMutation,
  useFetchOrdersQuery,
  useUpdateOrdersMutation,
} from "../redux/features/slices/ordersSlice";
//
export function useCartHook() {
  const [newUser, setState] = useState([]);
  const user = useSelector((state) => state?.rootReducer.authReducer.userID);
  const [addToOrders] = useAddToOrdersMutation();
  const [updateOrders] = useUpdateOrdersMutation();
  const [deleteFromOrders] = useDeleteFromOrdersMutation();
  const { data, isLoading } = useFetchOrdersQuery();
  useEffect(() => {
    setState(user);
  }, [user]);

  function addToOrdersFn(product) {
    // check whether a state and product has been passed first and
    if (data && product)
      addToOrders({
        user: newUser,
        product: product,
      });
  }
  function updateOrdersFn(product) {
    // check whether a state and product has been passed first and
    // also ensure that the product is not in the database
    if (data && product && data?.find((item) => item?.id === product?.id))
      updateOrders({
        newState: data,
        product: product,
      });
  }

  function deleteFromOrdersFn(product) {
    // check whether a state and product has been passed first
    if (data && product)
      deleteFromOrders({
        product: product,
      });
  }

  return [addToOrdersFn, deleteFromOrdersFn, updateOrdersFn];
}
