
import firebase from 'firebase/app';

import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAt1fPI5ZcD7qnpbq_UJyZ9Kv3lPYZIwtg",
    authDomain: "remote-coders-test-ii.firebaseapp.com",
    projectId: "remote-coders-test-ii",
    storageBucket: "remote-coders-test-ii.appspot.com",
    messagingSenderId: "600870640184",
    appId: "1:600870640184:web:8bbde746767761d88164cd",
    measurementId: "G-HBLZVPZJVH"
  };

firebase.initializeApp(firebaseConfig);
export const firestore = firestore();
