import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useFetchCartQuery,
  useReduceQtyInCartMutation,
  useRemoveFromCartMutation,
} from "../redux/features/slices/cartApiSlice";

export function useCartHook() {
  const [newUser, setState] = useState([]);
  const user = useSelector((state) => state?.rootReducer.authReducer.userID);
  const [addToCart] = useAddToCartMutation();
  const [reduceQtyInCart] = useReduceQtyInCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const { data, isLoading } = useFetchCartQuery(newUser ? newUser : skipToken);
  useEffect(() => {
    setState(user);
  }, [user]);
  console.log(data, "from cart testing");
  function addToCartNow(product) {
    // check whether a state and product has been passed first and
    if (product)
      addToCart({
        user: newUser,
        newState: data ?? [],
        product: product,
      });
  }
  function reduceQtyInCartNow(product) {
    // check whether a state and product has been passed first and
    // also ensure that the product is not in the database
    if (data && product && data?.find((item) => item?.id === product?.id))
      reduceQtyInCart({
        user: newUser,
        newState: data,
        product: product,
      });
  }

  function removeFromCartNow(product) {
    // check whether a state and product has been passed first
    if (data && product)
      removeFromCart({
        user: newUser,
        newState: data,
        product: product,
      });
  }

  return [addToCartNow, removeFromCartNow, reduceQtyInCartNow];
}
