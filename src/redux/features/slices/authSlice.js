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
    userIsLoggedOut: (state, action) => {
      return initialState;
    },
  },
});
// state selection functions
export const selectIsLoggedIn = (state) => state.authReducer.isLoggedIn;
export const selectEmail = (state) => state.authReducer.email;
export const selectUserName = (state) => state.authReducer.userName;
export const selectUserID = (state) => state.authReducer.userID;

export const { userIsLoggedIn, userIsLoggedOut } = authSlice.actions;
export default authSlice.reducer;
