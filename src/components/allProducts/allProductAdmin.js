import { useFetchMeritStoreQuery } from "../../redux/features/slices/StoreData";

import ProductBuilder from "./productBuilder";

function AllProducts() {
  const { data, isLoading, isError, error } = useFetchMeritStoreQuery();
  if (isLoading) {
    return <h1>fetching data now, Please wait!</h1>;
  }
  return (
    <div className="flex">
      {data?.length === 0 ? (
        <p>No Product Found, please add some products to your store Merit</p>
      ) : (
        data?.map((c) => <ProductBuilder key={c.id} product={c} />)
      )}
    </div>
  );
}

export default AllProducts;
