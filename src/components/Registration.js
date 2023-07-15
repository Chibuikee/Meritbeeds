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
      <div className="flex flex-col items-center h-full pt-6 sm:justify-center sm:pt-0 ">
        <div>
          <Link href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Full Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  value={formValue.name}
                  onChange={handleChange}
                  placeholder="First and last name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={formValue.email}
                  placeholder="Input a valid Email"
                  onChange={handleChange}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={formValue.password}
                  onChange={handleChange}
                  placeholder="pick a password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password2"
                  value={formValue.password2}
                  onChange={handleChange}
                  placeholder="confirm password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            {/* <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a> */}
            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link
                to="/Signin"
                className="text-purple-600 hover:underline"
                href="#"
              >
                Log in
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              onClick={handleGoogleSignup}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <p>Login with Google</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;

{
  /* <div>
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
</div> */
}
