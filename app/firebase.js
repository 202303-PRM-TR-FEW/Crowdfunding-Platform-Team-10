// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHbLDcGIckV-TLF2k8eIlkbXA8cl8pB2A",
  authDomain: "crowdfunding-99b5a.firebaseapp.com",
  projectId: "crowdfunding-99b5a",
  storageBucket: "crowdfunding-99b5a.appspot.com",
  messagingSenderId: "662998578733",
  appId: "1:662998578733:web:151561c329ffcd66dc2aa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)