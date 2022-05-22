import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userUsername: "",
  userAuthToken: "",
  isUserAuthTokenExist: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(_, action) {
      return action.payload;
    },
  },
});

export const { reducer } = userSlice;
export const { setUserState } = userSlice.actions;
