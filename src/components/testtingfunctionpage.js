// import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import {
  useCartFirebaseUpdate,
  useCartSliceFN,
} from "../customHooks/cartHooks";

// import { db } from "../firebase/config";

function Testtingfunctionpage() {
  const [newState, setState] = useState([]);
  const user = useSelector((state) => state?.rootReducer.authReducer.userID);
  const [getSetUpdateDeleteCart] = useCartSliceFN(setState);
  const [syncCartState] = useCartFirebaseUpdate(user);
  // console.log(newState, user);

  useEffect(() => {
    if (user) {
      //   const cartRef = doc(db, "carts", user);
      //   console.log(newState, "this is in update hook!");
      //   setDoc(cartRef, { items: newState });
      //   // toast.success("uploaded cart successfully");
      syncCartState(newState);
    }
  }, [newState]);

  function reduceQtyInCart() {
    getSetUpdateDeleteCart("reduceQtyInCart", newState, {
      id: "hello",
      shortDescription: "",
      description: "",
      prices: "",
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      categoro: "",
    });
    // const cartRef = doc(db, "carts", user);
    console.log(newState);
    // await setDoc(cartRef, { items: newState });
    // toast.success("reduce cart qty successfully");
  }

  function uploadToCart() {
    getSetUpdateDeleteCart("uploadToCart", [], {
      id: "hello",
      shortDescription: "",
      description: "",
      prices: "",
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      categoro: "",
      qty: 1,
    });
    const see = newState;
    // const cartRef = doc(db, "carts", user);
    console.log(see, "this is in upload fn");
    // setDoc(cartRef, { items: newState });
    // toast.success("uploaded cart successfully");
  }

  function addToCart() {
    getSetUpdateDeleteCart("addToCart", newState, {
      id: "hello",
      shortDescription: "",
      description: "",
      prices: "",
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      categoro: "",
      qty: 1,
    });
    // const cartRef = doc(db, "carts", user);
    console.log(newState);
    // await setDoc(cartRef, { items: newState });
    // toast.success(" added cart successfully");
  }
  function removeFromCart() {
    getSetUpdateDeleteCart("removeFromCart", newState, {
      id: "hello",
      shortDescription: "",
      description: "",
      prices: "",
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      categoro: "",
      qty: 1,
    });
    // const cartRef = doc(db, "carts", user);
    console.log(newState);
    // await setDoc(cartRef, { items: newState });
    // toast.success("removed from cart successfully");
  }
  console.log(newState);
  return (
    <div className="flex gap-10">
      <button onClick={uploadToCart}>uploadToCart</button>
      <button onClick={addToCart}>addToCart</button>
      <button onClick={reduceQtyInCart}>reduceQtyInCart</button>
      <button onClick={removeFromCart}>removeFromCart</button>
    </div>
  );
}

export default Testtingfunctionpage;
