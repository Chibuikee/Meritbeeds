import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {
//   useGeneralCartUpdateCart,
//   useRemoveFromCart,
// } from "../../firebase/dataBase";
import {
  useCartFirebaseUpdate,
  useCartSliceFN,
  useFetchCartFromFirebase,
} from "../../customHooks/cartHooks";

function Cart() {
  const rootReducer = useSelector((state) => state?.rootReducer);
  const user = rootReducer?.authReducer;
  const cart = rootReducer?.cartReducer;

  const [cartItems, setCartItems] = useState();
  const [shouldCartStateSynchronise, setShouldCartStateSynchronise] =
    useState(false);
  const [getSetUpdateDeleteCart] = useCartSliceFN(setCartItems);
  const dispatch = useDispatch();
  // synchronize the data on state and firestore database
  const [syncCartState] = useCartFirebaseUpdate(user?.userID);
  const [getCartFromFireStore] = useFetchCartFromFirebase(user?.userID);

  useEffect(() => {
    // console.log("use effect function ran");
    if (user) {
      getCartFromFireStore(setCartItems);
    }
  }, [user?.userID]);
  // console.log(cartItems, "whether info has been fetched");
  console.log(cartItems, user?.userID, "cart component rendered");

  useEffect(() => {
    // the shouldCartStateSynchronise state is set to true after mount to allow synchronization

    // the shouldCartStateSynchronise state is set to false on mount to prevent synchronization and is checked on mount
    if (cartItems) {
      setShouldCartStateSynchronise(true);
      // syncCartState is called everytime the cartitems state is changed by the getSetUpdateDeleteCart function
      shouldCartStateSynchronise && syncCartState(cartItems);
    }
  }, [cartItems]);

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
                  getSetUpdateDeleteCart("reduceQtyInCart", cartItems, {
                    id: "hello",
                    shortDescription: "",
                    description: "",
                    prices: "",
                    imageUrl: "",
                    imageUrl1: "",
                    imageUrl2: "",
                    categoro: "",
                  });
                  // removeFromCart(product);
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
