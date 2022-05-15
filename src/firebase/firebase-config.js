// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAuWPWwb4cb-MTqaHJk5c99_p_IrpX7MHU",
  authDomain: "phone-market-e2d09.firebaseapp.com",
  projectId: "phone-market-e2d09",
  storageBucket: "phone-market-e2d09.appspot.com",
  messagingSenderId: "294766201830",
  appId: "1:294766201830:web:912305c542ab5d228b6427",
  measurementId: "G-ZS3NVHQ8SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);