// import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

import { Link, useLocation } from "react-router-dom";
import useLogOut, { useRealtimeUserDetails } from "../../firebase/auth";
// import { auth } from "../../firebase/config";
import {
  userIsLoggedIn,
  userIsLoggedOut,
} from "../../redux/features/slices/authSlice";

function Navbar() {
  const [userlogInState, setUserlogInState] = useState(null);
  const idContainer = useRealtimeUserDetails();
  const [navBarToggle, setNavBarToggle] = useState(null);

  // console.log(idContainer, "from nav bar now testing");
  const logUserOut = useLogOut();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (idContainer) {
      console.log("user update useeffect ran");
      setUserlogInState(idContainer);
      dispatch(
        userIsLoggedIn({
          isLoggedIn: true,
          email: idContainer.email,
          userName: idContainer.displayName,
          userID: idContainer.uid,
        })
      );
    } else {
      //     // User is signed out
      dispatch(userIsLoggedOut());
      setUserlogInState(null);
    }

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setUserlogInState(user);
    //     dispatch(
    //       userIsLoggedIn({
    //         isLoggedIn: true,
    //         email: user.email,
    //         userName: user.displayName,
    //         userID: user.uid,
    //       })
    //     );
    //   } else {
    //     // User is signed out
    //     // dispatch(userIsLoggedOut());
    //     // setUserlogInState("");
    //   }
    // });
  }, [idContainer]);

  return (
    // The navbar is hidden while working on the order page unhide to see

    <div className="">
      {location?.pathname.substring(1, 8) !== "Details" ? (
        <div
          className="z-[999] relative mt-11 ml-5"
          onClick={() => setNavBarToggle(!navBarToggle)}
        >
          <FaBars size={25} className="navdrop-1" />
        </div>
      ) : null}
      <nav
        className={`${
          // remove the nav bar when it is in details page
          location?.pathname.substring(1, 8) === "Details"
            ? "hidden"
            : navBarToggle
            ? "block"
            : "hidden s:block"
        } top-0 z-[999] fixed px-6  w-[170px] h-[100vh] bg-[#bb2e2e] py-[2rem] left-0`}
      >
        <div className="  flex  justify-between items-center mx-auto ">
          <div className=" flex flex-col gap-5 mt-4">
            <div className="mb-6 right-0 xxxs:right-5 top-[33px] flex ">
              <input type="checkbox" id="check" className="hidden" />
              <label
                htmlFor="check"
                className="navdrop-ctn  block md:hidden"
                onClick={() => setNavBarToggle(!navBarToggle)}
              >
                {navBarToggle ? (
                  <RiCloseFill size={25} className="navdrop-2" />
                ) : null}
              </label>
              <Link to="/">
                <span className=" text-xl font-semibold whitespace-nowrap ">
                  Meritbeeds
                </span>
              </Link>
            </div>

            <Link to="/Adminpage">
              <span>Dashboard</span>
            </Link>
            <Link to="/Cart">
              <span>CART</span>
            </Link>
            <Link to="/Orders">
              <span>Orders</span>
            </Link>
            <Link to="/Users">
              <span>Users</span>
            </Link>
            <Link to="/Testtingfunctionpage">
              <span>Testing page</span>
            </Link>
            <h2>
              User: <span>{userlogInState && userlogInState?.displayName}</span>
            </h2>
            {!userlogInState?.displayName && (
              <Link to="/Registration">
                <button className=" px-4 py-1 rounded bg-blue-600">
                  Sign Up
                </button>
              </Link>
            )}
            {userlogInState ? (
              <button
                className="px-4 py-1  rounded bg-red-600"
                onClick={logUserOut}
              >
                Log out
              </button>
            ) : (
              <Link to="/Signin">
                <button className="px-4 py-1 rounded bg-green-600">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
