import React from "react";
import { useFetchAllProducts } from "../../firebase/dataBase";
import ProductPreview from "../../components/storeProducts";
function Home() {
  const fetchProducts = useFetchAllProducts();
  return (
    <section>
      <h1 className="text-center">Welcome Home</h1>Start shopping
      <div className="flex">
        {fetchProducts?.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          fetchProducts?.map((c) => <ProductPreview key={c.id} product={c} />)
        )}
      </div>
    </section>
  );
}

export default Home;
