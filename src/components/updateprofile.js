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

function Updateprofile() {
  const user = useSelector((state) => state?.rootReducer.authReducer.userID);
  const imageInputElement = useRef();
  const { data, isLoading } = useFetchUserQuery(user ?? skipToken);
  const [updateUsers] = useUpdateUsersMutation();
  //   console.log(data);
  //   const InitiaState = {
  //     displayName: "",
  //     photoURL: "",
  //     phoneNumber: "",
  //   };
  const [formData, setFormData] = useState(null);
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
  if (isLoading) return <h1>Please wait data is being fetched</h1>;
  return (
    <div>
      {formData && (
        <form onSubmit={updateUserProfile}>
          <div className="flex gap-5 p-1">
            <label>Full Name:</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="First and last name"
            />
          </div>
          <div className="p-1">
            <label>Display pic:</label>
            <input
              className="my-2 w-full rounded block border-solid border border-[red]"
              type="file"
              name="photoURL"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputElement}
            />
          </div>
          <div className="flex gap-5 p-1">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber ?? "Input your Number"}
              onChange={handleChange}
              placeholder="Input your Number"
            />
          </div>

          <button className="bg-[purple] px-2 py-1" type="submit">
            Update
          </button>

          <button className="bg-[green] px-2  py-1">{Progress}</button>
        </form>
      )}
    </div>
  );
}

export default Updateprofile;
