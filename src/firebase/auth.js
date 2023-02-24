import {
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./config";

export function updateUserProfile(user) {
  // import updateProfile from firebase auth
  updateProfile(auth.currentUser, {
    displayName: user,
  })
    .then(() => {
      // used toastify package to display message
      toast.success("Profile updated!");
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
      toast.error("Profile name not updated");
    });
}

// get a real time user details
export function useRealtimeUserDetails() {
  console.log("getting user authentication");
  const [idContainer, setIdContainer] = useState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIdContainer(user);
    }
  });
  return idContainer;
}

export function UseCreateNewUser() {
  // put this in a hook because usenavigate can only be called in a hook or react function
  const navigate = useNavigate();
  function CreateNewUser(auth, email, password, username) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateUserProfile(username); // Signed in
        const user = userCredential.user;
        // ...
        toast(user);
        toast("Sign up successful");
        navigate("/Signin");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }
  return CreateNewUser;
}
// export function CollectUserProfile() {
//   const user = auth.currentUser;
//   console.log(user);
//   if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     // const displayName = user.displayName;
//     // // const email = user.email;
//     // // const photoURL = user.photoURL;
//     // // const emailVerified = user.emailVerified;
//     // toast(displayName);
//     return user;
//   }
// }

export default function useLogOut() {
  const navigate = useNavigate();
  function logOutUser() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast("Sign-out successful");
        navigate("/Signin");
      })
      .catch((error) => {
        // An error happened.
        toast("Sign-out Failed");
      });
  }
  return logOutUser;
}
