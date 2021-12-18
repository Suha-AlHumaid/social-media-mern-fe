import firebase from "firebase/compat/app";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA7sySboGfe8dwAWVbUH1XwdKPF__Mvb2w",
  authDomain: "recipes-notebook-5d870.firebaseapp.com",
  projectId: "recipes-notebook-5d870",
  storageBucket: "recipes-notebook-5d870.appspot.com",
  messagingSenderId: "1010328969681",
  appId: "1:1010328969681:web:f631369929f7ea8e63c0f0",
  measurementId: "G-62BXMR1NK8",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
