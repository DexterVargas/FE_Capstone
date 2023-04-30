import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { urlFor } from '../library/sanity';

const Pin = ({ pin }) => {
	const [postHovered, setPostHovered] = useState(false);

	const navigate = useNavigate();

	const { postedBy, image, _id } = pin;

	const user = localStorage.getItem('AdventuSnapUserAuth') !== 'undefined' ? JSON.parse(localStorage.getItem('AdventuSnapUserAuth')) : localStorage.clear();

	return (
		<div className="m-2">
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => navigate(`/pin-detail/${_id}`)}
				className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out my-4">

				{image && (				
					<img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" /> 
				)}
					
				{postHovered && (
					<>
					<div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 bg-black/25" style={{ height: '100%' }} >
						<Link to={`/user-profile/${postedBy?._id}`} className="absolute bottom-0 left-0 flex gap-2 p-1 items-center w-full bg-gray-100/30 rounded-b-md  transition-all duration-700 animate-slide-up hover:bg-gray-100/60">
							<img className="w-8 h-8 rounded-full object-cover group" src={postedBy?.image} alt="user-profile" />
							<p className="font-semibold capitalize text-blue-gray-900 hover:text-black-100/80 hover:font-thin">{postedBy?.userName}</p>
						</Link>
					</div>
					
					</>
					)}
			</div>
		</div>
	);
};

export default Pin;