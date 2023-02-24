import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGeneralCartUpdateCart,
  useRemoveFromCart,
} from "../../firebase/dataBase";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {
  removeFromCart,
  uploadToCart,
} from "../../redux/features/slices/cartSlice";

function Cart() {
  const { authReducer: user, cartReducer } = useSelector((state) => state);
  const generalCartUpdateCart = useGeneralCartUpdateCart();
  // const removeFromCart = useRemoveFromCart();

  const [cartItems, setCartItems] = useState();
  const dispatch = useDispatch();
  const getProduct = async (user) => {
    // get the user's cart data from Firestore
    // console.log("getProduct function ran");
    if (!user) return;
    const cartRef = doc(db, "carts", user);
    const docSnap = await getDoc(cartRef);
    // console.log("whether docSnap is working");
    if (docSnap.exists()) {
      console.log(docSnap.data().items, "from cart fetch hook");
      // dispatch(uploadToCart(docSnap.data().items));
      setCartItems(docSnap.data().items);
    } else {
      // console.log("id not available cart fetch hook not called");
    }
  };
  useEffect(() => {
    // console.log("use effect function ran");
    getProduct(user?.userID);
  }, []);
  // console.log(cartItems, "whether info has been fetched");
  // console.log(cartReducer, "cart component rendered");
  function hi(tobe) {
    return new Promise((resolve, reject) => {
      dispatch(removeFromCart(tobe));
      console.log("item removed from cart!");

      resolve();
    });
  }

  return (
    <div>
      {cartItems ? (
        cartItems?.map((product) => (
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
            <div className="preview">
              <Link to={`Details/${product.id}`}>
                <button>Details of product</button>
              </Link>
              <button
                onClick={() => {
                  // removeFromCart(product);
                  hi(product)
                    .then(() => {
                      generalCartUpdateCart();
                    })
                    .catch(() => generalCartUpdateCart());

                  // getProduct(user?.userID);
                }}
              >
                Remove from cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default Cart;
