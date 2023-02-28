import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddToMeritFavouriteMutation,
  useDeleteFromMeritFavouriteMutation,
  useFetchMeritFavouriteQuery,
} from "../redux/features/slices/Wishlist";

export function useFavouriteHook() {
  const [newUser, setState] = useState([]);
  const user = useSelector((state) => state?.rootReducer.authReducer.userID);
  const [addToMeritFavourite] = useAddToMeritFavouriteMutation();
  const [deleteFromMeritFavourite] = useDeleteFromMeritFavouriteMutation();
  const { data, isLoading } = useFetchMeritFavouriteQuery(
    newUser ? newUser : skipToken
  );
  useEffect(() => {
    setState(user);
  }, [user]);

  function addToFavourite(product) {
    // check whether a state and product has been passed first and
    // also ensure that the product is not in the database
    if (data && product && !data?.find((item) => item?.id === product?.id))
      addToMeritFavourite({
        user: newUser,
        newState: data,
        product: product,
      });

    // console.log(newUser);
    // toast.success(" added cart successfully");
  }

  function removeFromFavourited(product) {
    // check whether a state and product has been passed first
    if (data && product)
      deleteFromMeritFavourite({
        user: newUser,
        newState: data,
        product: product,
      });
  }

  return [addToFavourite, removeFromFavourited];
}
