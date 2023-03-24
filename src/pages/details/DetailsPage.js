import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsPerson, BsCart3, BsSearch, BsTruck } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { FcHome } from "react-icons/fc";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useFetchProductQuery } from "../../redux/features/slices/StoreData";
import { useFavouriteHook } from "../../customHooks/favouritedHooks";
import { useCartHook } from "../../customHooks/cartHook";

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
  if (isLoading) {
    return <h1>It`s loading, Please wait!</h1>;
  }
  return (
    <section className="md:px-5 pb-10">
      <div className="flex justify-between px-10 items-center flex-wrap sticky top-0 bg-[white] pt-10">
        <div className="">
          <Link to="/">
            <h1 className="font-bold"> MERITBEEDS</h1>
          </Link>
        </div>
        <div className="flex order-3 s:order-2 mt-5 border border-solid px-5 py-2 rounded-[30px] items-center">
          <input type="text" placeholder="Search" />
          <BsSearch />
        </div>
        <div className="flex gap-5 s:order-3 ">
          <BsPerson />
          <MdFavoriteBorder />
          <Link to="/Cart">
            <BsCart3 />
          </Link>
        </div>
      </div>
      {data && (
        <div className="w-full md:flex flex-row-reverse justify-between px-5">
          <div className="basis-[60%]">
            {pickedBag ? (
              <div className="poster">
                <img
                  className="w-full h-[250px]"
                  src={pickedBag}
                  alt="product"
                />
              </div>
            ) : (
              <div className="poster">
                <img
                  className="w-full h-[250px]"
                  src={data.imageUrl}
                  alt="product"
                />
              </div>
            )}
            <div className="flex gap-5 ">
              <div className="poster">
                <img
                  className="w-[50px] h-[50px]"
                  src={data.imageUrl}
                  alt="product"
                  onClick={() => setPickedBag(data.imageUrl)}
                />
              </div>
              <div className="poster">
                {data.imageUrl1 && (
                  <img
                    className="w-[50px] h-[50px]"
                    src={data.imageUrl1}
                    alt="product"
                    onClick={() => setPickedBag(data.imageUrl1)}
                  />
                )}
              </div>
              <div className="poster">
                {data.imageUrl2 && (
                  <img
                    className="w-[50px] h-[50px]"
                    src={data.imageUrl2}
                    alt="product"
                    onClick={() => setPickedBag(data.imageUrl2)}
                  />
                )}
              </div>
            </div>
          </div>
          {/* <h1 className=" bg-[purple]">DETAILS</h1> */}

          <div className="basis-[45%] px-5">
            <div className="details">
              <div className="flex items-center gap-10">
                <h3 className="text-[20px] font-semibold md:text-[36px]">
                  {data.productTitle}
                </h3>
                <MdFavoriteBorder size={40} className="pt-3 text-[red]" />
              </div>
              <h3>{data.category}</h3>
              <h3 className="text-xs text-[purple]">{data.description}</h3>
              <h3>
                Release Date:
                <span className="ml-5">
                  {data.createdAt.toDate().toLocaleString()}
                </span>
              </h3>
              <h3>N {data.price}</h3>
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
                  <label htmlFor="3">☆</label>
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
                <span className="inline">200 Reviews</span>
              </div>
              <div>
                <h4>Color</h4>
                <div className="flex gap-5">
                  <div className="bg-[red] h-[20px] w-[20px] rounded-full "></div>
                  <div className="bg-[green] h-[20px] w-[20px] rounded-full "></div>
                  <div className="bg-[blue] h-[20px] w-[20px] rounded-full "></div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="bg-[blue] px-4 py-2 rounded-[8px]"
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
                className="bg-[red] px-4 py-2 rounded-[8px]"
                onClick={() => {
                  removeFromCartNow({
                    id: productId,
                  });
                }}
              >
                Remove from cart
              </button>
            </div>
            <div className="flex gap-10">
              <button
                className="bg-[blue] px-4 py-2 rounded-[8px]"
                onClick={() =>
                  addToFavourite({
                    ...data,
                    id: productId,
                  })
                }
              >
                favourite
              </button>
              <button
                className="bg-[red] px-4 py-2 rounded-[8px]"
                onClick={() =>
                  removeFromFavourited({
                    id: productId,
                  })
                }
              >
                De-favourite
              </button>
            </div>
            <div className={`pl-[50px] relative`}>
              <BsTruck
                size={40}
                className=" text-[red] absolute top-0  left-0"
              />
              <h3 className=" ">To delivered between</h3>
              <h4>July 10th - July 17th</h4>
            </div>
            <div className="pl-[50px] relative ">
              <FcHome
                size={40}
                className=" text-[#4e245f] absolute top-0  left-0"
              />
              <h3 className=" ">
                Home delivery <span>--N1,500</span>
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailsPage;
