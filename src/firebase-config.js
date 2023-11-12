// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBf-eU596f2uhGL1WXaxxRC6r2R_lrYnsc",
//   authDomain: "fir-chat-78861.firebaseapp.com",
//   projectId: "fir-chat-78861",
//   storageBucket: "fir-chat-78861.appspot.com",
//   messagingSenderId: "269492468774",
//   appId: "1:269492468774:web:75efd567b411dfd51bfae7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf-eU596f2uhGL1WXaxxRC6r2R_lrYnsc",
  authDomain: "fir-chat-78861.firebaseapp.com",
  projectId: "fir-chat-78861",
  storageBucket: "fir-chat-78861.appspot.com",
  messagingSenderId: "269492468774",
  appId: "1:269492468774:web:75efd567b411dfd51bfae7"
};

// Check if Firebase is already initialized to avoid errors
const app = initializeApp(firebaseConfig);

// Create Auth and Firestore instances
const authInstance = getAuth(app);
const providerInstance = new GoogleAuthProvider();
const dbInstance = getFirestore(app);

export { authInstance as auth, providerInstance as provider, dbInstance as db };

