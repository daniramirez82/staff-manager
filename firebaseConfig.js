// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy-BmHZy8LwEizpdsd031bkm0EhfIMh2s",
  authDomain: "staff-676c8.firebaseapp.com",
  projectId: "staff-676c8",
  storageBucket: "staff-676c8.appspot.com",
  messagingSenderId: "545622416055",
  appId: "1:545622416055:web:1cf9652899b92c17194b32",
  measurementId: "G-0JD9JE8ZFJ"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
const db = getFirestore(app);

export {db};