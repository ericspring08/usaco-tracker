import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCgfzh9g2cij_EeXXx3E83xcWemYgD5Ho0",
  authDomain: "usaco-tracker.firebaseapp.com",
  projectId: "usaco-tracker",
  storageBucket: "usaco-tracker.appspot.com",
  messagingSenderId: "1032086696120",
  appId: "1:1032086696120:web:5cb65be73b853f86e3844d",
  measurementId: "G-BBQ5WD4TSZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()