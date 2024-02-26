// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "community-polling.firebaseapp.com",
  projectId: "community-polling",
  storageBucket: "community-polling.appspot.com",
  messagingSenderId: "899552295068",
  appId: "1:899552295068:web:8acb3106583591df7e9559"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);