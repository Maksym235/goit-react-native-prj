import { createSlice } from "@reduxjs/toolkit";

const state = {
  isLoagedIn: false,
  userId: null,
  name: null,
  email: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      isLoagedIn: true,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
      isLoagedIn: true,
    }),
    authSignOut: () => state,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
