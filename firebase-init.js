// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOToR4CRGrSyy09Cy6h9Xj4Ef4ibawAZE",
    authDomain: "training-manual-lh.firebaseapp.com",
    projectId: "training-manual-lh",
    storageBucket: "training-manual-lh.firebasestorage.app",
    messagingSenderId: "850010019020",
    appId: "1:850010019020:web:353b5c385625c1593d1e69",
    measurementId: "G-FP71DVNTGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
