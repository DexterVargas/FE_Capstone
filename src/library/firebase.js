/**
 * import firebase , 
 * npm install --save firebase
 * read npm docu @: https://www.npmjs.com/package/firebase
 */
import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


import { seedDatabase } from '../seed'

const config = {
    apiKey: "AIzaSyBY8KyQViZeL7HsY1vUzqIsSYyaJJ7TAL8",
    authDomain: "adventusnap.firebaseapp.com",
    projectId: "adventusnap",
    storageBucket: "adventusnap.appspot.com",
    messagingSenderId: "309635150964",
    appId: "1:309635150964:web:0de72768371216b5824d21"
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };