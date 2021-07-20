import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBUOaYAIoWU3OYRb3GA2rLAsMj9WMPBI0g",
  authDomain: "docs-dd1ed.firebaseapp.com",
  projectId: "docs-dd1ed",
  storageBucket: "docs-dd1ed.appspot.com",
  messagingSenderId: "22536811801",
  appId: "1:22536811801:web:8283b34f35c7dac0130188",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
