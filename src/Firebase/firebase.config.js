// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKw7G_1JYTgXKFIZsZV54Nvj6GSVLBPAk",
  authDomain: "digital-life-lessons-1725e.firebaseapp.com",
  projectId: "digital-life-lessons-1725e",
  storageBucket: "digital-life-lessons-1725e.firebasestorage.app",
  messagingSenderId: "561295593312",
  appId: "1:561295593312:web:0173319cc441d690ed9805",
  measurementId: "G-E9SYLXRWB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);