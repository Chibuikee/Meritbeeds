import React from "react";

function BestAndFlashSale() {
  return (
    <div className="s:flex">
      <div className="basis-[30%] px-4 pt-[100px] bg-[green]">
        <h4>BEST OFFERS</h4>
        <h1>Meritbeads Collection</h1>
        <p className="text-xs max-w-[200px]">
          Join and discover the best product according to your passion
        </p>
        <button>See More</button>
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
