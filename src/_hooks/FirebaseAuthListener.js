import { useState, useEffect, useContext } from 'react'
import FirebaseContext from '../context/firebase'
import { client } from '../library/sanity';

const FirebaseAuthListener = () => {
	const { firebase } = useContext(FirebaseContext);
	const [userAuth, setuserAuth] = useState(null);

	useEffect(()=>{
		const items = JSON.parse(localStorage.getItem('AdventuSnapUserAuth'));
		if (items) {
			setuserAuth(items);
		}
	},[]);

	useEffect(()=>{
		const listener = firebase.auth().onAuthStateChanged((firebaseUserAuth) => {
			if (firebaseUserAuth) {
				localStorage.setItem('AdventuSnapUserAuth', JSON.stringify(firebaseUserAuth));
				
				//sanity settings
				const { displayName, uid } = firebaseUserAuth;
				const doc = {
				_id: uid,
				_type: 'user',
				userName: displayName,
				image: 'https://www.shutterstock.com/image-vector/philippines-typographic-composition-traditional-food-600w-1245111499.jpg',
				};
				client.createIfNotExists(doc).then(() => {
					
				  });;

				setuserAuth(firebaseUserAuth);

			} else {
				localStorage.removeItem('AdventuSnapUserAuth');
				setuserAuth(null);
			}
		});

		return ()=>listener();

	},[firebase]);

	console.log('state userAuth', userAuth);
	return { userAuth }
}

export default FirebaseAuthListener