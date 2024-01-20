import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtDODAWBHoFos8O3FK7xVf887sJmkI5dI",
  authDomain: "kysely-playground.firebaseapp.com",
  databaseURL: "https://kysely-playground-default-rtdb.firebaseio.com",
  projectId: "kysely-playground",
  storageBucket: "kysely-playground.appspot.com",
  messagingSenderId: "823176398471",
  appId: "1:823176398471:web:c24309dd907f0eab1b1a22",
  measurementId: "G-G1QNWZ9NSP",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
