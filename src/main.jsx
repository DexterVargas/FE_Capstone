import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";


import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './library/firebase';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider>		
		<Router>
			<FirebaseContext.Provider value = {{firebase, FieldValue}}>
				<App />
			</FirebaseContext.Provider>
		</Router>
	</ThemeProvider>
);
