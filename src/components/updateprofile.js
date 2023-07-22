import { skipToken } from "@reduxjs/toolkit/dist/query";
import { updateProfile } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { useUpLoadfile } from "../firebase/storage";
import {
  useFetchUserQuery,
  useUpdateUsersMutation,
} from "../redux/features/slices/userSlice";
// import { useFetchUsersQuery } from "../redux/features/slices/userSlice";
import { BsTelephone } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner";

function Updateprofile() {
  const user = useSelector((state) => state?.rootReducer.authReducer.userID);
  const imageInputElement = useRef();
  const { data, isLoading } = useFetchUserQuery(user ?? skipToken);
  const [updateUsers] = useUpdateUsersMutation();
  //   console.log(data);
  const InitiaState = {
    displayName: "",
    photoURL: "",
    phoneNumber: "",
  };
  const [formData, setFormData] = useState(InitiaState);
  const [file, setFile] = useState(null);
  const [Progress, setProgress] = useState(0);
  const upLoadfile = useUpLoadfile(setFormData, setProgress, file);
  useEffect(() => {
    // check for file in the state before calling the upload function to upload image to firebase storage
    file && file[Object.keys(file)[0]]?.name && upLoadfile();
  }, [file]);
  useEffect(() => {
    data &&
      setFormData({
        displayName: data?.fname.concat(` ${data?.lname}`),
        photoURL: data?.photoURL,
        phoneNumber: data?.phoneNumber,
      });
  }, [data]);

  function updateUserProfile(e) {
    e.preventDefault();
    // console.log(formData);
    // ensures all fields are filled frist
    if (!formData.displayName || !formData.photoURL || !formData.phoneNumber) {
      toast("Please upload your picture and fill all the fields", {
        type: "error",
      });
      return;
    }
    // import updateProfile from firebase auth

    updateProfile(auth.currentUser, formData)
      .then((updatedUser) => {
        // used toastify package to display message
        toast.success("Profile updated!");
      })
      .catch((error) => {
        // An error occurred
        // ...
        toast.error("Profile name not updated");
      });
    updateUsers({
      userId: data.userId,
      formData: {
        ...data,
        fname: formData.displayName.substring(
          0,
          formData.displayName.indexOf(" ")
        ),
        lname: formData.displayName.substring(
          formData.displayName.lastIndexOf(" ") + 1
        ),
        phoneNumber: formData.phoneNumber,
        photoURL: formData.photoURL,
      },
    });
    toast.success("Your Profile updated, congrats");
    // setFormData(InitiaState);
    setFile(null);
    imageInputElement.current.value = "";
    setProgress(0);
  }
  function handleImageChange(e) {
    const { name, files } = e.target;
    setFile({ [name]: files[0], namecode: name });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="s:ml-[200px] flex flex-col items-center h-full pt-6 sm:justify-center sm:pt-0 ">
      {formData && (
        <form
          className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg"
          onSubmit={updateUserProfile}
        >
          <label
            for="website-user"
            className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Francisca Green"
              id="website-user"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <label
            className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="user_avatar"
          >
            Upload Photo
          </label>
          <input
            name="photoURL"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputElement}
            className="block w-full flex-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer p-2.5 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>

          <label
            for="website-phone"
            class="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <BsTelephone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </span>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber ?? "Input your Number"}
              onChange={handleChange}
              placeholder="Input your Number"
              id="website-phone"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            disabled={Progress !== "100" ? true : false}
            type="submit"
            className={`mt-4 text-white bg-blue-700 hover:bg-blue-800 ${
              Progress !== "100" ? "cursor-not-allowed" : ""
            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Update <span className=" px-1  py-1">{Progress}</span>
          </button>
          {/* <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div
              className={`bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 w-[${Progress}%]`}
            ></div>
          </div> */}
        </form>
      )}
    </div>
  );
}

export default Updateprofile;
