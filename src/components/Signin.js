import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const InitiaState = {
    // createdAt: Timestamp.now().toDate(),
    email: "",
    password: "",
  };
  const [formValue, setFormData] = useState(InitiaState);

  const navigate = useNavigate();
  //   google authuentication
  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;

        toast("Sign in succesful");
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.

        const errorMessage = error.message;
        toast.error(`Sign in unsuccessful ${errorMessage}`);
        // The email of the user's account used.
        // const email = error.customData.email;
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    signInWithEmailAndPassword(auth, formValue.email, formValue.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        toast(`${user.email}`);
        navigate("/");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <section className="md:ml-[200px]">
      <div className="flex flex-col items-center h-full pt-6 sm:justify-center sm:pt-0 ">
        <div>
          <Link href="/">
            <h3 className="text-4xl font-bold text-red-600">Logo</h3>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit}>
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

            {/* <a href="#" className="text-xs text-purple-600 hover:underline">
      Forget Password?
    </a> */}
            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-red-600"
              >
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              onClick={handleGoogleSignIn}
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

export default Signin;

{
  /* <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formValue.email}
            placeholder="Input a valid Email"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="pick a password"
          />
        </label>
        <br />
        <div className="flex gap-10">
          <button className="rounded px-4 py-2 bg-[blue]" type="submit">
            Sign In
          </button>
          <button
            className="rounded px-4 py-2 bg-[green]"
            onClick={handleGoogleSignIn}
          >
            Sign In with google
          </button>
        </div>
      </form>  */
}
