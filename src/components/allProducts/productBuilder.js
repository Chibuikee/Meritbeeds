import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteMeritStoreProductMutation } from "../../redux/features/slices/StoreData";

export default function ProductBuilder({ product }) {
  const [deleteMeritStoreProduct] = useDeleteMeritStoreProductMutation();
  async function deleteProduct(id) {
    if (window.confirm("Merit do you really want to delete this product!"))
      await deleteMeritStoreProduct(id);
    toast.success("Merit product deleted successfully");
  }
  return (
    <div className=" bg-[] rounded-[22px]">
      <div className="flex justify-center rounded-[15px] py-10 px-2 bg-[rgba(224,229,206,1)]">
        <Link to={`Details/${product.id}`}>
          <img
            className="w-[150px] h-[100px]"
            src={product.imageUrl}
            alt="product"
          />
        </Link>
      </div>
      <div className="preview">
        <Link to={`Details/${product.id}`}>
          <h3 className="truncate">{product.productTitle}</h3>
        </Link>
        {/* <h3>{product.shortDescription}</h3> */}
        <h3>₦{product.price}</h3>
      </div>
      <div className="">
        <button
          className="bg-[#b18e8e] mb-1 mr-1 rounded-md px-2 py-1"
          onClick={() => deleteProduct(product.id)}
        >
          Delete item
        </button>
        <Link to={`/Editproduct/${product.id}`}>
          <button className="bg-[rgba(224,229,206,1)] rounded-md px-2 py-1">
            Edit item
          </button>
        </Link>
      </div>
    </div>
  );
}

{
  /* <div className="w-[200px]">
      <div className="poster">
        <img
          className="w-[50px] h-[50px]"
          src={product.imageUrl}
          alt="product"
        />
      </div>
      <h1 className=" bg-[purple]">DETAILS</h1>
      <div className="details">
        <h3>{product.category}</h3>
        <h3>Release Date:{product.createdAt.toDate().toLocaleString()}</h3>
        <h3>{product.shortDescription}</h3>
        <h3>{product.productTitle}</h3>
        <h3>{product.price}</h3>
        <h3 className="text-xs text-[purple]">{product.description}</h3>
        <div className="flex gap-10">
          <button onClick={() => deleteProduct(product.id)}>Delete item</button>
          <Link to={`/Editproduct/${product.id}`}>
            <button>Edit item</button>
          </Link>
        </div>
      </div>
    </div> */
}
