import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";
import { useUpLoadfile } from "../firebase/storage";
import { useAddToMeritStoreMutation } from "../redux/features/slices/StoreData";

const InitiaState = {
  productTitle: "",
  shortDescription: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
};
function ItemsUpload() {
  const [formData, setFormData] = useState(() => InitiaState);
  const [file, setFile] = useState(null);
  const [Progress, setProgress] = useState(0);
  const imageInputElement = useRef();
  //   the hook is used to upload pictures to firestore database
  const upLoadfile = useUpLoadfile(setFormData, setProgress, file);
  //this hook from rtk query is used to write to the firestore database
  const [addToMeritStore] = useAddToMeritStoreMutation();

  useEffect(() => {
    // check for file in the state before calling the upload function to upload image to firebase storage
    file && file[Object.keys(file)[0]]?.name && upLoadfile();
  }, [file]);

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
  function handleSubmit(e) {
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
    addToMeritStore(formData);
    toast.success("Merit this product has been added, congrats");
    setFormData(InitiaState);
    setFile(null);
    imageInputElement.current.value = "";
    setProgress(0);
  }

  //   add an array of data to  the database
  //   To be used for uploading data to database
  //   const addToDb = collection(db, "shoeDb");

  //   async function uploadDatabase() {
  //     try {
  //       ShoeDB.forEach((item) => {
  //         addDoc(addToDb, item);
  //       });
  //       console.log("This Database is updated, congrats");
  //     } catch (error) {
  //       console.error("Error creating DATABASE: ", error);
  //     }
  //   }
  // function handleSubmitnow(e) {
  //   e.preventDefault();

  //   console.log(formData);
  // }
  return (
    <section>
      <div className="text-[white] text-[1.5rem] w-[100%] ">
        <h4 className="px-[28px]  text-sm">Home/Dashboard</h4>
        <h1 className="text-xl mmd:text-3xl font-semibold px-[28px] ">
          Dashboard
        </h1>
      </div>
      <div className="px-[10px] s:px-[initial] w-[90%] ">
        <div className="flex">
          <input placeholder="Search" />
          <FiSearch />
        </div>

        {/* <h1
            onClick={uploadDatabase}
            className="bg-[grey] text-white w-full s:w-[initial] mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            UPLOAD ALL THE DATABASE
          </h1> */}

        <div className=" m:w-[400px] mx-auto md:mx-[initial] my-10">
          <h1 className="text-[1.3rem] text-[red] font-semibold">
            Add Product
          </h1>
          <form className="" id="Uploadform">
            <input
              className="block w-full my-2 flex-1 text-sm text-gray-900 border border-gray-300 rounded-r-lg cursor-pointer p-2.5 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputElement}
            />
            <input
              className="block w-full my-2 flex-1 text-sm text-gray-900 border border-gray-300 rounded-r-lg cursor-pointer p-2.5 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              name="imageUrl1"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputElement}
            />
            <input
              className="block w-full my-2 flex-1 text-sm text-gray-900 border border-gray-300 rounded-r-lg cursor-pointer p-2.5 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              name="imageUrl2"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputElement}
            />
            <input
              className="rounded-none my-2 rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="productTitle"
              placeholder="Enter Name"
              value={formData?.productTitle}
              onChange={handleChange}
            />
            <input
              className="rounded-none my-2 rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Give it a short description"
              name="shortDescription"
              onChange={handleChange}
              value={formData?.shortDescription}
            />
            <textarea
              className="rounded-none my-2 rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              //   type="text"
              placeholder="Give it a detailed description"
              name="description"
              onChange={handleChange}
              value={formData?.description}
            />
            <input
              className="rounded-none my-2 rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0  text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              placeholder="price"
              name="price"
              onChange={handleChange}
              value={formData?.price}
            />

            <label
              htmlFor="items"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Choose a bag category:
            </label>
            <select
              onChange={handleChange}
              value={formData?.category}
              name="category"
              id="items"
              form="Uploadform"
              className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Purple bags"> Purple bags</option>
              <option value="Red bags">Red bags</option>
              <option value="Blue bags">Blue bags</option>
              <option value="Green bags">Green bags</option>
            </select>
            <button
              className="bg-[grey] text-white w-full s:w-[200px] mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>

          <div
            className="h-[2px] bg-[red]"
            style={{ width: ` ${Progress && Progress + "%"}` }}
          ></div>
          <span className={`${Progress === 0 ? "hidden" : "inline"}`}>
            {Progress === 0 ? 0 : Progress}
          </span>
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

export default ItemsUpload;
