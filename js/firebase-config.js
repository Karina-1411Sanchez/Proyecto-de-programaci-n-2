import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8-KqMl1TDjazZhZzLQNuLzrV2AvFGO94",
  authDomain: "reflexion-virtual.firebaseapp.com",
  projectId: "reflexion-virtual",
  storageBucket: "reflexion-virtual.firebasestorage.app",
  messagingSenderId: "397441331917",
  appId: "1:397441331917:web:011795d4d6e0a27da22f84",
  measurementId: "G-62WGXYJMQN"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
