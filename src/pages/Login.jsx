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


const Login = () => {
	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);
	const [input, setInput] = useState({userEmail: '',userPassword: ''});
	const [error, setError] = useState('');
	const isInvalid = input.userEmail === '' || input.userPassword === '';

	useEffect(()=>{
		document.title = 'AdventuSnap | Login'
	},[])

	const handleChange = (e) => {
		console.log(e.target.value)
		setInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	}

	 const handleLogin = async (e) => {
		e.preventDefault();
		console.log(input);
		try {
			await firebase.auth().signInWithEmailAndPassword(input.userEmail, input.userPassword);
			navigate(ROUTES.HOME);
		} catch (error) {
			setInput({userEmail: '',userPassword: ''});
			setError(error.message)
		}
	} 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
			handleLogin(e);
        }
    };

	return (
		<div className='h-screen w-full blue-gray shadow-md'>
			<div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full p-4 md:flex-row'>
				<img src={logo} alt='AdventuSnap' />
				<div className='border border-blue-gray-200 p-4 rounded-xl  shadow-md'>
					<Card color="transparent" shadow={false}>

						<Typography variant="h4" color="blue-gray" className='text-center'>
							Login
						</Typography>
						<Typography color="gray" className="mt-1 font-normal text-center">
							Enter your details to login.
						</Typography>

						{error && <p className='text-xs text-red-300'>{error} </p>}

						<form onSubmit={handleLogin} method='POST' className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
							<div className="mb-4 flex flex-col gap-6">
								<Input size="lg" type='email' label="Email" onChange={handleChange} name='userEmail' value={input.userEmail} autoFocus onKeyDown={handleKeyDown}/>
								<Input type="password" size="lg" onChange={handleChange} label="Password" name='userPassword' value={input.userPassword} onKeyDown={handleKeyDown}/>
							</div>
							<Button type='submit' className={`mt-6 ${isInvalid && 'opacity-50'}`} fullWidth onKeyDown={handleKeyDown} disabled={isInvalid}>
								Login
							</Button>
							<Typography color="gray" className="mt-4 text-center font-normal">
								Don't have an account?{" "}
								<Link to={ROUTES.SIGN_UP} className="font-medium text-blue-500 transition-colors hover:text-blue-700" >
									Sign Up
								</Link>
							</Typography>
						</form>
						
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Login