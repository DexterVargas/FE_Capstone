import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/constants';
import { v4 as uuidv4 } from 'uuid';

import UserContext from "../context/user";
import FirebaseContext from "../context/firebase";
import useUser from '../hooks/FirebaseActiveUser';

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
import ExploreIcon from '@mui/icons-material/Explore';


import {Button,Menu,MenuHandler,MenuList,MenuItem,Avatar} from "@material-tailwind/react";



const islandsData = [{title: 'Luzon', icon: ExploreIcon},
                    {title: 'Visayas', icon: ExploreIcon},
                    {title: 'Mindanao', icon: ExploreIcon},
                    ];
const places = [{title: 'Manila', icon: MapIcon},
                {title: 'Boracay', icon: MapIcon},
                {title: 'Batangas', icon: MapIcon},
                {title: 'Davao', icon: MapIcon},
                {title: 'Cebu', icon: MapIcon},
                {title: 'Bicol', icon: MapIcon},
                {title: 'Ilocos Norte', icon: MapIcon},]

const Sidebar = () => {






	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const closeMenu = () => setIsMenuOpen(false);
	const [nav, setNav] = useState(false);
	const { userAuth:currentUserExist } = useContext(UserContext);
	console.log('current user',currentUserExist);
	const { user } = useUser(currentUserExist?.uid);
	const { firebase } = useContext(FirebaseContext);
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




	const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
	const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';


	return (<>
		<div className='max-w-[1640px] mx-auto flex justify-between p-4 items-start'>
		<aside className="w-64 min-w-[300px] mx-2 " aria-label="Sidebar">
			<div className="px-3 py-4 h-screen overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-800">
				<ul className="space-y-2">
					<h2 className='font-bold text-blue-gray-900'>Islands</h2>
					<hr />
					{islandsData.map(({ title , icon}) => { 
						return(
						<li key={uuidv4()} className='group text-gray-900 rounded-lg hover:bg-blue-gray-500 hover:text-white cursor-pointer'>
							<Link to="#" className="flex items-center p-2 text-base font-normal ">
							{React.createElement(icon, { className:' group-hover:rotate-[-45deg] duration-300'}) }
								<span className="ml-3">{title}</span>
							</Link>
						</li>)})}
				  
					<h2 className='font-bold text-blue-gray-900'>Cities | Provinces</h2>  
					<hr />
					{places.map(({ title , icon}) => { 
						return(
						<li key={uuidv4()} className='group text-gray-900 rounded-lg hover:bg-blue-gray-500 hover:text-white cursor-pointer'>
							<Link to="#" className="flex items-center p-2 text-base font-normal ">
							{React.createElement(icon, { className:' group-hover:rotate-[-45deg] duration-300'}) }
								<span className="ml-3">{title}</span>
							</Link>
						</li>)})}
				</ul>
			</div>
		</aside>
		</div>




<div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
<div className="flex flex-col">
  <Link
	to="/"
	className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
	onClick={handleCloseSidebar}
  >
	<img src={logo} alt="logo" className="w-full" />
  </Link>
  <div className="flex flex-col gap-5">

	<NavLink
	  to="/"
	  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
	  onClick={handleCloseSidebar}
	>
	  <RiHomeFill />
	  Home
	</NavLink>
	<h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
	{categories.slice(0, categories.length - 1).map((category) => (
	  <NavLink
		to={`/category/${category.name}`}
		className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
		onClick={handleCloseSidebar}
		key={category.name}
	  >
		<img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
		{category.name}
	  </NavLink>
	))}
  </div>
</div>
{user && (
  <Link
	to={`user-profile/${user._id}`}
	className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
	onClick={handleCloseSidebar}
  >
	<img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
	<p>{user.userName}</p>
	<IoIosArrowForward />
  </Link>
)}
</div>



</>
	)
}

export default Sidebar