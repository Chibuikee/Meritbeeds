import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { useUpLoadfile } from "../firebase/storage";
import {
  useFetchProductQuery,
  useUpdateMeritStoreProductMutation,
} from "../redux/features/slices/StoreData";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const InitiaState = {
  productTitle: "",
  shortDescription: "",
  description: "",
  price: "",
  imageUrl: "",
  imageUrl1: "",
  imageUrl2: "",
  category: "",
};
function Editproduct() {
  const [formData, setFormData] = useState(() => InitiaState);
  const [file, setFile] = useState(null);
  const [Progess, setProgess] = useState(0);
  const imageInputElement = useRef();
  const { productEditId } = useParams();
  const navigate = useNavigate();
  //   console.log(productEditId);
  //   the hook is used to upload pictures to firestore database
  const upLoadfile = useUpLoadfile(setFormData, setProgess, file);
  //this hook from rtk query is used to update to the firestore database
  const { data: product } = useFetchProductQuery(
    productEditId ? productEditId : skipToken
  );
  const [updateMeritStoreProduct] = useUpdateMeritStoreProductMutation();
  useEffect(() => {
    // check for file in the state before calling the upload function to upload image to firebase storage
    file && file[Object.keys(file)[0]]?.name && upLoadfile();
  }, [file]);

  useEffect(() => {
    // check for product and product id in the state before calling the update function to update firebase database
    if (productEditId && product) {
      setFormData({ ...product });
    }
  }, [productEditId, product]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleImageChange(e) {
    const { name, files } = e.target;
    setFile({ [name]: files[0], namecode: name });
    // console.log(file.namecode);
    // console.log(file[Object.keys(file)[0]].name);
    // console.log(file[Object.keys(file)[0]]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.imageUrl ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !formData.productTitle ||
      !formData.shortDescription
    ) {
      toast("Please upload your picture and fill all the fields", {
        type: "error",
      });
      return;
    }
    // console.log(formData);
    await updateMeritStoreProduct({ productEditId, formData });
    toast.success("Merit this product has been updated, congrats");
    setFormData(InitiaState);
    setFile(null);
    imageInputElement.current.value = "";
    setProgess(0);
    navigate("/Adminpage");
  }

  return (
    <section>
      <div className="text-[white] text-[1.5rem] w-[100%] ">
        <h4 className="px-[28px]  text-sm">Home/Dashboard</h4>
        <h1 className="text-xl mmd:text-3xl font-semibold px-[28px] ">
          Dashboard
        </h1>
      </div>
      <div className="px-[10px] s:px-[initial] w-[90%]  mx-auto  sm:w-[540px] md:w-[720px] lg:max-w-[1280px] xl:max-w-[1536px">
        <div className="flex">
          <input placeholder="Search" />
          <FiSearch />
        </div>

        <div className=" m:w-[400px] mx-auto md:mx-[initial] my-10">
          <h1 className="text-[1.3rem] text-[red] font-semibold">
            Add Product
          </h1>
          <form className="" id="Uploadform">
            <input
              className="my-2 w-full rounded block border-solid border border-[red]"
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputElement}
            />
            <input
              className="my-2 w-full rounded block border-solid border border-[red]"
              type="file"
              name="imageUrl1"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputElement}
            />
            <input
              className="my-2 w-full rounded block border-solid border border-[red]"
              type="file"
              name="imageUrl2"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputElement}
            />
            <input
              className="my-2 w-full rounded block border-solid border border-[red]"
              type="text"
              name="productTitle"
              placeholder="Enter Name"
              value={formData?.productTitle}
              onChange={handleChange}
            />
            <input
              className="my-2 rounded block border-solid border border-[red]"
              type="text"
              placeholder="Give it a short description"
              name="shortDescription"
              onChange={handleChange}
              value={formData?.shortDescription}
            />
            <textarea
              className="my-2 w-full rounded block border-solid border border-[red]"
              //   type="text"
              placeholder="Give it a detailed description"
              name="description"
              onChange={handleChange}
              value={formData?.description}
            />
            <input
              className="my-2 rounded block border-solid border border-[red]"
              type="number"
              placeholder="price"
              name="price"
              onChange={handleChange}
              value={formData?.price}
            />

            <label htmlFor="items">Choose a bag category:</label>
            <select
              onChange={handleChange}
              value={formData?.category}
              name="category"
              id="items"
              form="Uploadform"
            >
              <option value="Purple bags"> Purple bags</option>
              <option value="Red bags">Red bags</option>
              <option value="Blue bags">Blue bags</option>
              <option value="Green bags">Green bags</option>
            </select>
            <button
              className="bg-[grey] text-white w-full s:w-[initial] mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
          <span className={`${Progess === 0 ? "hidden" : "inline"} `}>
            {Progess === 0 ? 0 : Progess}
          </span>
          <div className="h-[2] w-[10] bg-[red]">helllo</div>
        </div>
        <div>
          <h6 className="text-sm text-[grey] max-w-[400px]">
            Keep up to date with our latest articles and uploads. Proin eget
            tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh
            pulvinar a.
          </h6>
        </div>
      </div>
    </section>
  );
}

export default Editproduct;
