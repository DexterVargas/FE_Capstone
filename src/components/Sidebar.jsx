import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { provinces } from '../utils/data';
import { v4 as uuidv4 } from 'uuid';
import { auth } from "../library/firebase";
import { signOut } from "firebase/auth";

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize bg-gray-200';
const optionsStyle = 'py-1 px-5 flex transition-all hover:bg-blue-gray-50 hover:rounded-full hover:bg-opacity-80';

import { Button } from "@material-tailwind/react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CollectionsIcon from '@mui/icons-material/Collections';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import ExploreIcon from '@mui/icons-material/Explore';
import CameraIcon from '@mui/icons-material/Camera';
import { UserProfileContext } from '../pages/Home';

const Sidebar = () => {
	const context = useContext(UserProfileContext);
    const navigate = useNavigate();
	const currentUserID = context.user ? context.user?._id : '';
	const userOptions = [
		{ title: 'Add Photo', icon: AddAPhotoIcon, path: '/create-pin' },
		{ title: 'My Collections', icon: CollectionsIcon, path: `user-profile/${currentUserID}` },
		{ title: 'Browse Collections', icon: BrowseGalleryIcon, path: '/search' }];

	const handleCloseSidebar = () => {
		if (context.toggleSidebar) context.setToggleSidebar(false);
	};

	return (
		<div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar from-transparent" >
			<div className="flex flex-col">
				<Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-290 items-center" onClick={handleCloseSidebar} >
					<h1 className='text-2xl sm:text-3xl lg:text-4xl'>
						<CameraIcon/>Adventu<span className='font-bold text-teal-400'>Snap</span>
					</h1>
				</Link>
				<div className="flex flex-col gap-2">
					<NavLink to="/" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar}>
						<ExploreIcon />
						Home | AdventuSnap
					</NavLink>
					<h3 className="mt-2 px-5 text-base 2xl:text-xl">Options</h3>
					{userOptions.map(({ title , icon, path}) => (
						<NavLink to={path} key={uuidv4()} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar}>
							<div className={optionsStyle} >{ React.createElement(icon, { className:'mr-4'}) } 
								{title}
							</div>
						</NavLink>
					))}
					<h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Places</h3>
					{provinces.slice(0, provinces.length - 1).map((province) => (
						<NavLink to={`/explore/${province.name}`} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar} key={uuidv4()} >
							<img src={`https://source.unsplash.com/600x400/?${province.name}`} className="w-8 h-8 rounded-full shadow-sm" />
							{province.name}
						</NavLink>
					))}
				</div>
			</div>
			{context.user && (
			<Link to={`user-profile/${context.user?._id}`} className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3" onClick={handleCloseSidebar} >
				<img src={context.user?.image} className="w-10 h-10 rounded-full" alt="user-profile" />
				<p>{context.user?.userName}</p>
			</Link>
			)}
			<Button type="button" variant="text" color="blue-gray" className="flex mb-3 gap-2 p-2 items-center bg-blue-gray-100 rounded-lg shadow-lg mx-3 transition-all hover:bg-red-100 hover:text-blue-gray-900 justify-center" onClick={()=>{ signOut(auth); localStorage.clear(); navigate('/welcome');}} >
				Sign out
			</Button>
			
		</div>
	);
};

export default Sidebar;