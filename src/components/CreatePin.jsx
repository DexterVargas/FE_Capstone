import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { provinces } from '../utils/data';
import { client } from '../library/sanity';
import Spinner from './Spinner';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { v4 as uuidv4 } from 'uuid';
import { UserProfileContext } from '../pages/Home';

const CreatePin = () => {
	const context = useContext(UserProfileContext);
	const [title, setTitle] = useState('');
	const [about, setAbout] = useState('');
	const [loading, setLoading] = useState(false);
	const [fields, setFields] = useState();
	const [province, setCategory] = useState(provinces[0].name);
	const [imageAsset, setImageAsset] = useState();
	const [wrongImageType, setWrongImageType] = useState(false);

	const navigate = useNavigate();

	const uploadImage = (e) => {
		const selectedFile = e.target.files[0];
		// uploading asset to sanity
		if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
			setWrongImageType(false);
			setLoading(true);
			client.assets
				.upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
				.then((document) => {
					setImageAsset(document);
					setLoading(false);
				})
				.catch((error) => {
					console.log('Upload failed:', error.message);
				});
		} else {
			setLoading(false);
			setWrongImageType(true);
		}
	};

	const savePin = () => {
		if (title && about  && imageAsset?._id && province) {
			const doc = {
				_type: 'pin',
				title,
				about,
				image: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: imageAsset?._id,
				},
				},
				userId: context.user?._id,
				postedBy: {
				_type: 'postedBy',
				_ref: context.user?._id,
				},
				province,
			};
			client.create(doc).then(() => {
				navigate('/');
			});
		} else {
			setFields(true);

				setTimeout(
					() => {
					setFields(false);
					},
					2000,
				);
			}
		};
	return (
		<div className='bg-white m-2 p-5 sm:w-full md:w-656 rounded-lg mx-auto'>
			<label htmlFor="title" className="mt-3 text-sm leading-6 text-gray-600">Title</label>
			<input type="text" name="title" id="title" autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" placeholder="Snap title" required value={title}
			onChange={(e) => setTitle(e.target.value)}/>
			<label htmlFor="about" className="mt-3 text-sm leading-6 text-gray-600">About</label>
			<textarea id="about" name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" placeholder='Write something about your snap.' required value={about}
			onChange={(e) => setAbout(e.target.value)} ></textarea>
			<div className="mt-2 flex flex-col justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-2">
			{loading && (<Spinner />)}
			{wrongImageType && (<p>It&apos;s wrong file type.</p>)}
			{!imageAsset ? ( <label className='cursor-pointer'>
					<CloudUploadOutlinedIcon className='mr-2'/>
					Upload a file
					<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
					<input type="file" name="upload-image" onChange={uploadImage} className="w-0 h-0" />
				</label>):(
				<div className="relative h-full">
					<img
						src={imageAsset?.url}
						alt="uploaded-pic"
						className="h-full w-full"
						/>
					<button type='button' onClick={() => setImageAsset(null)} className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out">
						<DeleteOutlineOutlinedIcon/>
					</button>
				</div>)}
			</div>
			<label htmlFor="province" className="mt-3 text-sm leading-6 text-gray-600">City / Province</label>
			<select id="province" name="province" autoComplete="province-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-xs sm:text-sm sm:leading-6" 
			value={province} onChange={(e) => { setCategory(e.target.value); console.log(e.target.value)}}>
					{provinces.map((item) => (
						<option key={uuidv4()} className="text-base border-0 outline-none capitalize bg-white text-black " value={item[1]}>
							{item.name}
						</option>
						))}
			</select>
			<div className="mt flex items-center justify-end">
				<button type="button" className="bg-gray-200 blue-gray rounded-full px-4 py-1 mt-1 text-base outline-none hover:bg-blue-gray-400 hover:text-white shadow-sm" onClick={savePin}>Save Snap</button>
			</div>
		</div>
	);
};

export default CreatePin;