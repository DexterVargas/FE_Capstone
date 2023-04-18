import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'

const FirebaseAuthListener = () => {
	const { firebase } = useContext(FirebaseContext);
	const [userAuth, setuserAuth] = useState([]);

	useEffect(()=>{
		const items = JSON.parse(localStorage.getItem('AdventuSnapUserAuth'));
		if (items) {
			setuserAuth(items);
		}
	},[]);

	useEffect(()=>{
		const listener = firebase.auth().onAuthStateChanged((firebaseUserAuth) => {
			console.log(firebaseUserAuth);
			if (firebaseUserAuth) {
				localStorage.setItem('AdventuSnapUserAuth', JSON.stringify(firebaseUserAuth));
				setuserAuth(firebaseUserAuth);
			} else {
				localStorage.removeItem('AdventuSnapUserAuth');
				setuserAuth([]);
			}
		});

		return ()=>listener();

	},[firebase]);

	console.log('state userAuth', userAuth);
	return { userAuth }
}

export default FirebaseAuthListener