// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useFetchAllProducts } from "../../firebase/dataBase";

import ProductBuilder from "./productBuilder";

function AllProducts() {
  const fetchProducts = useFetchAllProducts();

  return (
    <div className="flex">
      {fetchProducts?.length === 0 ? (
        <p>No Product Found</p>
      ) : (
        fetchProducts?.map((c) => <ProductBuilder key={c.id} product={c} />)
      )}
    </div>
  );
}

export default AllProducts;
