// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYnkj0Jo1jqn6Ude0M95Ce1VC2cKStIe8",
  authDomain: "music-ministry-chord-finder.firebaseapp.com",
  projectId: "music-ministry-chord-finder",
  storageBucket: "music-ministry-chord-finder.appspot.com",
  messagingSenderId: "319648271676",
  appId: "1:319648271676:web:616bf20ef538b9faeb6239",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const fs = getFirestore(app);
