import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import UserAvatar from './UserAvatar';

import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const Navbar = ({ searchTerm, setSearchTerm }) => {
	const navigate = useNavigate();
  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4 border-b border-gray-200'>
        <div className='flex items-center '>
			<Link to='/quickexplore'>
				<div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[16px] border border-gray-300 hover:bg-white hover:border-gray-600'>
					<p className=' bg-blue-gray-400 text-white rounded-full p-2'>
						<MapOutlinedIcon />
						Quick
					</p>
					<p className='p-2'>Explore</p>
				</div>
			</Link>
		</div>

		<div className='bg-white rounded-full px-6 text-blue-gray-500 border border-gray-300 flex items-center w-full md:w-[300px] lg:w-[500px]'>
			<SearchIcon fontSize='medium'/>
			<input type="search" name="search" placeholder='Search' className='bg-white p-2 w-full p-x-20 ' onChange={(e) => setSearchTerm(e.target.value)}  value={searchTerm}
            onFocus={() => navigate('/search')}/>
		</div>
		<UserAvatar />
    </div>
  )
}

export default Navbar