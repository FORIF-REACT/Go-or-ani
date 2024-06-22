// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHDirlc6vZnid0H0xoLkmDlRkdRBv0b-k",
    authDomain: "go-or-ani.firebaseapp.com",
    projectId: "go-or-ani",
    storageBucket: "go-or-ani.appspot.com",
    messagingSenderId: "594016162400",
    appId: "1:594016162400:web:81df5b07a6fdb8a82da905",
    measurementId: "G-DT7N3NGTYM"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth};