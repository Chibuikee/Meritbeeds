import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useCartHook } from "../../customHooks/cartHook";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useFetchCartQuery } from "../../redux/features/slices/cartApiSlice";

function Cart() {
  const rootReducer = useSelector((state) => state?.rootReducer);
  const user = rootReducer?.authReducer;
  const { data, isLoading } = useFetchCartQuery(
    user?.userID ? user?.userID : skipToken
  );
  const [removeFromCartNow, reduceQtyInCartNow] = useCartHook();

  if (isLoading) return <h1>CART ITEMS ARE BEEN FETCHED</h1>;
  return (
    <div>
      {data ? (
        data?.map((product) => (
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
                  reduceQtyInCartNow(product);
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
