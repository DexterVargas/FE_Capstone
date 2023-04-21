import React, { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/constants';
// import UserContext from "../context/user";
// import FirebaseContext from "../context/firebase";
// import useUser from '../hooks/FirebaseActiveUser';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Map';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CollectionsIcon from '@mui/icons-material/Collections';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';

import {Button,Menu,MenuHandler,MenuList,MenuItem,Avatar} from "@material-tailwind/react";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const closeMenu = () => setIsMenuOpen(false);
	const [nav, setNav] = useState(false);
	// const { userAuth:currentUserExist } = useContext(UserContext);
	// console.log('current user',currentUserExist);
	// const { user } = useUser(currentUserExist?.uid);
	// const { firebase } = useContext(FirebaseContext);
	const navigate = useNavigate();
	
	const profileMenuItems = [	{label: "My Profile",icon: AccountCircleIcon, callback: ()=>{
									firebase.auth().signOut(); 
									navigate(ROUTES.LOGIN);
								} },
								{label: "Edit Profile",icon: ManageAccountsIcon, callback: ()=>{
									firebase.auth().signOut(); 
									navigate(ROUTES.LOGIN);
								} },
								{label: "Sign Out",icon: LogoutIcon, callback: ()=>{
									firebase.auth().signOut(); 
									navigate(ROUTES.LOGIN); 
								} }];
	const handleEsc = (e) => {
		if (e.key === 'Escape' && nav) {
			setNav(!nav);
		}
	}
	useEffect(()=>{
		window.addEventListener('keydown',handleEsc);
		return () =>{ window.removeEventListener('keydown',handleEsc);}
	},[]);

	const navOverlay = [{ title: 'Destinations', icon: MapIcon, path: '' }, 
						{ title: 'Travels', icon: TravelExploreIcon, path: '' },
						{ title: 'Add Photo', icon: AddAPhotoIcon, path: '' },
						{ title: 'Collections', icon: CollectionsIcon, path: '' },
						{ title: 'Browse Collection', icon: BrowseGalleryIcon, path: '' }];
  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4 border-b border-gray-200'>
        <div className='flex items-center'>
			<div className='cursor-pointer'>
				<MenuIcon fontSize='large' onClick={()=>setNav(!nav)}/>
			</div>
			<Link to={ROUTES.HOME}>
				<h1 className='text-2xl sm:text-3xl lg:text-4xl'>Adventu<span className='font-bold'>Snap</span></h1>
			</Link>
			<div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[16px] border border-gray-300'>
				<p className='bg-blue-gray-400 text-white rounded-full p-2'>Explore</p>
				<p className='p-2'>Philippines</p>
				{/* <p className=' text-blue-gray-900 p-2 text-[20px]'>Discover Philippines</p> */}
			</div>
		</div>

		<div className='bg-white rounded-full px-6 text-blue-gray-500 border border-gray-300 flex items-center  w-[200px] sm:w-[400px] lg:w-[500px]'>
			<SearchIcon fontSize='medium'/>
			<input type="search" name="search" placeholder='Search' className='bg-white p-2 w-full p-x-20 ' />
		</div>
		<div>

		</div>
		{/* In this i will check if any user is currently login.
			Show User avatar for loggin user and show Login/Signup buttons if no current User */}
		{currentUserExist ? (
			<div>
				<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
					<MenuHandler>
						<Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
							<label className='px-2'>{currentUserExist?.displayName}</label>
							<Avatar variant="circular" size="sm" alt="user avatar" className="border border-blue-500 p-0.5" src={user?.defaultImage} />
							<KeyboardArrowDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${ isMenuOpen ? "rotate-180" : "" }`}/>
						</Button>
					</MenuHandler>
					<MenuList className="p-1">
						{profileMenuItems.map(({ label, icon,path, callback }, key) => {
							const isLastItem = key === profileMenuItems.length - 1;
							return (
								<MenuItem key={uuidv4()} onClick={callback} className={`flex items-center gap-2 rounded ${ isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10": ""}`}>
									<Link to={path}>
										{React.createElement(icon, { className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`, strokeWidth: 2, })}

										<p as="span" variant="small" className="font-normal" color={isLastItem ? "red" : "inherit"}>
											{label}
										</p>
									</Link>
								</MenuItem>
							);
						})}
					</MenuList>
				</Menu>
			</div>
			) : (
			<div className='flex flex-row justify-end gap-2'>
				<Link to={ROUTES.LOGIN}>
					<Button type="button"  variant="outlined"
					className="w-full py-2 px-3 rounded-md leading-tight cursor-pointer select-none transition-all hover:bg-blue-500  hover:text-white flex items-center gap-2 lg:rounded-full">
						Log In
					</Button>
				</Link>
				<Link to={ROUTES.SIGN_UP}>
					<Button type="button" variant="text" color="blue-gray"
					className="w-full py-2 px-3 rounded-md leading-tight cursor-pointer select-none transition-all hover:bg-blue-gray-50 hover:text-blue-gray-900 flex items-center gap-2 lg:rounded-full" >
						Sign Up
					</Button>
				</Link>
			</div>
			)}

		{/* mobileMenu */}
		
		{nav ? <div className='bg-black/20 fixed w-full h-screen z-10 top-0 left-0' onKeyDown={handleEsc}>	</div>: ''}

			<div className={nav?'fixed  top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300': 'fixed  top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'} >
				<CloseIcon fontSize='large' className='absolute right-4 top-4 cursor-pointer' onClick={()=>setNav(!nav)}/>
				<h1 className='text-2xl p-4'>Adventu<span className='font-bold'>Snap</span></h1>
				<nav>
					<ul className='flex flex-col p-4 text-gray-800 '>
						{navOverlay.map(({ title , icon}) => { 
							
								return(
									<Link to='' key={uuidv4()}>
										<li className='text-xl my-[2px] py-4 px-2 flex transition-all hover:bg-blue-gray-50 hover:rounded-full hover:bg-opacity-80 rounded cursor-pointer'>{React.createElement(icon, { className:'mr-4'}) } 
											{title}
										</li>
									</Link>
						)})}
					</ul>
				</nav>
			</div>
	
    </div>
  )
}

export default Navbar