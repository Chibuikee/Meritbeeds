import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useCartHook } from "../../customHooks/cartHook";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useFetchCartQuery } from "../../redux/features/slices/cartApiSlice";

function Cart() {
  const location = useLocation();

  const rootReducer = useSelector((state) => state?.rootReducer);
  const user = rootReducer?.authReducer;
  const { data, isLoading } = useFetchCartQuery(
    user?.userID ? user?.userID : skipToken
  );
  const [addToCartNow, removeFromCartNow, reduceQtyInCartNow] = useCartHook();

  if (isLoading) return <h1>CART ITEMS ARE BEEN FETCHED</h1>;
  return (
    <div
      className={`mt-[50px] bg-[#f8f4f4] ${
        location?.pathname.substring(1, 5) == "Cart" ? "lg:ml-[150px]" : null
      }`}
    >
      {data ? (
        data?.map((product) => (
          <div
            className="w-full h-[150px] mt-2 bg-[purple] items-center flex gap-5"
            key={product.id}
          >
            <div className="h-full flex justify-center items-center py-3 bg-[#e4e4e4] basis-[110px]">
              <img
                className="max-h-[100px] bg-center bg-[green]"
                src={product.imageUrl}
                alt="product"
              />
            </div>
            <div className="py-5">
              <Link to={`Details/${product.id}`}>
                <h3>{product.productTitle}</h3>
              </Link>
              <h3 className="py-2">$ {product.price}</h3>
              <div className="flex gap-2 items-center">
                <button
                  className="bg-[blue] px-2 py-1 rounded-[8px]"
                  onClick={() => {
                    addToCartNow({
                      id: product.id,
                    });
                  }}
                >
                  Qty+
                </button>
                <h1 className="">{product.qty}</h1>
                <button
                  className="bg-[white] px-2 py-1 rounded-[8px]"
                  onClick={() => {
                    reduceQtyInCartNow(product);
                  }}
                >
                  Qty-
                </button>
              </div>
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
