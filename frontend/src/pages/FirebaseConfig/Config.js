// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcYiLft4i8N6-9EkUvJc-58-zj1yv2n0Y",
  authDomain: "otp1-3a853.firebaseapp.com",
  projectId: "otp1-3a853",
  storageBucket: "otp1-3a853.appspot.com",
  messagingSenderId: "68574691524",
  appId: "1:68574691524:web:47a01955f1857152d18991",
  measurementId: "G-1ZL8PRCL9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(' firebase app : ' , app);
export const auth=getAuth(app)