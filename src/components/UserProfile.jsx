import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { userCreatedPinsQuery, userQuery } from '../utils/data';
import { client } from '../library/sanity';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import bgProfile from '../assets/profile-bg.png'
import CollectionsIcon from '@mui/icons-material/Collections';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const UserProfile = () => {
	const [user, setUser] = useState();
	const [snaps, setSnaps] = useState();
	const navigate = useNavigate();
	const { userId } = useParams();
	const [imgCurInd, setimgCurInd] = useState(0);
	
	const User = localStorage.getItem('AdventuSnapUserAuth') !== 'undefined' ? JSON.parse(localStorage.getItem('AdventuSnapUserAuth')) : localStorage.clear();

	useEffect(() => {
		const query = userQuery(userId);
		client.fetch(query).then((data) => {
			setUser(data[0]);
		});

		const createdPinsQuery = userCreatedPinsQuery(userId);
		client.fetch(createdPinsQuery).then((data) => {
			setSnaps(data);
		});

	}, [userId]);

	let slides = snaps ? snaps.map((snap) => (snap.image.asset.url)): bgProfile;
	let imgURL = `url(${slides[imgCurInd]})`;

	if (!user) return <Spinner message="Loading profile" />;

	const prevSlide = () => {
		const isFirstSlide = imgCurInd === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : imgCurInd - 1;
		setimgCurInd(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = imgCurInd === slides.length - 1;
		const newIndex = isLastSlide ? 0 : imgCurInd + 1;
		setimgCurInd(newIndex);
	};

	return (
		<div className="relative pb-2 h-full justify-center items-center">
			<div className="flex flex-col pb-5">
				<div className="relative flex flex-col mb-7">
					<div className="flex flex-col justify-center items-center">
						<img className=" w-full h-370 2xl:h-510 shadow-lg object-cover" src={bgProfile} alt="user-pic" />
						<h1 className="absolute bottom-0 font-bold text-3xl sm:text-5xl md:text-6xl lg:text-9xl text-center text-gray-600 opacity-70">
							{user.userName}
						</h1>
					</div>
						<div className="absolute top-32 z-0 left-0 p-2">
							<h1 className='text-7xl font-extrabold text-white opacity-20'>{userId===User.uid?'My':''} Snaps.</h1>
						</div>
					<div className="absolute top-0 z-1 right-0 p-2 group">
						<div className='relative right-[15%] top-5 border border-white w-72 h-72 shadow-md bg-white flex justify-center items-center bg-center bg-cover duration-500 group' style={{ backgroundImage: imgURL }}>	
							<img className=" absolute bottom-[-15%]  z-1 right-[-15%] rounded-full w-20 h-20 -mt-10 shadow-xl object-cover" src={user.image} alt="user-pic" />
						</div>

						<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-[-25%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
							<ChevronLeftIcon onClick={prevSlide} size={30} />
						</div>

						<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-3 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
							<ChevronRightIcon onClick={nextSlide} size={30} />
						</div>
					</div>
				</div>
				<div className="text-center mb-7">
					<CollectionsIcon /> {userId===User.uid?'My':user.userName} Snap Collections
				</div>

				<div className="px-2">
					<MasonryLayout pins={snaps} />
				</div>
				
				{snaps?.length === 0 && (
				<div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
					No Snaps Found! Gallery is empty.
				</div>
				)}
			</div>

		</div>
	);
};

export default UserProfile;