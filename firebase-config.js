const firebaseConfig = {
  apiKey: "AIzaSyAxIgf1_ttc1IMUvEPTkAwa09KkReHxd4M",
  authDomain: "forlogic-d98b1.firebaseapp.com",
  projectId: "forlogic-d98b1",
  databaseURL: "https://forlogic-d98b1-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "forlogic-d98b1.firebasestorage.app",
  messagingSenderId: "299599436273",
  appId: "1:299599436273:web:93b19bedd1535c6e27cc50",
  measurementId: "G-DDVQG8SYLC"
};

// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);