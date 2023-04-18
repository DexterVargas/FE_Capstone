import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../context/firebase'
import { Link, useNavigate } from 'react-router-dom'
import logo from  '../assets/ph-map.png'
import * as ROUTES from '../constants/routes'
import {
	Card,
	Input,
	Button,
	Typography,
  } from "@material-tailwind/react";

  import { doesUsernameExist } from '../services/firebase'

const Signup = () => {
	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);
	const [input, setInput] = useState({userName:'',fullName:'', userEmail: '', userPassword: '', reuserPassword: ''});
	const [error, setError] = useState('');
	const isInvalid = input.userName === '' || input.fullName === '' || input.userEmail === '' || input.userPassword === '' || input.reuserPassword === '';

	useEffect(()=>{
		document.title = 'AdventuSnap | Signup'
	},[])

	const handleChange = (e) => {
		console.log(e.target.value)
		setInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	}

	 const handleSignup = async (e) => {
		e.preventDefault();
        console.log(input)
        //check password matches
        if (input.userPassword !== input.reuserPassword) {
            setError('Password not match!'); 
            return null;
        }
        /**
         * checkUserIfExist: this will check if a username or email exist in the database. return 0 if no user, else return # > 0. 
         */
        const checkUserIfExist = await doesUsernameExist(input.userName,input.userEmail);
        console.log(checkUserIfExist);
        if (checkUserIfExist === 0) {
            try {
                /**
                 * This will create new user and save to firebase database.
                 * Will save email and password
                 * see https://firebase.google.com/docs/auth/web/manage-users for more details
                 */
            	const createdNewUser = await firebase.auth().createUserWithEmailAndPassword(input.userEmail, input.userPassword);
                /**
                 * New user already created and we want to add the displayName. We use the updateProfile method.
                 * updateProfile
                 */
                await createdNewUser.user.updateProfile({
                    displayName: input.userName
                });

                const fullName = input.fullName;
                /**
                 * This will also add additional user information of the new created user.
                 */
                await firebase.firestore().collection('users').add({
                    userId: createdNewUser.user.uid,
                    username: input.userName.toLowerCase(),
                    fullName,
                    emailAddress: input.userEmail,
                    followers: [],
                    following: [],
                    dateCreated: Date.now()
                });
                //redirect to url: './' 
                
                navigate(ROUTES.HOME);

            } catch (error) {
            	setInput({userName:'',fullName:'', userEmail: '', userPassword: '', reuserPassword: ''});
            	setError(error.message)
            }
        } else {
            setError('Username || Email already exist. Please try another username or email.')
        }
	} 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
			handleSignup(e);
        }
    };

	return (
		<div className='h-screen w-full blue-gray'>
			<div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full p-4 md:flex-row'>
				<img src={logo} alt='AdventuSnap' />
				<div className='border border-blue-gray-200 p-4 rounded-xl shadow-md'>
					<Card color="transparent" shadow={false}>

						<Typography variant="h4" color="blue-gray" className='text-center'>
							Signup
						</Typography>
						<Typography color="gray" className="mt-1 font-normal text-center">
							Enter your details to login.
						</Typography>

						{error && <p className='text-xs text-red-300'>{error} </p>}

						<form onSubmit={handleSignup} method='POST' className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
							<div className="mb-4 flex flex-col gap-6">
                                <Input size="lg" label="Username" onChange={handleChange} name='userName' value={input.userName} autoFocus onKeyDown={handleKeyDown}/>
                                <Input size="lg" label="Full Name" onChange={handleChange} name='fullName' value={input.fullName}  onKeyDown={handleKeyDown}/>
                                <Input size="lg" type='email' label="Email" onChange={handleChange} name='userEmail' value={input.userEmail} onKeyDown={handleKeyDown}/>
                                <Input type="password" size="lg" onChange={handleChange} label="Password" name='userPassword' value={input.userPassword} onKeyDown={handleKeyDown}/>
                                <Input type="password" size="lg" onChange={handleChange} label="Re-type Password" name='reuserPassword' value={input.reuserPassword} onKeyDown={handleKeyDown}/>
							</div>

							<Button type='submit' className={`mt-6 ${isInvalid && 'opacity-50'}`} fullWidth onKeyDown={handleKeyDown} disabled={isInvalid}>
							    Sign Up
							</Button>
							<Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?{" "}
                                <Link to={ROUTES.LOGIN} className="font-medium text-blue-500 transition-colors hover:text-blue-700">
                                    Login
                                </Link>
							</Typography>
						</form>

					</Card>
				</div>
			</div>
		</div>
	)
}

export default Signup