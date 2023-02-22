import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYHt0nxEUhNp2cenm4rDGmWZFAQMfHbSg",
  authDomain: "webstoredev-affa8.firebaseapp.com",
  projectId: "webstoredev-affa8",
  storageBucket: "webstoredev-affa8.appspot.com",
  messagingSenderId: "446645544834",
  appId: "1:446645544834:web:acea792536cf11a127519b",
  measurementId: "G-F2VDRDVRCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
export default app;
