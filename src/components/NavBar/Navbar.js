import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useLogOut from "../../firebase/auth";
import { auth } from "../../firebase/config";
import {
  userIsLoggedIn,
  userIsLoggedOut,
} from "../../redux/features/slices/authSlice";
import useIsUserLoggedIn from "../UserLogInState";
// import { collectUserState } from "../../firebase/auth";
// import { FaBars } from "react-icons/fa";
// import { RiArrowDropDownLine, RiCloseFill } from "react-icons/ri";
// import { NavMenuList, NavMenuUtilityList } from "./NavData";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

function Navbar() {
  const [userlogInState, setUserlogInState] = useState("");
  const LogInState = useIsUserLoggedIn();
  // const LogInState = useSelector((state) => state.);
  // function to log user out from firebase

  const logUserOut = useLogOut();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserlogInState(user.displayName);
        dispatch(
          userIsLoggedIn({
            isLoggedIn: true,
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
      } else {
        // User is signed out
        dispatch(userIsLoggedOut());
        setUserlogInState("");
      }
    });
  }, []);
  return (
    <nav className="sticky top-0 z-[999] w-full bg-white py-[2rem]">
      <div className=" sm:w-[540px] md:w-[720px] px-3 lg:max-w-[1280px] xl:max-w-[1536px] flex flex-wrap justify-between items-center mx-auto ">
        <div className=" flex gap-5 items-center">
          <span className=" text-xl font-semibold whitespace-nowrap ">
            Meritbeeds
          </span>
          <h2>
            User: <span>{userlogInState && userlogInState}</span>
          </h2>

          {LogInState ? (
            <button
              className="px-4 py-1 rounded bg-blue-600"
              onClick={logUserOut}
            >
              Log out
            </button>
          ) : null}
        </div>
        {/* <div className="menu-main-ctn lg:basis-[70%] relative">
          <input type="checkbox" id="check" className="hidden" />
          <label
            htmlFor="check"
            className="navdrop-ctn"
            onClick={() => setNavBarToggle(!navBarToggle)}
          >
            {navBarToggle ? (
              <FaBars className="navdrop-2" />
            ) : (
              <RiCloseFill className="navdrop-2" />
            )}
          </label>

          {
            <div className="menu-main ">
              <ul className="menu-sub-1-ctn basis-[70%]">
                {NavMenuList.map(({ title, childList }, index) => (
                  <li key={index} className="menu-item-ctn relative">
                    <span className="menu-item-heading ">
                      {title.name}
                      {childList.length !== 0 && (
                        <RiArrowDropDownLine className="DropDown" />
                      )}
                    </span>

                    {childList.length !== 0 && (
                      <ul className="menu-item-children-ctn absolute">
                        {childList.map(({ url, name }, index) => (
                          <li
                            className="menu-item-child"
                            // onClick={
                            //   title.name == "PRODUCT"
                            //     ? () => handleNavigation(name)
                            //     : () => {}
                            // }
                            key={index}
                          >
                            <span className="capitalize">{name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <div className="menu-sub-2-ctn basis-[18%]">
                {NavMenuUtilityList.map((item, index) => (
                  <span>
                    <item.icon size={18} />
                  </span>
                ))}
              </div>
            </div>
          }
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
