// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvjZNKaxaDjiodbKFIxICcPqEjhqUyUVU",
    authDomain: "reels-f5555.firebaseapp.com",
    projectId: "reels-f5555",
    storageBucket: "reels-f5555.appspot.com",
    messagingSenderId: "642629037616",
    appId: "1:642629037616:web:1be17be8bcf5bbc701c7f5",
    measurementId: "G-L6QJTWJCLL"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  comments: firestore.collection('comments'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();