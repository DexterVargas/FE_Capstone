import React, { useState, useRef, useEffect} from 'react'
import { Sidebar } from '../components'
import MenuIcon from '@mui/icons-material/Menu';
import map from '../assets/ph-map.png'
import Pins from './Pins'
import { Button } from '@material-tailwind/react';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

const Home = () => {
	const [explore, setExplore] = useState(false);
	return ( 
		<div className='h-screen w-full bg-gradient-to-b from-white to-gray-400 blue-gray'>

			<div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
				<div className='flex flex-col justify-center h-full'>
					<h2 className='text-4xl sm:text-7xl font-bold text-gray-800 '>Discover</h2>
					<h3 className='text-4xl sm:text-7xl font-bold text-teal-800'>Philippines</h3>
					<p className='my-2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At cum eaque, eligendi voluptates veniam debitis ullam, quod officiis quibusdam in aut, dicta quo. !</p>
					<div>
						<Button color='blue-gray' className="group flex items-center gap-3" onMouseOver={() => setExplore(true)} onMouseLeave={() => setExplore(false)}>
							Explore
							<span className=' group-hover:rotate-90 duration-300'>
								{explore ? <AddLocationAltIcon strokeWidth={2} className="h-5 w-5" />: <ShareLocationIcon /> }
								<ModeOfTravelIcon />
							</span>
						</Button>
					</div>
				</div>
				<div className='flex justify-center text-center'>
					<img src={map} alt="ph-map" className='rounded-2xl mx-auto w-full md:w-full h-5/6'/>
				</div>
			</div>

			
		</div>
	)
}

export default Home

