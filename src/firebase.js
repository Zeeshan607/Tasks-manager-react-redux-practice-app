// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJnX0tL0-UndIpw9uFVKAwkJJIiDGhvhc",
  authDomain: "redux-practice-app-6fa4c.firebaseapp.com",
  projectId: "redux-practice-app-6fa4c",
  storageBucket: "redux-practice-app-6fa4c.appspot.com",
  messagingSenderId: "1095665406535",
  appId: "1:1095665406535:web:355f5cdd976bf0a5815762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app;