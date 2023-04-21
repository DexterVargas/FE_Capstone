import React, { useState, useEffect, useContext } from "react";
import defaultImg from '../assets/default.png'
import {MobileNav,Typography,Button,Menu,MenuHandler,MenuList,MenuItem,Avatar,Card,IconButton,} from "@material-tailwind/react";
import {UserCircleIcon,ChevronDownIcon,Cog6ToothIcon,PowerIcon} from "@heroicons/react/24/outline";
import UserContext from "../context/user";
import FirebaseContext from "../context/firebase";
import * as ROUTES from '../constants/constants'
import { Link, useNavigate } from "react-router-dom";
import useUser from '../hooks/FirebaseActiveUser';

import MapIcon from '@mui/icons-material/Map';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import MenuIcon from '@mui/icons-material/Menu';

// profile menu component
const profileMenuItems = [	{label: "My Profile",icon: UserCircleIcon,},
							{label: "Edit Profile",icon: Cog6ToothIcon,},
							{label: "Sign Out",icon: PowerIcon,},];

const ProfileMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const closeMenu = () => setIsMenuOpen(false);
	const { user: loggedInUser } = useContext(UserContext);
	const { user } = useUser(loggedInUser?.uid);
	const { firebase } = useContext(FirebaseContext);
	const navigate = useNavigate();


	if(!loggedInUser) {
		return (
			<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
				<MenuHandler>
					<Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
						<Avatar variant="circular" size="sm" alt="candice wu" className="border border-blue-500 p-0.5" src={defaultImg} />
						<ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${ isMenuOpen ? "rotate-180" : "" }`}/>
					</Button>
				</MenuHandler>
				<MenuList className="p-1">
					{profileMenuItems.map(({ label, icon }, key) => {
					const isLastItem = key === profileMenuItems.length - 1;
						return (
							<MenuItem key={label} onClick={closeMenu} className={`flex items-center gap-2 rounded ${ isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10": ""}`}>
							
								{React.createElement(icon, { className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`, strokeWidth: 2, })}

								<Typography as="span" variant="small" className="font-normal" color={isLastItem ? "red" : "inherit"} >
									{label}
								</Typography>

							</MenuItem>
						);
					})}
				</MenuList>
			</Menu>)
	} else {
		return (
			<div className="absolute top-2/4 right-0 flex flex-row -translate-x -translate-y-2/4">
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
			</div>) 
	}
}

// nav list menu
const navListMenuItems = [
	{	title: "Luzon",
		description: "Travel city Lorem ipsum dolor sit amet consectetur adipisicing.", 
	},
	{	title: "Visayas",
		description: "Lorem ipsum dolor sit amet.Philippines",
	},
	{	title: "Mindanao",
		description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quae.", 
	},
];

const NavListMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const triggers = {
		onMouseEnter: () => setIsMenuOpen(true),
		onMouseLeave: () => setIsMenuOpen(false),
	};

	const renderItems = navListMenuItems.map(({ title, description }) => (
		<Link to="/" key={title}>
			<MenuItem>
				<Typography variant="h6" color="blue-gray" className="mb-1">
					{title}
				</Typography>
				<Typography variant="small" color="gray" className="font-normal">
					{description}
				</Typography>
			</MenuItem>
		</Link>
	));

	return (
		<React.Fragment>
			<Menu open={isMenuOpen} handler={setIsMenuOpen}>
				<MenuHandler>
					<Link to="/" variant="small" className="font-normal">
						<MenuItem
							{...triggers}
							className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
							>
							<MapIcon className="h-[18px] w-[18px]" /> Destinations{" "}
							<ChevronDownIcon strokeWidth={2} className={`h-3 w-3 transition-transform ${ isMenuOpen ? "rotate-180" : "" }`} />
						</MenuItem>
					</Link>
				</MenuHandler>
				<MenuList {...triggers} className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid" >
					<Card color="blue" shadow={false} variant="gradient" className="col-span-3 grid h-full w-full place-items-center rounded-md" >
						<PersonPinCircleIcon strokeWidth={1} className="h-28 w-28" />
					</Card>
					<ul className="col-span-4 flex w-full flex-col gap-1">
						{renderItems}
					</ul>
				</MenuList>
			</Menu>
			<MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
				<MapIcon className="h-[18px] w-[18px]" /> Destinations{" "}
			</MenuItem>
			<ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
				{renderItems}
			</ul>
		</React.Fragment>
	);
}
const NavbarComp = () => {
const [isNavOpen, setIsNavOpen] = useState(false);
const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

useEffect(() => {
	window.addEventListener("resize",() => window.innerWidth >= 960 && setIsNavOpen(false));
}, []);

const Navlist = () => {
	return (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
			<NavListMenu />
			<Link to={ROUTES.HOME} variant="small" color="blue-gray" className="font-normal" >
				<MenuItem className="flex items-center gap-2 lg:rounded-full text-sm">
					<TravelExploreIcon className= "h-[18px] w-[18px]" />{" "}
					Explore
				</MenuItem>
			</Link>
		</ul>
	)
}
return (
	<nav className="fixed mx-auto p-2 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
		<div className="relative mx-auto flex items-center text-blue-gray-900">
			<Link to={ROUTES.HOME} className="mr-4 ml-2 cursor-pointer py-1.5 text-blue-gray-900 text-2xl font-extrabold">
				AdventuSnap
			</Link>
			<div className="absolute top-2/4 right-10 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
				<Navlist/>
			</div>
			<IconButton size="sm" color="blue-gray" variant="text" onClick={toggleIsNavOpen} className="ml-auto mr-2 lg:hidden" >
				<MenuIcon className="h-6 w-6" />
			</IconButton>
			<ProfileMenu />
		</div>
		<MobileNav open={isNavOpen} className="overflow-scroll">
			<Navlist/>
		</MobileNav>
	</nav>
);
}

export default NavbarComp;