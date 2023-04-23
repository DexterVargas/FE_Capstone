import React, { useState } from 'react'
import scriptImport from '../hooks/scriptImport';
import { Feed } from '../components';

const Explore = () => {
    const [mapValue, setMapValue] = useState(''); 
    scriptImport('./src/library/countrymap.js')
	scriptImport('./src/library/mapdata.js')

    const handleClick = () => {
        window.simplemaps_countrymap.hooks.click_state = (id)=> {
		setMapValue(window.simplemaps_countrymap_mapdata.state_specific[id]?.name);
	        }
    }
  return (
    <div  className='hidden md:block w-full h-screen'>
        <div className='mx-auto flex flex-col justify-center items-center h-full px-4 md:flex-row bg-white/80'>
            <div id='map' onClick={handleClick} ></div>
            <div className='w-full min-h-fit'>
                { mapValue && <Feed interactiveMap={mapValue}/> } 
                { !mapValue && 
                    <div className='flex flex-col justify-center h-full pl-0 md:pl-60'>
						<h2 className='text-4xl sm:text-7xl font-bold text-blue-gray-400'>Explore</h2>
						<h3 className='text-4xl sm:text-7xl font-bold text-teal-400' >Philippines</h3>
						<p className='my-2 mb-4 text-blue-gray-900 text-lg '>Attractions, Activities, Food, Culture, #MoreFunAwaits. Click the map to discover PH's finest. #ItsMoreFunInThePhilippines</p>
					</div>}
            </div>
        </div>
    </div>

  )
}

export default Explore