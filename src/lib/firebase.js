import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCWUiek64USz8fa0WuoVwa_sEXyrcwZR-Y",
  authDomain: "killer-control-714af.firebaseapp.com",
  projectId: "killer-control-714af",
  storageBucket: "killer-control-714af.firebasestorage.app",
  messagingSenderId: "716014116068",
  appId: "1:716014116068:web:77ecf965e37a2ea161e0f1",
  measurementId: "G-4S5GK6N9CE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics only in browser environment (avoids blank page on SSR/build)
let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
export { analytics };

export default app;
