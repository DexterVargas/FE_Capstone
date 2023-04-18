import { firebase, FieldValue } from '../library/firebase'

export const doesUsernameExist = async(username, email) => {
    const resUsername = await firebase
    .firestore()
    .collection('users')
    .where('username','==',username.toLowerCase())
    .get();

    const resEmail = await firebase
    .firestore()
    .collection('users')
    .where('emailAddress','==',email.toLowerCase())
    .get();

    return resUsername.docs.length + resEmail.docs.length;
} 