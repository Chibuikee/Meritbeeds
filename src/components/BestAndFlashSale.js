import React from "react";
import homeimg from "../assets/homeimg.png";
function BestAndFlashSale() {
  return (
    <div className="px-6 s:flex pc:block lg:flex gap-[30px]">
      <div className="rounded-[30px] basis-[30%] px-[22px] pb-[22px] pt-[134px] bg-[#E0E5CE]">
        <h4 className="text-[#338838] text-xs font-['Montserrat'] leading-[1.5rem] font-[700]">
          BEST OFFERS
        </h4>
        <h1 className="font-semibold my-2 text-[28px] text-[#08080A] leading-[37px] tracking-[-0.04em]">
          Meritbeads Collection
        </h1>
        <p className="text-xs max-w-[250px] font-[500] text-[#76777C] leading-[24px] tracking-[-0.02em]">
          Join and discover the best product according to your passion
        </p>
        <button className="bg-[#415444] text-xs my-2 rounded-[30px] px-6  py-3">
          See More
        </button>
      </div>
      <div className="xxxs:flex s:block md:flex lg:block llg:flex pc:mt-10 lg:mt-[initial]  mt-10 s:mt-[initial] basis-[70%] px-[44px] pt-[66px] pb-[71px] rounded-[30px] bg-[#E7DDD1]">
        <div className="">
          <h1 className="text-[2.5rem] md:text-[clamp(1.5rem,_0.8vw_+_1.25rem,_2.5rem)] lg:text-[2.5rem] text-[#405242] leading-[53px] font-['Playfair_Display']">
            Flash Sale
          </h1>
          <h2 className="text-[2rem] mt-[16px] mb-[28px] text-[#08080A] leading-[39px]">
            75% OFF
          </h2>

          <button className="bg-[#415444] my-2 text-xs font-[700] text-[#FFFFFF] tracking-[-0.005em] leading-[15px] rounded-[8px] px-[2em]  py-4">
            Buy Now!
          </button>
        </div>
        <img
          src={homeimg}
          alt="Bag"
          className="h-[164px] w-[195px] llg:w-[250px]"
        />
      </div>
    </div>
  );
}

export default BestAndFlashSale;
