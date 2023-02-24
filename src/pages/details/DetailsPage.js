import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { useDispatch } from "react-redux";
import {
  useAddToCart,
  useGeneralCartUpdateCart,
  useRemoveFromCart,
} from "../../firebase/dataBase";
import { addToCart } from "../../redux/features/slices/cartSlice";

function DetailsPage() {
  const [productData, setProductData] = useState("");
  const params = useParams();
  const generalCartUpdateCart = useGeneralCartUpdateCart();
  const { productId } = params;
  const dispatch = useDispatch();
  const addedToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const docRef = doc(db, "products", productId);
  useEffect(() => {
    async function getProduct() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProductData(docSnap.data());
      } else {
        toast("Product not available");
      }
    }
    getProduct();
  }, []);
  function hi(tobe) {
    return new Promise((resolve, reject) => {
      dispatch(addToCart(tobe));
      console.log("item added to cart!");
      // Code for the hi function goes here
      resolve();
    });
  }
  return (
    <section>
      Details Page
      {productData && (
        <div
          //   onClick={() => opendetails(moviedataList.id)}
          className="w-[200px]"
        >
          <div className="poster">
            <img
              className="w-[50px] h-[50px]"
              src={productData.imageUrl}
              alt="product"
            />
          </div>
          <h1 className=" bg-[purple]">DETAILS</h1>
          <div className="details">
            <h3>{productData.category}</h3>
            {/* <h3>Release Date:{product.createdAt}</h3> */}
            <h3>{productData.shortDescription}</h3>
            <h3>{productData.productTitle}</h3>
            <h3>{productData.price}</h3>
            <h3 className="text-xs text-[purple]">{productData.description}</h3>
          </div>
          <button
            onClick={() => {
              hi({ ...productData, id: productId }).then(() => {
                generalCartUpdateCart();
                console.log("general update done!!!");
              });
            }}
          >
            Add to cart
          </button>
          <button onClick={() => removeFromCart(productData)}>
            Remove from cart
          </button>
        </div>
      )}
    </section>
  );
}

export default DetailsPage;
