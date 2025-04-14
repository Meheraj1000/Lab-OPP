// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvhPVOsTIaGk2MMZYLzUe1w-gry_LQ0hY",
  authDomain: "opp-project-f326f.firebaseapp.com",
  projectId: "opp-project-f326f",
  storageBucket: "opp-project-f326f.firebasestorage.app",
  messagingSenderId: "1095608705486",
  appId: "1:1095608705486:web:df69e79f6f7eb3eea64b9f",
  measurementId: "G-9ZS5TBNFCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
//const analytics = getAnalytics(app);