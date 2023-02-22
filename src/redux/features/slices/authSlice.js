import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,
};

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userIsLoggedIn: (state, action) => {
      const { email, userName, userID } = action.payload;
      return {
        isLoggedIn: true,
        email,
        userName,
        userID,
      };
    },
    userIsLoggedOut: () => {
      return initialState;
    },
  },
});
// state selection functions
export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectEmail = (state) => state.userAuth.email;
export const selectUserName = (state) => state.userAuth.userName;
export const selectUserID = (state) => state.userAuth.userID;

export const { userIsLoggedIn, userIsLoggedOut } = authSlice.actions;
export default authSlice.reducer;
