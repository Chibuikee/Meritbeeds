import { useFetchMeritStoreQuery } from "../../redux/features/slices/StoreData";
import LoadingSpinner from "../LoadingSpinner";
import ProductBuilder from "./productBuilder";

function AllProducts() {
  const { data, isLoading, isError, error } = useFetchMeritStoreQuery();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-[30px] px-6 s:pl-0 grid gap-x-2 gap-y-10 grid-cols-2 xxxs:grid-cols-3  ssm:grid-cols-4 pc:grid-cols-6  justify-between ">
      {data?.length === 0 ? (
        <p>No Product Found, please add some products to your store Merit</p>
      ) : (
        data?.map((c) => <ProductBuilder key={c.id} product={c} className="" />)
      )}
    </div>
  );
}

export default AllProducts;
