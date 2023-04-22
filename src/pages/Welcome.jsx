import React, { useState, useRef, useEffect} from 'react'
import map from '../assets/ph-map.png'
import { Button } from '@material-tailwind/react';
import NavigationIcon from '@mui/icons-material/Navigation';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/constants'
import bgVideoWelcome from '../assets/video/philippines.webm'


const Welcome = () => {
	const navigate = useNavigate();
	const [explore, setExplore] = useState(false);
	const scrollRef = useRef(null);

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0);
	});
	const handleClick = () => {
		if (localStorage.getItem('AdventuSnapUserAuth') !== null) {
			navigate(ROUTES.HOME, { replace: true })
		} else {
			navigate(ROUTES.LOGIN, { replace: true })
		}
	}
	const xx = document.querySelectorAll('#map_access :nth-child(even)');
	
	console.log(xx);
	return ( 
		<div className='h-screen w-full'>
			<div className=" relative w-full h-full">
			    <video src={bgVideoWelcome} type="video/mp4" loop controls={false} muted autoPlay className="w-full h-full object-cover" />
				<div className='absolute mx-auto flex flex-col items-center h-full px-4 md:flex-row top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
					<div className='flex flex-col justify-center h-full pl-0 md:pl-60'>
						<h2 className='text-4xl sm:text-7xl font-bold text-white'><NavigationIcon/>Discover</h2>
						<h3 className='text-4xl sm:text-7xl font-bold text-teal-400' >Philippines</h3>
						<p className='my-2 mb-4 text-blue-gray-200 '>Explore the country's renowned attractions, best activities, diverse cuisine, and rich culture. We can't wait for you to experience them all. #MoreFunAwaits you in the Philippines. #ItsMoreFunInThePhilippines<TravelExploreIcon /></p>
						<div>
							<Button color='blue-gray' className="group flex items-center gap-3 border-none" onMouseOver={() => setExplore(true)} onMouseLeave={() => setExplore(false)} onClick={handleClick}>
								Explore
								<span className=' group-hover:rotate-45 duration-300'>
									<NavigationIcon />
								</span>
							</Button>
						</div>
					</div>
					<div className='flex justify-center text-center max-w-5xl' ref={scrollRef}>
						{/* <img src={map} alt="ph-map" className='hidden rounded-2xl  h-4/6 w-full md:flex '/> */}
						<div id="map" className='hidden h-4/6 w-full md:flex '></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Welcome

