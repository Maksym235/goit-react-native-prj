import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    name: null,
    email: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     userId: null,
//     userEmail: null,
//     userName: null,
//     stateChange: false,
//   },
//   reducers: {
//     updateUserProfile: (state, action) => ({
//       ...state,
//       userId: action.payload.userId,
//       userName: action.payload.userName,
//       userEmail: action.payload.email,
//     }),
//     authStateChange: (state, action) => ({
//       ...state,
//       stateChange: action.payload.stateChange,
//     }),
//   },
// });

// export const { updateUserProfile, authStateChange } = authSlice.actions;
