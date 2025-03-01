import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// ✅ Your Firebase configuration (same as your project)
const firebaseConfig = {
  apiKey: "AIzaSyCrKgoAKtqN-5WvjpEhuZSbzFhCxgP_E2c",
  authDomain: "heartbidscharityauctions.firebaseapp.com",
  projectId: "heartbidscharityauctions",
  storageBucket: "heartbidscharityauctions.firebasestorage.app",
  messagingSenderId: "563050529632",
  appId: "1:563050529632:web:763c95115db9531e9d1405",
  measurementId: "G-8XXD0L19X3"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Export Firestore instance
