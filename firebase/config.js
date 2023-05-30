// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQS-iHAqZkgkKqSvPCPoGdXbPPq6L-aSw",
  authDomain: "goit-react-native-prj.firebaseapp.com",
  projectId: "goit-react-native-prj",
  storageBucket: "goit-react-native-prj.appspot.com",
  messagingSenderId: "539601886963",
  appId: "1:539601886963:web:2a99497f3e55df356ee186",
  measurementId: "G-2B2N6L5JPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
