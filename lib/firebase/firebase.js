import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA7CfOYYBJ8-ydfzw59gWZLnlYJWqNNizg",
  authDomain: "pars-4bef2.firebaseapp.com",
  projectId: "pars-4bef2",
  storageBucket: "pars-4bef2.appspot.com",
  messagingSenderId: "1022516749334",
  appId: "1:1022516749334:web:3f5f8d2bac754173854137"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore()
export const auth =getAuth()
export const storage=getStorage()