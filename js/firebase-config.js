import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8-KqMl1TDjazZhZzLQNuLzrV2AvFGO94",
  authDomain: "reflexion-virtual.firebaseapp.com",
  projectId: "reflexion-virtual",
  storageBucket: "reflexion-virtual.appspot.com", 
  messagingSenderId: "397441331917",
  appId: "1:397441331917:web:011795d4d6e0a27da22f84",
  measurementId: "G-62WGXYJMQN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
