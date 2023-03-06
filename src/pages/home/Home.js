import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";

import ProductPreview from "../../components/storeProducts";
import { useFetchMeritStoreQuery } from "../../redux/features/slices/StoreData";
import { useFetchCartFromFirebase } from "../../customHooks/cartHooks";
import { useIsUserid } from "../../customHooks/UserLogInState";
import BestAndFlashSale from "../../components/BestAndFlashSale";
function Home() {
  const { data, isLoading } = useFetchMeritStoreQuery();
  const user = useIsUserid();

  const [getCartFromFireStore] = useFetchCartFromFirebase(user?.userID);
  useEffect(() => {
    // console.log("the home get cart items useeffect function ran");
    if (user?.userID) {
      // console.log("the home get cart items function ran");
      async function call() {
        await getCartFromFireStore();
      }
      call();
    }
  }, [user?.userID]);

  if (isLoading) {
    return <h1>Its loading,Please wait!</h1>;
  }
  // console.log(user);
  return (
    <section className="ml-[150px]">
      <div>
        <h1 className="text-center">Hi, {user?.userName}! Welcome Back</h1>{" "}
        <div className="flex order-3 s:order-2 mt-5 border border-solid px-5 py-2 rounded-[30px] items-center">
          <input type="text" placeholder="Search" />
          <BsSearch />
        </div>
      </div>
      <div>
        <BestAndFlashSale />
      </div>
      <div className="grid s:grid-cols-3">
        {data?.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          data?.map((c) => <ProductPreview key={c.id} product={c} />)
        )}
      </div>
    </section>
  );
}

export default Home;
