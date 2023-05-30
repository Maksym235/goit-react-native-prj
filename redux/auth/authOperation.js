import db from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { updateUserProfile, authStateChange, authSignOut } from "./authReduser";
// import { authSlice } from "./authReduser";

// const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const auth = getAuth(db);
// console.log(auth.currentUser.uid)
const authSingUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      const { displayName, uid } = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      dispatch(
        updateUserProfile({
          userId: uid,
          name: login,
          email,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
const authSingOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        name: user.displayName,
        userId: user.uid,
        email: user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

export { authSingInUser, authSingUpUser, authSingOutUser, authStateChangeUser };

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import { updateUserProfile, authStateChange } from "./authReduser";
// import { onChange } from "react-native-reanimated";

// export const authSingUp = async ({ login, email, password }) => {
//   try {
//     await createUserWithEmailAndPassword(auth, login, email, password);
//   } catch (error) {
//     throw error;
//   }
// };

// export const AuthStateChanged = async (dispatch) => {
//   try {
//     onAuthStateChanged((user) => {
//       dispatch(authStateChange({ stateChange: true }));
//     });
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };

// export const authLogIn = async ({ email, password }) => {
//   try {
//     const credentials = await signInWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     console.log(error.message);
//     throw error;
//   }
// };

// export const AuthupdateProfile = async (update) => {
//   const user = auth.currentUser;
//   if (user) {
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       console.log(error.message);
//       throw error;
//     }
//   }
// };
