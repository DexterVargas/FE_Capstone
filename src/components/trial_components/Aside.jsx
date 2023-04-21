import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/constants';
import { v4 as uuidv4 } from 'uuid';


import ExploreIcon from '@mui/icons-material/Explore';
import MapIcon from '@mui/icons-material/Map';

const islandsData = [{title: 'Luzon', icon: ExploreIcon},
                    {title: 'Visayas', icon: ExploreIcon},
                    {title: 'Mindanao', icon: ExploreIcon},
                    ];
const places = [{title: 'Manila', icon: MapIcon},
                {title: 'Boracay', icon: MapIcon},
                {title: 'Batangas', icon: MapIcon},
                {title: 'Davao', icon: MapIcon},
                {title: 'Cebu', icon: MapIcon},
                {title: 'Bicol', icon: MapIcon},
                {title: 'Ilocos Norte', icon: MapIcon},
                ];

const Aside = () => {
    return (
        <div className='max-w-[1640px] mx-auto flex justify-between p-4 items-start'>
            <aside className="w-64 min-w-[300px] mx-2 " aria-label="Sidebar">
                <div className="px-3 py-4 h-screen overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2">
                        <h2 className='font-bold text-blue-gray-900'>Islands</h2>
                        <hr />
                        {islandsData.map(({ title , icon}) => { 
							return(
                            <li key={uuidv4()} className='group text-gray-900 rounded-lg hover:bg-blue-gray-500 hover:text-white cursor-pointer'>
                                <Link to="#" className="flex items-center p-2 text-base font-normal ">
                                {React.createElement(icon, { className:' group-hover:rotate-[-45deg] duration-300'}) }
                                    <span className="ml-3">{title}</span>
                                </Link>
                            </li>)})}
                      
                        <h2 className='font-bold text-blue-gray-900'>Cities | Provinces</h2>  
                        <hr />
                        {places.map(({ title , icon}) => { 
							return(
                            <li key={uuidv4()} className='group text-gray-900 rounded-lg hover:bg-blue-gray-500 hover:text-white cursor-pointer'>
                                <Link to="#" className="flex items-center p-2 text-base font-normal ">
                                {React.createElement(icon, { className:' group-hover:rotate-[-45deg] duration-300'}) }
                                    <span className="ml-3">{title}</span>
                                </Link>
                            </li>)})}
                    </ul>
                </div>
            </aside>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2021/05/bjyth8-e1621332696105.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2021/05/khjnw5-e1621332259769.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2021/05/palawan-coron-island-kayangan-lake-elevated-view-from-one-of-the-limestone-cliffs-dy8yty.jpg" alt=""/>
                    </div>
                
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2015/04/shutterstock_627323633-by-tommy-brtek.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2018/04/shutterstock_425002612.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2021/05/w1nrye-e1621332365478.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2021/03/2b08bnw-e1624963086372.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2022/11/carla-cervantes-p-kh3o4gwe8-unsplash.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2022/11/christian-mercado-p8auqksnsd8-unsplash.jpg" alt=""/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2021/03/wa76e2-e1616427477524.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2022/11/hitoshi-namura-hufxmufnjnq-unsplash.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2021/03/r22xpj-e1616428059477-1.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2021/03/m27mg0-e1616428180629.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.traveltriangle.com/blog/wp-content/uploads/2018/08/Manila-Cathedral.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://assets.traveltriangle.com/blog/wp-content/uploads/2018/08/Rizal-Park.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://assets.traveltriangle.com/blog/wp-content/uploads/2018/08/Fort-Santiago.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://assets.traveltriangle.com/blog/wp-content/uploads/2018/08/San-Agustin-Church.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://assets.traveltriangle.com/blog/wp-content/uploads/2018/08/National-Museum-Complex.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://assets.traveltriangle.com/blog/wp-content/uploads/2018/08/Malacanang-Palace.jpg" alt=""/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://assets.traveltriangle.com/blog/wp-content/uploads/2018/08/Manila-Zoo.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://assets.traveltriangle.com/blog/wp-content/uploads/2019/02/Manila-baywalk.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/51/f4/41/photo6jpg.jpg?w=1200&h=-1&s=1" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2022/11/hitoshi-namura-hufxmufnjnq-unsplash.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2021/03/r22xpj-e1616428059477-1.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2021/03/m27mg0-e1616428180629.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.traveltriangle.com/blog/wp-content/uploads/2018/08/Manila-Cathedral.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2021/05/khjnw5-e1621332259769.jpg" alt=""/>
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2021/05/palawan-coron-island-kayangan-lake-elevated-view-from-one-of-the-limestone-cliffs-dy8yty.jpg" alt=""/>
                    </div>
                
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="https://img.theculturetrip.com/768x/smart/wp-content/uploads/2015/04/shutterstock_627323633-by-tommy-brtek.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aside