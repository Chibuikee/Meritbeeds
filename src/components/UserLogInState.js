import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/slices/authSlice";

function useIsUserLoggedIn() {
  // selectIsLoggedIn is a function for getting the login state of the user which is either true or false
  const state = useSelector(selectIsLoggedIn);
  if (state) return state;
  return null;
}

export default useIsUserLoggedIn;
