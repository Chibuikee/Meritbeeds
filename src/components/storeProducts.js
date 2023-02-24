import { Link } from "react-router-dom";

export default function ProductPreview({ product }) {
  return (
    <div
      //   onClick={() => opendetails(moviedataList.id)}
      className="w-[200px]"
    >
      <div className="poster">
        <img
          className="w-[50px] h-[50px]"
          src={product.imageUrl}
          alt="product"
        />
      </div>
      <div className="preview">
        <h3>{product.productTitle}</h3>
        <h3>{product.shortDescription}</h3>
        <h3>{product.price}</h3>
        <Link to={`Details/${product.id}`}>
          <button>Details of product</button>
        </Link>
      </div>
    </div>
  );
}
