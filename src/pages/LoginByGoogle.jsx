import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link} from 'react-router-dom';
import stackImg from  '../assets/img.jpg'
import { Card,Button,Typography } from "@material-tailwind/react";
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from "../library/firebase";
import { signInWithPopup } from 'firebase/auth';
import { client } from '../library/sanity';
import CameraIcon from '@mui/icons-material/Camera';

import videoLogin from '../assets/video/philippines-playback4.webm'

const LoginByGoogle = () => {
	const navigate = useNavigate();
	const [userAuth, setuserAuth] = useState(null);

	useEffect(()=>{
		document.title = 'AdventuSnap | Login by google account'
	},[])

	useEffect(()=>{
		const items = JSON.parse(localStorage.getItem('AdventuSnapUserAuth'));
		if (items) {
			setuserAuth(items);
		}
	},[]);

	const handleClick = () => {
		signInWithPopup(auth, provider).then((data) => {
			if (data) {
				localStorage.setItem('AdventuSnapUserAuth', JSON.stringify(data.user));
				const { displayName, uid, photoURL } =data.user;
				const doc = {
							_id: uid,
							_type: 'user',
							userName: displayName,
							image: photoURL,
							};
				
				client.createIfNotExists(doc).then(() => {
					navigate('/*', { replace: true });
					setuserAuth(data.user);
				});
			} else {
				localStorage.removeItem('AdventuSnapUserAuth');
				setuserAuth(null);
			}
			
		})
	}
	return (
		<>
			<div className='h-screen w-full'>
				<div className='relative w-full h-full'>
					<video src={videoLogin} type="video/mp4" loop controls={false} muted autoPlay className="w-full h-full object-cover" />
					<div className='absolute mx-auto flex flex-col items-center h-full px-4 md:flex-row top-0 right-0 left-0 bottom-0 bg-blackOverlay' >
					<div className='flex flex-col justify-center h-2/4 pl-0 mr-5 md:pl-60'>
						<img src={stackImg} className="w-full h-full object-contain" />
					</div>
					<div className='flex flex-col justify-center items-center'>

						<Link
						to="/login"
						className="flex px-5 gap-2 my-6 pt-1 w-290 items-center"
						>
							<h1 className='text-2xl sm:text-3xl lg:text-4xl text-navColor'>
								<CameraIcon/>Adventu<span className='font-bold text-teal-400'>Snap</span>
							</h1>
						</Link>

						<div className='p-4 rounded-xl shadow-md w-full min-w-350  md:w-[400px] lg:w-[500px] bg-white'>

							<Card color="transparent" shadow={false}>
								<Typography variant="h4" color="blue-gray" className='text-center w-full'>
									Login
								</Typography>
									<Button type='submit' className='mt-6 border-opacity-0' fullWidth onClick={handleClick}>
										<GoogleIcon className='mr-2'/>Login with Google
									</Button>
							</Card>
						</div>
					</div>
					
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginByGoogle