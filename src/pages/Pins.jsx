import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';


const Pins = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div>
			<div className="bg-gray-50">
				<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
			</div>
			<div className="h-full">
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route exact path="/*" element={<Feed />} />
					<Route path="/explore/:categoryId" element={<Feed />} />
					<Route path="/pin-detail/:pinId" element={<PinDetail />} />
					<Route path="/create-pin" element={<CreatePin />} />
					<Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
				</Routes>
			</div>
		</div>
	);
};

export default Pins;