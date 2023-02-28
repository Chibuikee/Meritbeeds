import { useSelector } from "react-redux";

export function useIsUserid() {
  // selectIsLoggedIn is a function for getting the user id
  const user = useSelector((state) => state?.rootReducer.authReducer);

  if (user) return user;
  return null;
}
