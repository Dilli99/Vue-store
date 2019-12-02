import firebase from "firebase";
require("firebase/storage");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDpsqBdT9eU8RPAfYHCXeomHFPlCHwjMAw",
  authDomain: "vue-site-d8984.firebaseapp.com",
  databaseURL: "https://vue-site-d8984.firebaseio.com",
  projectId: "vue-site-d8984",
  storageBucket: "vue-site-d8984.appspot.com",
  messagingSenderId: "1071366767596",
  appId: "1:1071366767596:web:c8248cb1410f083d4536c9",
  measurementId: "G-3KEK813B47"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db };
