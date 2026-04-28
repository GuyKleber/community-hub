import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "pccwebsite4-28-eea03",
  appId: "1:230876617160:web:ec047a6bceaa08f97008fd",
  storageBucket: "pccwebsite4-28-eea03.firebasestorage.app",
  apiKey: "AIzaSyA4UuJLHNDBv6hFvhJZwnYxz0UOnfQaekw",
  authDomain: "pccwebsite4-28-eea03.firebaseapp.com",
  messagingSenderId: "230876617160",
  measurementId: "G-1MKKX5TRF5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
