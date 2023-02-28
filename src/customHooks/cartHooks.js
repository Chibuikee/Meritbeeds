import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { uploadToCart } from "../redux/features/slices/cartSlice";

export function useCartSliceFN(setState) {
  function findItemInCart(state, product) {
    return state?.find((item) => item.id === product?.id);
  }

  function getSetUpdateDeleteCart(action, state, payload) {
    switch (action) {
      case "uploadToCart":
        if (payload) {
          //   console.log(payload, "from upload reducer checking out");
          setState([{ ...payload }]);
        } else {
          setState([...state]);
        }

        break;

      case "addToCart":
        // console.log(payload, "from add reducer");
        const insideCart = findItemInCart(state, payload);
        if (insideCart) {
          const updatedCart = state?.map((item) =>
            item.id === payload?.id ? { ...item, qty: item?.qty + 1 } : item
          );
          setState(updatedCart);
        } else {
          setState([...state, { ...payload, qty: 1 }]);
        }
        break;

      case "reduceQtyInCart":
        const insideCart2 = findItemInCart(state, payload);
        if (insideCart2 && insideCart2.qty === 1) {
          const updatedCart = state.filter((item) => item.id !== payload?.id);
          setState([...updatedCart]);
        } else if (insideCart2 && insideCart2?.qty > 1) {
          const updatedCart = state.map((item) =>
            item.id === payload?.id ? { ...item, qty: item.qty - 1 } : item
          );
          setState(updatedCart);
        } else {
          setState([...state]);
        }
        break;

      case "removeFromCart":
        const insideCart3 = findItemInCart(state, payload);
        if (insideCart3) {
          const updatedCart = state.filter((item) => item.id !== payload?.id);
          setState([...updatedCart]);
        } else {
          setState([...state]);
        }
        break;
      default:
        setState([...state]);
    }
  }
  return [getSetUpdateDeleteCart];
}

export function useCartFirebaseUpdate(user) {
  function syncCartState(newState) {
    if (user) {
      const cartRef = doc(db, "carts", user);
      //   console.log(newState, "this is in update hook!");
      setDoc(cartRef, { items: newState });
      toast.success("uploaded cart successfully");
    }
  }
  return [syncCartState];
}

export function useFetchCartFromFirebase(user) {
  const dispatch = useDispatch();
  const getCartFromFireStore = async (setCartItems) => {
    // get the user's cart data from Firestore
    // console.log("getProduct from firestore function ran");
    if (!user) return;
    const cartRef = doc(db, "carts", user);
    const docSnap = await getDoc(cartRef);
    // console.log("whether docSnap is working");
    if (docSnap.exists()) {
      //   console.log(docSnap.data().items, "from cart fetch hook");
      dispatch(uploadToCart(docSnap.data().items));
      if (setCartItems) {
        setCartItems(docSnap.data().items);
      }
    } else {
      //   console.log("id not available cart fetch hook not called");
    }
  };
  return [getCartFromFireStore];
}
