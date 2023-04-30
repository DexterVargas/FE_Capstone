import React, { useState, useRef, useEffect, createContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CameraIcon from '@mui/icons-material/Camera';
import bgImage from  '../assets/homebgimage.jpg'

import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../library/sanity';
import Pins from './Pins';
export const UserProfileContext = createContext();

const Home = () => {
	const [toggleSidebar, setToggleSidebar] = useState(true);
	const [user, setUser] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [refresher,setRefresher] = useState(true);
	const closeMenu = () => setIsMenuOpen(false);

	const scrollRef = useRef(null);

	const userInfo = localStorage.getItem('AdventuSnapUserAuth') !== 'undefined' ? JSON.parse(localStorage.getItem('AdventuSnapUserAuth')) : localStorage.clear();

	useEffect(() => {
		document.title = 'AdventuSnap | Home'
		const query = userQuery(userInfo?.uid);
		client.fetch(query).then((data) => {
			// console.log('data from HOME',data[0]);
			setUser(data[0]);
		});
	}, []);

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0);
	});
	const values = {
		toggleSidebar,
		setToggleSidebar,
		user,
		userInfo,
		isMenuOpen,
		setIsMenuOpen,
		closeMenu,
		refresher,
		setRefresher
	}
	return (
		<UserProfileContext.Provider value={ values }>
			<div  style={{backgroundImage: `url(${bgImage})`}} className="flex md:flex-row flex-col h-screen transition-height duration-75 ease-out bg-no-repeat bg-center bg-cover" >
				<div className="hidden md:flex h-screen flex-initial">
					<Sidebar />
				</div>

				{/* Hidden if screen if greater than 720px of medium device */}
				<div className="flex md:hidden flex-row">
					<div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
						<MenuIcon size={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
						<Link to="/">
							<h1 className='flex justify-center items-center text-2xl p-4'>
								<CameraIcon className='text-navColor'/>Adventu<span className='font-bold text-teal-400'>Snap</span>
							</h1>
						</Link>
					</div>
					{/*overlay*/}
					{toggleSidebar ? <div className='bg-black/20 fixed w-full h-screen z-10 top-0 left-0'>	</div>: ''}
					
					{toggleSidebar && (
					<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-20 animate-slide-in">
						<div className="absolute w-full flex justify-end items-center p-2">
							<CloseIcon size={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
						</div>
						<Sidebar />
					</div>
					)}
				</div>

				{/* Left panel all images will be displayed */}
				<div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
					<Routes>
						<Route path="/user-profile/:userId" element={<UserProfile />} />
						<Route path="/*" element={<Pins/>} />
					</Routes>
				</div>
			</div>
		</UserProfileContext.Provider>
	);
};

export default Home;