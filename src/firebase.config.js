// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgEIOO2uDK-zdisEiz6q9ozmzsPN_iclI",
  authDomain: "repzo-invoice-app.firebaseapp.com",
  projectId: "repzo-invoice-app",
  storageBucket: "repzo-invoice-app.firebasestorage.app",
  messagingSenderId: "1020662034797",
  appId: "1:1020662034797:web:cc739fb69afe1f7ee62a64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
