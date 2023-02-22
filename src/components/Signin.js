import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  // GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";

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
        navigate("/Adminpage");
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
        // console.log(user.email);
        toast(`${user.email}`);
        navigate("/Adminpage");
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
    <>
      <form onSubmit={handleSubmit}>
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
      </form>
    </>
  );
};

export default Signin;
