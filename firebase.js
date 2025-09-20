// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAKUe5yv0-fMeyMHwXVmUVerGE8nalpJxs",
  authDomain: "decor8-b14e8.firebaseapp.com",
  projectId: "decor8-b14e8",
  storageBucket: "decor8-b14e8.firebasestorage.app",
  messagingSenderId: "301302844702",
  appId: "1:301302844702:web:7376ed27571e8d40cccd0f",
  measurementId: "G-NGJ1DN3SCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase connected ✅");

// Export so other files can use
export { auth, db };
