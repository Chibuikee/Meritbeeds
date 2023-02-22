import React from "react";

export default function ProductBuilder({ product }) {
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
      <h1 className=" bg-[purple]">DETAILS</h1>
      <div className="details">
        <h3>{product.category}</h3>
        {/* <h3>Release Date:{product.createdAt}</h3> */}
        <h3>{product.shortDescription}</h3>
        <h3>{product.productTitle}</h3>
        <h3>{product.price}</h3>
        <h3 className="text-xs text-[purple]">{product.description}</h3>
      </div>
    </div>
  );
}
