import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZcG5VhFNUT1gRGv_XRFXTcLP1s1uSCN0",
  authDomain: "ig-scoreboard.firebaseapp.com",
  databaseURL: "https://ig-scoreboard-default-rtdb.firebaseio.com",
  projectId: "ig-scoreboard",
  storageBucket: "ig-scoreboard.firebasestorage.app",
  messagingSenderId: "312779863920",
  appId: "1:312779863920:web:fb07fc849ead8f11e281b5",
  measurementId: "G-DC7GNSPEEE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
