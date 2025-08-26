import { Routes, Route, useNavigate } from 'react-router-dom';
import * as ROUTES from './constants/constants';
import { useEffect, useState } from 'react';
import Welcome from './pages/Welcome';
import LoginByGoogle from './pages/LoginByGoogle';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import scriptImport from './hooks/scriptImport';

const App = () => {
	const [welcome, setWelcome] = useState(false);
	const navigate = useNavigate();

	scriptImport('./src/library/countrymap.js')
	scriptImport('./src/library/mapdata.js')

	useEffect(() => {
		const userInfo = localStorage.getItem('AdventuSnapUserAuth') !== 'undefined' ? JSON.parse(localStorage.getItem('AdventuSnapUserAuth')) : localStorage.clear();
		if (!userInfo) {
			navigate('/welcome');
		}
	}, []);

	return (
		<Routes>
			{/* <Route exact path={ROUTES.LOGIN} element={<LoginByGoogle/>} /> */}
			{/* <Route exact path={ROUTES.WELCOME} element={<Welcome/>} /> */}
			<Route path={ROUTES.HOME} element={<Home/>} />
			<Route path={ROUTES.NOT_FOUND} element={<NotFound/>} />
		</Routes>
	)
}

export default App