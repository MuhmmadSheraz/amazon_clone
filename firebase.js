import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAi1r5ZA7F_9z6WpCeyOGYdwFdRSsphli0",
  authDomain: "clone-c5dcd.firebaseapp.com",
  projectId: "clone-c5dcd",
  storageBucket: "clone-c5dcd.appspot.com",
  messagingSenderId: "418207647650",
  appId: "1:418207647650:web:3b833e4dab3f472fc794fb",
  measurementId: "G-Q8BG0HE88Q",
};
// For Checking if it is not already Initialze
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();

export default db;
