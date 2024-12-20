// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Cm2SAtAfNxGT4PRpxq80HnGUYE_Pd2U",
  authDomain: "blend-ocean.firebaseapp.com",
  projectId: "blend-ocean",
  storageBucket: "blend-ocean.firebasestorage.app",
  messagingSenderId: "546762889618",
  appId: "1:546762889618:web:57b3459d3300459532c94b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();