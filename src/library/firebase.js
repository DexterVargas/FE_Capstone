/**
 * import firebase , 
 * npm install --save firebase
 * read npm docu @: https://www.npmjs.com/package/firebase
 */
import {initializeApp} from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: "adventusnap.firebaseapp.com",
    projectId: "adventusnap",
    storageBucket: "adventusnap.appspot.com",
    messagingSenderId: "309635150964",
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};