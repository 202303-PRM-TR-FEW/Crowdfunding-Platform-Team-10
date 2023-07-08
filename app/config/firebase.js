import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCHbLDcGIckV-TLF2k8eIlkbXA8cl8pB2A",
  authDomain: "crowdfunding-99b5a.firebaseapp.com",
  projectId: "crowdfunding-99b5a",
  storageBucket: "crowdfunding-99b5a.appspot.com",
  messagingSenderId: "662998578733",
  appId: "1:662998578733:web:151561c329ffcd66dc2aa4"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const  db = getFirestore();
export default app