/* eslint-disable import/no-extraneous-dependencies */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "where-is-waldo-4eb8f.firebaseapp.com",
  projectId: "where-is-waldo-4eb8f",
  storageBucket: "where-is-waldo-4eb8f.appspot.com",
  messagingSenderId: "721147782545",
  appId: "1:721147782545:web:35d976dcd7877c8b742630",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db, collection, doc, getDoc, getDocs, setDoc };
