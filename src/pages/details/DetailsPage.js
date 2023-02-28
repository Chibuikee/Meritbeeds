import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useFetchProductQuery } from "../../redux/features/slices/StoreData";
import {
  useCartFirebaseUpdate,
  useCartSliceFN,
} from "../../customHooks/cartHooks";
import { useFavouriteHook } from "../../customHooks/favouritedHooks";
import { useSelector } from "react-redux";

function DetailsPage() {
  const [newcartState, setCartItems] = useState(null);
  const { productId } = useParams();
  const { data, isLoading, isError, error } = useFetchProductQuery(
    productId ? productId : skipToken
  );
  const rootReducer = useSelector((state) => state?.rootReducer);
  const user = rootReducer?.authReducer;
  const cart = rootReducer?.cartReducer;
  const [syncCartState] = useCartFirebaseUpdate(user?.userID);
  const [addToFavourite, removeFromFavourited] = useFavouriteHook();
  const [shouldCartStateSynchronise, setShouldCartStateSynchronise] =
    useState(false);
  const [getSetUpdateDeleteCart] = useCartSliceFN(setCartItems);

  useEffect(() => {
    isError && toast.error(error);
  }, [isError]);

  useEffect(() => {
    // the shouldCartStateSynchronise state is set to true after mount to allow synchronization

    // the shouldCartStateSynchronise state is set to false on mount to prevent synchronization and is checked on mount
    if (cart) {
      setShouldCartStateSynchronise(true);
      // syncCartState is called everytime the cart state is changed by the getSetUpdateDeleteCart function
      shouldCartStateSynchronise && syncCartState(newcartState);
    }
  }, [newcartState]);

  if (isLoading) {
    return <h1>It`s loading, Please wait!</h1>;
  }
  return (
    <section>
      Details Page
      {data && (
        <div className="w-[200px]">
          <div className="flex gap-5">
            <div className="poster">
              <img
                className="w-[50px] h-[50px]"
                src={data.imageUrl}
                alt="product"
              />
            </div>
            <div className="poster">
              {data.imageUrl1 && (
                <img
                  className="w-[50px] h-[50px]"
                  src={data.imageUrl1}
                  alt="product"
                />
              )}
            </div>
            <div className="poster">
              {data.imageUrl2 && (
                <img
                  className="w-[50px] h-[50px]"
                  src={data.imageUrl2}
                  alt="product"
                />
              )}
            </div>
          </div>
          <h1 className=" bg-[purple]">DETAILS</h1>
          <div className="details">
            <h3 className="text-[36px]">{data.productTitle}</h3>
            <h3>{data.category}</h3>
            <h3>
              Release Date:
              <span className="ml-5">
                {data.createdAt.toDate().toLocaleString()}
              </span>
            </h3>
            <h3>{data.price}</h3>
            <h3 className="text-xs text-[purple]">{data.description}</h3>
          </div>
          <button
            onClick={() => {
              getSetUpdateDeleteCart("addToCart", cart, {
                ...data,
                id: productId,
              });
              console.log("added to cart done!!!");
            }}
          >
            Add to cart
          </button>
          <button
            onClick={() => {
              getSetUpdateDeleteCart("removeFromCart", cart, {
                id: productId,
              });
              console.log("removed from cart done!!!");
            }}
          >
            Remove from cart
          </button>
          <div className="flex gap-10">
            <button
              onClick={() =>
                addToFavourite({
                  ...data,
                  id: productId,
                })
              }
            >
              add to favourite
            </button>
            <button
              onClick={() =>
                removeFromFavourited({
                  id: productId,
                })
              }
            >
              remove from favourite
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailsPage;
