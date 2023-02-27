import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogOut from "../../firebase/auth";
import { auth } from "../../firebase/config";
import { userIsLoggedIn } from "../../redux/features/slices/authSlice";

function Navbar() {
  const [userlogInState, setUserlogInState] = useState(null);

  // const rootReducer = useSelector((state) => state?.rootReducer);
  // const user = rootReducer?.authReducer;
  // function to log user out from firebase
  console.log(`the user info ${userlogInState?.userID}`);

  const logUserOut = useLogOut();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserlogInState(user);
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
        // dispatch(userIsLoggedOut());
        // setUserlogInState("");
      }
    });
  }, []);

  return (
    <nav className="sticky top-0 z-[999] w-full bg-white py-[2rem]">
      <div className=" sm:w-[540px] md:w-[720px] px-3 lg:max-w-[1280px] xl:max-w-[1536px] flex flex-wrap justify-between items-center mx-auto ">
        <div className=" flex gap-5 items-center">
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
          <h2>
            User: <span>{userlogInState && userlogInState?.displayName}</span>
          </h2>

          {userlogInState ? (
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
