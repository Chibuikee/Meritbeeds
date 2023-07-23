import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsPerson, BsCart3, BsSearch, BsTruck } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import { FcHome } from "react-icons/fc";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useFetchProductQuery } from "../../redux/features/slices/StoreData";
import { useFavouriteHook } from "../../customHooks/favouritedHooks";
import { useCartHook } from "../../customHooks/cartHook";
import LoadingSpinner from "../../components/LoadingSpinner";

function DetailsPage() {
  const { productId } = useParams();
  const { data, isLoading, isError, error } = useFetchProductQuery(
    productId ? productId : skipToken
  );
  const [addToCartNow, removeFromCartNow] = useCartHook();

  const [addToFavourite, removeFromFavourited] = useFavouriteHook();
  const [pickedBag, setPickedBag] = useState(null);
  const [star, setStar] = useState(null);

  useEffect(() => {
    isError && toast.error(error);
  }, [isError, error]);
  // console.log(star);
  if (isLoading) return <LoadingSpinner />;
  return (
    <section className="md:px-5 pb-10 font-satoshi">
      <div className="flex justify-between px-10 items-center flex-wrap sticky top-0 bg-[white] pt-10">
        <div className="">
          <Link to="/">
            <h1 className="font-bold"> MERITBEEDS</h1>
          </Link>
        </div>
        <div className="hidden xs:flex order-3 s:order-2 mt-5 xs:mt-[0px]  border border-solid px-5 py-2 rounded-[30px] items-center">
          <input type="text" placeholder="Search" />
          <BsSearch />
        </div>
        <div className="flex gap-5 s:order-3 ">
          <Link to="/Updateprofile">
            <BsPerson />
          </Link>
          <Link to="/">
            <MdFavoriteBorder />
          </Link>
          <Link to="/Cart">
            <BsCart3 />
          </Link>
        </div>
      </div>
      {data && (
        <div className="w-full md:flex flex-row-reverse justify-between px-5">
          <div className="basis-[60%] relative">
            <div className="poster flex justify-center md:absolute top-[190px] left-10">
              <img
                className=" h-[250px]"
                src={pickedBag ? pickedBag?.url : data.imageUrl}
                alt="product"
              />
            </div>

            <div className="flex gap-5 justify-center md:absolute top-[450px] left-10 ">
              <div
                className={`poster ${
                  pickedBag?.name == "imageUrl" && "border"
                } border-solid border-[red]`}
              >
                <img
                  className="w-[50px] h-[50px]"
                  src={data.imageUrl}
                  alt="product"
                  onClick={() =>
                    setPickedBag({ url: data.imageUrl, name: "imageUrl" })
                  }
                />
              </div>
              <div
                className={`poster ${
                  pickedBag?.name == "imageUrl1" && "border"
                } border-solid border-[red]`}
              >
                {data.imageUrl1 && (
                  <img
                    className="w-[50px] h-[50px]"
                    src={data.imageUrl1}
                    alt="product"
                    onClick={() =>
                      setPickedBag({ url: data.imageUrl1, name: "imageUrl1" })
                    }
                  />
                )}
              </div>
              <div
                className={`poster ${
                  pickedBag?.name == "imageUrl2" && "border"
                } border-solid border-[red]`}
              >
                {data.imageUrl2 && (
                  <img
                    className="w-[50px] h-[50px]"
                    src={data.imageUrl2}
                    alt="product"
                    onClick={() =>
                      setPickedBag({ url: data.imageUrl2, name: "imageUrl2" })
                    }
                  />
                )}
              </div>
            </div>
          </div>
          {/* <h1 className=" bg-[purple]">DETAILS</h1> */}

          <div className="basis-[45%] mt-5 px-5 md:mt-16 ">
            <div className="details">
              <div className="flex items-center gap-10">
                <h3 className="text-[20px] whitespace-nowrap font-semibold md:text-[36px]">
                  {data.productTitle}
                </h3>
                <MdFavoriteBorder
                  size={25}
                  className="inline mt-1 text-[red]"
                />
              </div>
              {/* <h3 className="mt-16 font-medium">{data.category}</h3> */}
              <h3 className="text-xs mt-5 text-[black]">{data.description}</h3>
              <h3 className="text-xs font-bold mt-3">
                RELEASE DATE:
                <span className="ml-5 text-xs">
                  {data.createdAt
                    .toDate()
                    .toLocaleString()
                    .match(/^\d{1,2}\/\d{1,2}\/\d{4}/)}
                </span>
              </h3>
              <h3 className="mt-5">₦{data.price}</h3>
              <div className="flex items-center gap-3">
                <div className="rating">
                  <input
                    type="radio"
                    name="rating"
                    value="5"
                    id="5"
                    onClick={(e) => setStar(e.target.value)}
                  />
                  <label htmlFor="5">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    id="4"
                    onClick={(e) => setStar(e.target.value)}
                  />
                  <label htmlFor="4">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value="3"
                    id="3"
                    onClick={(e) => setStar(e.target.value)}
                  />
                  <label className="text-[black]" htmlFor="3">
                    ☆
                  </label>
                  <input
                    type="radio"
                    name="rating"
                    value="2"
                    id="2"
                    onClick={(e) => setStar(e.target.value)}
                  />
                  <label htmlFor="2">☆</label>
                  <input
                    type="radio"
                    name="rating"
                    value="1"
                    id="1"
                    onChange={(e) => setStar(e.target.value)}
                  />
                  <label htmlFor="1">☆</label>
                </div>{" "}
                <span className="inline text-xs underline">200 Reviews</span>
              </div>
              <div className="mt-5">
                <h4>Color</h4>
                <div className="flex gap-5">
                  <div className="bg-[red] h-[20px] w-[20px] rounded-full "></div>
                  <div className="bg-[green] h-[20px] w-[20px] rounded-full "></div>
                  <div className="bg-[blue] h-[20px] w-[20px] rounded-full "></div>
                </div>
              </div>
            </div>
            <div className=" my-5 flex w-full text-sm">
              <button
                className="bg-[black] text-[white] px-4 py-1 mr-2"
                onClick={() => {
                  addToCartNow({
                    ...data,
                    id: productId,
                  });
                }}
              >
                Add to cart
              </button>
              <button
                className="bg-[white] text-[black] px-4 py-1  border-[1px] mr-2 border-[black]"
                onClick={() =>
                  addToFavourite({
                    ...data,
                    id: productId,
                  })
                }
              >
                Add to wishlist
              </button>
              {/* <button
                className="bg-[red] px-4 py-1 rounded-[8px]"
                onClick={() => {
                  removeFromCartNow({
                    id: productId,
                  });
                }}
              >
                Remove from cart
              </button> */}
            </div>
            <div className="">
              {/* <button
                className="bg-[blue] px-4 py-1 rounded-[8px] mr-2"
                onClick={() =>
                  addToFavourite({
                    ...data,
                    id: productId,
                  })
                }
              >
                Add to wishlist
              </button> */}
              {/* <button
                className="bg-[red] px-4 py-1 rounded-[8px]"
                onClick={() =>
                  removeFromFavourited({
                    id: productId,
                  })
                }
              >
                De-favourite
              </button> */}
            </div>
            <div className={`pl-[50px] text-sm relative`}>
              <BsTruck
                size={20}
                className=" text-[red] absolute my-auto  top-1  left-0"
              />
              <h3 className=" ">To delivered between</h3>
              <h4>July 10th - July 17th</h4>
            </div>
            <div className="h-[0.5px] ml-[50px] w-[70%] bg-[#423e3e4d] my-3"></div>
            <div className="pl-[50px] relative text-sm  ">
              <FcHome
                size={20}
                className=" text-[#4e245f] absolute top-0 my-auto bottom-0  left-0"
              />
              <div className="flex justify-between">
                <span> Home delivery --N1,500</span>
                <RiArrowRightSLine size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailsPage;
