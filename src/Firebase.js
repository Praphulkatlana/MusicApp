import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "musicapp2201.firebaseapp.com",
  projectId: "musicapp2201",
  storageBucket: "musicapp2201.appspot.com",
  messagingSenderId: "17126571942",
  appId: "1:17126571942:web:8fe9c7c7899e3b3a0ad967",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Provider = new GoogleAuthProvider();
export default app;
