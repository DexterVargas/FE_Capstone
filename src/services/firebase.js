// import { firebase } from '../library/firebase'

// export const doesUsernameExist = async(username, email) => {
// 	const resUsername = await firebase
// 	.firestore()
// 	.collection('users')
// 	.where('username','==',username.toLowerCase())
// 	.get();

// 	const resEmail = await firebase
// 	.firestore()
// 	.collection('users')
// 	.where('emailAddress','==',email.toLowerCase())
// 	.get();

// 	return resUsername.docs.length + resEmail.docs.length;
// } 

//   // get user from the firestore where userId === userId (passed from the auth)
// export const getUserByUserId = async(userId) => {
// 	const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
// 	console.log(result);
// 	const user = result.docs.map((item) => ({
// 		...item.data(),
// 		docId: item.id
// 	}));
// 	return user;
// }