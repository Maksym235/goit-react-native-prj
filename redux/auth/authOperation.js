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
      alert(error.message);
      console.log("error.message", error.message);
    }
  };
const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/invalid-password"
      ) {
        alert("Invalid email or password");
      }
      console.log("error.message", error.message, error.code);
    }
  };
const authSingOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error.message", error.message);
    alert(error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  try {
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
  } catch (error) {
    console.log("error.message", error.message);
    alert(error.message);
  }
};

export { authSingInUser, authSingUpUser, authSingOutUser, authStateChangeUser };
