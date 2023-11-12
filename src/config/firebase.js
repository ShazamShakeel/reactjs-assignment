// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVQto1fUEeOVAHwUtAMRcf_9DIIa87w1o",
  authDomain: "reactjs-dnd-assignment.firebaseapp.com",
  projectId: "reactjs-dnd-assignment",
  storageBucket: "reactjs-dnd-assignment.appspot.com",
  messagingSenderId: "868455790188",
  appId: "1:868455790188:web:97fea025080ad532ec0a49",
  measurementId: "G-GX5NHSM8DF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
