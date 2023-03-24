import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, provider } from "../firebase/config";
import { UseCreateNewUser } from "../firebase/auth";
import PasswordReset from "./Reset";
import { Link, Navigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useAddToUsersMutation } from "../redux/features/slices/userSlice";
const Registration = () => {
  const [addToUsers] = useAddToUsersMutation();

  const InitiaState = {
    // createdAt: Timestamp.now().toDate(),
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const [formValue, setFormData] = useState(InitiaState);
  const createNewUser = UseCreateNewUser();
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    if (formValue.password2 !== formValue.password)
      return toast.error("password does not match");
    createNewUser(auth, formValue.email, formValue.password, formValue.name);
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  //   google authuentication
  function handleGoogleSignup() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { email, uid, photoURL, phoneNumber, displayName } = result.user;
        // console.log(result.user);
        addToUsers({
          fname: displayName.substring(0, displayName.indexOf(" ")),
          lname: displayName.substring(displayName.lastIndexOf(" ") + 1),
          email: email,
          userId: uid,
          photoURL: photoURL,
          phoneNumber: phoneNumber,
        });
        toast("Sign up succesful");
        Navigate("/Signin");
      })
      .catch((error) => {
        // Handle Errors here.

        const errorMessage = error.message;
        toast.error(`Sign up unsuccessful`);
        // The email of the user's account used.
        // const email = error.customData.email;
      });
  }
  return (
    <section className="s:ml-[200px]">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5 p-1">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              placeholder="First and last name"
            />
          </div>
          <div className="flex gap-5 p-1">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formValue.email}
              placeholder="Input a valid Email"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-5 p-1">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              placeholder="pick a password"
            />
          </div>
          <div className="flex gap-5 p-1">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="password2"
              value={formValue.password2}
              onChange={handleChange}
              placeholder="confirm password"
            />
          </div>
          <button className="bg-[purple] px-2 py-1" type="submit">
            Sign up
          </button>
          <Link to="/Signin">
            <button className="bg-[green] px-2 py-1">Login</button>
          </Link>
        </form>
        <PasswordReset />
        <button
          className="rounded px-4 py-2 bg-[green]"
          onClick={handleGoogleSignup}
        >
          Sign up with google
        </button>
      </div>
    </section>
  );
};

export default Registration;
