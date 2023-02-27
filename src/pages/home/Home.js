import React, { useEffect } from "react";
import ProductPreview from "../../components/storeProducts";
import { useFetchMeritStoreQuery } from "../../redux/features/slices/StoreData";
import { useFetchCartFromFirebase } from "../../customHooks/cartHooks";
import { useIsUserid } from "../../customHooks/UserLogInState";
function Home() {
  const { data, isLoading, isError, error } = useFetchMeritStoreQuery();
  const user = useIsUserid();
  // console.log(user?.userID, "state from home");
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

  return (
    <section>
      <h1 className="text-center">Welcome Home</h1>Start shopping
      <div className="flex">
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
