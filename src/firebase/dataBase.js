import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  //   getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { useIsUserid } from "../customHooks/UserLogInState";
import { uploadToCart } from "../redux/features/slices/cartSlice";
// import { useRealtimeUserDetails } from "./auth";
export function useWriteDb(formData) {
  const productsRef = collection(db, "products");
  async function writeDb() {
    try {
      await addDoc(productsRef, formData);
      toast("Merit this product has been added, congrats", {
        type: "success",
      });
    } catch (error) {
      toast("This value is not updated, try again", { type: "error" });
    }
  }

  return writeDb;
}
export function useFetchAllProducts() {
  const [allProductsFetched, setAllProductsFetched] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProductsFetched(productsData);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  return allProductsFetched;
}

// const q = query(CommentRef, orderBy("createdAt", "description"))
// function to delete a product from the database.FOR ADMIN ONLY IN DASHBOARD
export function useDeletedoc() {
  async function deleteItem(productId) {
    await deleteDoc(doc(db, "products", productId));
    toast.success("Product deleted");
  }
  return deleteItem;
}

// // CART FUNCTIONS

//   ||
//   [
//     {
//       category: "Blue bags",
//       createdAt: { seconds: 1677155118, nanoseconds: 842000000 },
//       description: "i dont know what esle to test",
//       imageUrl:
//         "https://firebasestorage.googleapis.com/v0/b/webstoredev-affa8.appspot.com/o/products%2F1677156008528IMG_3141.jpg?alt=media&token=bf8abf77-cf6b-4396-9e0a-8782f071b849",
//       price: "1",
//       productTitle: "important ",
//       shortDescription: "this is to ensure no bug",
//     },
//   ]
// for adding items into individuals cart
export function useAddToCart() {
  const { cartReducer: cartItems } = useSelector((state) => state);
  const user = useIsUserid();
  function addToCart(item) {
    // add an item to the user's cart

    const newCartItems = [...cartItems, item];
    const cartRef = doc(db, "carts", user);
    setDoc(cartRef, { items: newCartItems });
    // setCartItems(newCartItems);
    // console.log(user);
    toast.success("item added to cart");
  }
  return addToCart;
}

// for removing items from an individual`s cart
export function useRemoveFromCart() {
  const { cartReducer: cartItems } = useSelector((state) => state);
  const user = useIsUserid();
  function removeFromCart(item) {
    // remove an item from the user's cart
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      const cartRef = doc(db, "carts", user);
      setDoc(cartRef, { items: newCartItems });
      // setCartItems(newCartItems);
      toast.success("removed from cart successfully");
    }
  }
  return removeFromCart;
}

export function useGeneralCartUpdateCart() {
  const { authReducer: user, cartReducer: cartItems } = useSelector(
    (state) => state
  );
  // console.log(cartItems, user?.userID);
  async function generalCartUpdateCart() {
    const newCartItems = [...cartItems];
    const cartRef = doc(db, "carts", user?.userID);
    await setDoc(cartRef, { items: newCartItems });
    toast.success("Updated cart successfully!!");
  }
  return generalCartUpdateCart;
}
