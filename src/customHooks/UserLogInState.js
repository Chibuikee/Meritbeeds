import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUserID,
} from "../redux/features/slices/authSlice";

export function useIsUserLoggedIn() {
  // selectIsLoggedIn is a function for getting the login state of the user which is either true or false
  const state = useSelector(selectIsLoggedIn);
  if (state) return state;
  return null;
}

export function useIsUserid() {
  // selectIsLoggedIn is a function for getting the user id
  const state = useSelector(selectUserID);
  if (state) return state;
  return null;
}
