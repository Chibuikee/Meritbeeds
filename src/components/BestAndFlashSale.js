import React from "react";

function BestAndFlashSale() {
  return (
    <div className="s:flex">
      <div className="basis-[30%] px-4 pt-[100px] bg-[rgba(224,229,206,1)]">
        <h4>BEST OFFERS</h4>
        <h1 className="font-semibold text-[28px]">Meritbeads Collection</h1>
        <p className="text-xs max-w-[200px]">
          Join and discover the best product according to your passion
        </p>
        <button className="bg-[rgba(65,84,68,1)] text-xs rounded-[25px] px-3  py-[6px]">
          See More
        </button>
      </div>
      <div className="s:flex basis-[50%]">
        <div className="">
          <h1>Flash Sale</h1>
          <h2>75% OFF</h2>
          <button>Buy Now!</button>
        </div>
        <img
          src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Bag"
          className="h-[164px] w-[175px]"
        />
      </div>
    </div>
  );
}

export default BestAndFlashSale;
