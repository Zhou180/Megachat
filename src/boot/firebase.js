
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyD_lKJ8vcQJl_bAVY7FEdi6V83k_FdQvX8",
  authDomain: "megachat-ff325.firebaseapp.com",
  projectId: "megachat-ff325",
  storageBucket: "megachat-ff325.appspot.com",
  messagingSenderId: "462773161880",
  appId: "1:462773161880:web:3eb3cec00c8010b40b25ed",
  measurementId: "G-46N5RKMXPE"
};


// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDB = firebaseApp.database()

export {
  firebaseAuth, firebaseDB
}
