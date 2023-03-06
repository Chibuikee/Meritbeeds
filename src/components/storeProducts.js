import { Link } from "react-router-dom";

export default function ProductPreview({ product }) {
  return (
    <div className="s:w-[200px]">
      <div className="poster py-5 px-2 bg-[green]">
        <Link to={`Details/${product.id}`}>
          <img
            className="w-[150px] h-[100px]"
            src={product.imageUrl}
            alt="product"
          />
        </Link>
      </div>
      <div className="preview">
        <h3>{product.productTitle}</h3>
        {/* <h3>{product.shortDescription}</h3> */}
        <h3>{product.price}</h3>
        <Link to={`Details/${product.id}`}>
          <button>Details of product</button>
        </Link>
      </div>
    </div>
  );
}
