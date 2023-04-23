import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


import { client, urlFor } from '../library/sanity';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import CameraIcon from '@mui/icons-material/Camera';
import VerifiedIcon from '@mui/icons-material/Verified';
import { UserProfileContext } from '../pages/Home';

const PinDetail = () => {
	const context = useContext(UserProfileContext);
	const { pinId } = useParams();
	const [pins, setPins] = useState();
	const [pinDetail, setPinDetail] = useState();
	const [comment, setComment] = useState('');
	const [addingComment, setAddingComment] = useState(false);

	const fetchPinDetails = () => {
		const query = pinDetailQuery(pinId);

		if (query) {
			client.fetch(`${query}`).then((data) => {
				setPinDetail(data[0]);
				// console.log('fetchPin', data[0])
				context.setRefresher(!context.refresher);
				if (data[0]) {
					const queryMore = pinDetailMorePinQuery(data[0]);
					client.fetch(queryMore).then((res) => {
						// console.log(res)
						setPins(res);
					});
				}
			});
		}
	};

	useEffect(() => {
		fetchPinDetails();
		if (addingComment) fetchPinDetails();
	}, [pinId,addingComment]);

	const addComment = () => {
		if (comment) {
			setAddingComment(true);

			client
				.patch(pinId)
				.setIfMissing({ comments: [] })
				.insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: context.user?._id } }])
				.commit()
				.then(() => {
					fetchPinDetails();
					setComment('');
					setAddingComment(false);
				});
		}
	};

	if (!pinDetail) {
		return (<Spinner message="Showing snaps" />);
	}
	return (
		<>
		{pinDetail && (
			<div className="relative max-w-[1024px] flex md:flex-row flex-col my-2 mx-auto bg-white rounded-lg md:items-center " >
				<div className='bg-black/20 top-0 left-0 w-full h-full md:w-4/6 rounded-l-lg flex justify-center items-center border-r border-gray-400 z-10'>
					<img className="object-contain rounded-lg  max-h-[510px]" src={(pinDetail?.image && urlFor(pinDetail?.image).url())} alt="user-post" />
				</div>
				<div className="p-5 md:min-w-520 flex flex-col justify-start z-10">
					<div>
						<h1 className="text-2xl font-bold break-words mt-3 border-b border-gray-400">
							<CameraIcon className='text-font text-blue-gray-400'/>{pinDetail.title}
						</h1>
						<Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
							<img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
							<p className="font-bold">
								{pinDetail?.postedBy.userName}{ }<VerifiedIcon className='text-blue-400 text-xs'/>{ }
								<span className="mt-2 pl-5 font-thin">{pinDetail.about}</span>
							</p>
						</Link> 
					</div>
					<h2 className="mt-5 text-1xl">Comments</h2>
					<div className="max-h-370 overflow-y-auto">
						{pinDetail?.comments?.map((item) => (
							<div className="flex gap-2 mt-5 items-start bg-white rounded-lg" key={uuidv4()}>
								<img src={item.postedBy?.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
								<div className="flex flex-col">
									<p className="font-bold pt-1">
										{item.postedBy?.userName}{ }<VerifiedIcon className='text-blue-400 text-xs'/>{ }
										<span className="mt-2 pl-5 font-thin">{item.comment}</span>
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-wrap mt-6 gap-3">
						<Link to={`/user-profile/${context.user?._id}`}>
							<img src={context.user?.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
						</Link>
						<input className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-200" type="text" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
						<button type="button" className="bg-gray-200 blue-gray rounded-full px-4 py-1 selection:text-base outline-none hover:bg-blue-gray-400 hover:text-white" onClick={addComment} >
							{addingComment ? '.....' : 'Send'}
						</button>
					</div>
				</div>
				<div className="absolute top-1/2 z-0 left-0 p-2">
							<h1 className='text-[20em] font-extrabold text-white opacity-30'>{pinDetail?.province}</h1>
				</div>
			</div>
		)}
		{pins?.length > 0 && (
			<h2 className="text-center font-bold text-2xl mt-8 mb-4">
			Similar snaps for {pinDetail?.province}
			</h2>
		)}
		{pins ? (
			<MasonryLayout pins={pins} />
		) : (
			<Spinner message="Loading more snaps" />
		)}
		</>
	);
};

export default PinDetail;