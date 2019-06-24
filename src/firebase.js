import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0a1BABEfchWDBARSJ5r7VUxsKEjBBp68',
  authDomain: 'think-piece-3a56e.firebaseapp.com',
  databaseURL: 'https://think-piece-3a56e.firebaseio.com',
  projectId: 'think-piece-3a56e',
  storageBucket: 'think-piece-3a56e.appspot.com',
  messagingSenderId: '878221368811',
  appId: '1:878221368811:web:ec8321a49c5f4949',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
