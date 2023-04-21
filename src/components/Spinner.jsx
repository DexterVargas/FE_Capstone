import React from 'react';
import {Circles} from 'react-loader-spinner';

const Spinner = ({ message }) => {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full">

		<Circles
			height={50}
			width={200}
			color="#00BFFF"
			wrapperStyle={{color:"#00BFFF"}}
			wrapperClass="m-5"
			visible={true}
		/>

		<p className="text-lg text-center px-2">{message}</p>
		</div>
	);
}

export default Spinner;