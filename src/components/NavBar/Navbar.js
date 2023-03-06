// import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
    <nav
      className={`${
        // remove the nav bar when it is in details page
        location?.pathname.substring(1, 8) === ("Details" || "")
          ? "hidden"
          : "fixed"
      } top-0 z-[999] w-[150px] h-[100vh] bg-white py-[2rem] left-0`}
    >
      <div className=" sm:w-[540px] flex  justify-between items-center mx-auto ">
        <div className=" flex flex-col gap-5 items-center ">
          <Link to="/">
            <span className=" text-xl font-semibold whitespace-nowrap ">
              Meritbeeds
            </span>
          </Link>
          <Link to="/Adminpage">
            <span>Admin Dashboard</span>
          </Link>
          <Link to="/Cart">
            <span>CART</span>
          </Link>
          <Link to="/Testtingfunctionpage">
            <span>Testing page</span>
          </Link>
          <h2>
            User: <span>{userlogInState && userlogInState?.displayName}</span>
          </h2>

          {userlogInState ? (
            <button
              className="px-4 py-1 rounded bg-red-600"
              onClick={logUserOut}
            >
              Log out
            </button>
          ) : (
            <Link to="/Signin">
              <button className="px-4 py-1 rounded bg-blue-600">Sign in</button>
            </Link>
          )}
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
