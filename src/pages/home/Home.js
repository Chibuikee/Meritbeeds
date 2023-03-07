import React, { useEffect } from "react";
import { BsSearch, BsAlarm } from "react-icons/bs";

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
    <section className="md:left-[0px] s:pl-[150px] absolute top-0 h-[100vh] overflow-y-auto w-full">
      <div className="">
        <div className="flex pt-5 flex-wrap sticky top-0 bg-white items-center justify-between px-10">
          <h1 className="text-center s:text-[red]">
            Hi, {user?.userName}! Welcome Back
          </h1>
          <div className="flex order-3 pc:order-2 w-full md:w-[initial] border border-solid px-5 py-2 rounded-[30px] items-center">
            <input type="text" placeholder="Search" />
            <BsSearch />
          </div>
          <div className="flex pc:order-3 items-center gap-5">
            <img
              src="https://cdn.vanguardngr.com/wp-content/uploads/2019/12/Chibuike-Rotimi-Amaechi.jpg"
              className="h-[30px] w-[35px] rounded-full"
              alt="user"
            />
            <h1 className="truncate">{user?.userName}</h1>
            <BsAlarm />
          </div>
        </div>
        <div>
          <BestAndFlashSale />
        </div>
        <div className="grid grid-cols-2 s:grid-cols-3 gap-3">
          {data?.length === 0 ? (
            <p>No Product Found</p>
          ) : (
            data?.map((c) => <ProductPreview key={c.id} product={c} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
