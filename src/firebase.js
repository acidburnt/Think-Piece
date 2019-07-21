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
  appId: '1:878221368811:web:ec8321a49c5f4949'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  // get a reference to the place in database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  // go and fetch the document from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (e) {
      console.error('Error creating user', e.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    return firestore.collection('users').doc(uid);
  } catch (e) {
    console.error('error fetching user', e.message);
  }
};

export default firebase;
