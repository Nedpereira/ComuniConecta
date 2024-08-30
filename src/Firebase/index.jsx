import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const originalConsoleLog = console.log;

console.log = (...args) => {
  if (
    !args.some((arg) => typeof arg === "string" && arg.includes("heartbeats"))
  ) {
    originalConsoleLog(...args);
  }
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
