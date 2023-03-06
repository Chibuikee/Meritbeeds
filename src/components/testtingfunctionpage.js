import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useFetchCartQuery,
  useReduceQtyInCartMutation,
  useRemoveFromCartMutation,
} from "../redux/features/slices/cartApiSlice";
// import { toast } from "react-toastify";

import {
  useAddToMeritFavouriteMutation,
  useDeleteFromMeritFavouriteMutation,
  useFetchMeritFavouriteQuery,
} from "../redux/features/slices/Wishlist";

function Testtingfunctionpage() {
  const [newUser, setState] = useState([]);
  const user = useSelector((state) => state?.rootReducer.authReducer.userID);
  const [addToMeritFavourite] = useAddToMeritFavouriteMutation();
  const [deleteFromMeritFavourite] = useDeleteFromMeritFavouriteMutation();
  const [reduceQtyInCart] = useReduceQtyInCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const { data, isLoading } = useFetchMeritFavouriteQuery(
    newUser ? newUser : skipToken
  );
  const {
    data: cartnews,
    isLoading: cartLoading,
    isError,
    error,
  } = useFetchCartQuery(newUser ? newUser : skipToken);

  const [addToCart] = useAddToCartMutation();
  useEffect(() => {
    setState(user);
  }, [user]);
  console.log(cartnews);
  //   function addToCart(state, product) {
  //     // check whether a state and product has been passed first and
  //     // also ensure that the product is not in the database
  //     if (state && product && !state?.find((item) => item?.id === product?.id))
  //       addToMeritFavourite({
  //         user: newUser,
  //         newState: state,
  //         product: product,
  //       });

  //     // console.log(newUser);
  //     // toast.success(" added cart successfully");
  //   }
  //   function removeFromCart(state, product) {
  //     // check whether a state and product has been passed first
  //     if (state && product)
  //       deleteFromMeritFavourite({
  //         user: newUser,
  //         newState: state,
  //         product: product,
  //       });
  //   }
  //   console.log(data);
  if (isLoading) return <h1>THE DATA IS BEEN FETCHED</h1>;
  return (
    <section>
      <div>
        {data?.map((product) => (
          <div className="" key={product.id}>
            <div className="poster flex gap-10">
              <img
                className="w-[50px] h-[50px]"
                src={product.imageUrl}
                alt="product"
              />
              <h3>{product.productTitle}</h3>
              <h3>{product.price}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-10">
        <button
          onClick={() =>
            removeFromCart({
              user: newUser,
              newState: cartnews,
              product: {
                categoro: "",
                description: "",
                id: "hello",
                imageUrl: "",
                imageUrl1: "",
                imageUrl2: "",
                prices: "",
                qty: 1,
                shortDescription: "",
              },
            })
          }
        >
          addToCart
        </button>
        <button
        //   onClick={() =>
        //     removeFromCart(data, {
        //       categoro: "",
        //       description: "",
        //       id: "hello",
        //       imageUrl: "",
        //       imageUrl1: "",
        //       imageUrl2: "",
        //       prices: "",
        //       qty: 1,
        //       shortDescription: "",
        //     })
        //   }
        >
          removeFromCart
        </button>
      </div>
    </section>
  );
}

export default Testtingfunctionpage;
