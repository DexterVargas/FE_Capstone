import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {Button,Menu,MenuHandler,MenuList,MenuItem,Avatar} from "@material-tailwind/react";
import { auth } from "../library/firebase";
import { signOut } from "firebase/auth";
import { UserProfileContext } from '../pages/Home';
const UserAvatar = () => {
    const navigate = useNavigate();
	const context = useContext(UserProfileContext);
    const currentUserID = context.user ? context.user?._id : '';

    const profileMenuItems = [	
        {label: "My Profile",icon: AccountCircleIcon, callback: ()=>{ navigate(`user-profile/${currentUserID}`);} },
        {label: "Sign Out",icon: LogoutIcon, callback: ()=>{ signOut(auth); localStorage.clear(); navigate(ROUTES.WELCOME); 
    } }];

  return (
    <div className='hidden md:flex flex-row'>
        <div>
            <Link to="/create-pin" className="border rounded-full w-8 h-8 md:w-14 md:h-12 flex justify-center items-center hover:bg-blue-gray-50">
                <AddAPhotoIcon/>
            </Link>
        </div>
        <Menu open={context.isMenuOpen} handler={context.setIsMenuOpen} placement="bottom-end">
            {context.user && (
            <MenuHandler>
                <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
                    <label className='px-2'>{context.user?.userName}</label>
                    <Avatar variant="circular" size="sm" alt="user avatar" className="border border-blue-500 p-0.5" src={context.user?.image} />
                    <KeyboardArrowDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${ context.isMenuOpen ? "rotate-180" : "" }`}/>
                </Button>
            </MenuHandler>)}
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon,path, callback }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem key={uuidv4()} onClick={callback} className={`flex items-center gap-2 rounded ${ isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10": ""}`}>
                            <Link to={path} className='w-full flex flex-row justify-evenly items-center'>
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
  )
}

export default UserAvatar