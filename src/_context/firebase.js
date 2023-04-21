/**
 * Firebase is a google services or containers for your apps. Its a cloud database. visit https://console.firebase.google.com/
 * Create Context to give access to all child element of main.jsx(i use vite), /app.js(if you use cra or create-react-app)
 * default (null) because, user shoud first be authenticated before accessing the app
 */
import { createContext } from "react";

const FirebaseContext = createContext(null);

export default FirebaseContext;