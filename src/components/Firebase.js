import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "pitna-voda-42a68.firebaseapp.com",
  projectId: "pitna-voda-42a68",
  storageBucket: "pitna-voda-42a68.appspot.com",
  messagingSenderId: "311288784117",
  appId: "1:311288784117:web:749779b47ca89b11fe51bc",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const timestamp = firebase.firestore.Timestamp.now();
export default app;
