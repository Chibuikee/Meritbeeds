import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
function PasswordReset() {
  const [passwordReset, setpasswordReset] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    sendPasswordResetEmail(auth, passwordReset)
      .then(() => {
        // Password reset email sent!
        // ..
        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        // const errorMessage = error.message;
        toast.error("Email not found");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setpasswordReset(e.target.value)}
        />
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
}

export default PasswordReset;
