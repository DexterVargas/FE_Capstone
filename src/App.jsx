import { Routes, Route, useNavigate } from 'react-router-dom';
import * as ROUTES from './constants/constants';
import { useEffect } from 'react';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoginByGoogle from './pages/LoginByGoogle';

const App = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/welcome');
	}, []);
	return (
		<Routes>
			<Route exact path={ROUTES.WELCOME} element={<Welcome/>} />
			<Route path={ROUTES.HOME} element={<Home/>} />
			<Route exact path={ROUTES.LOGIN} element={<LoginByGoogle/>} />
			<Route path={ROUTES.NOT_FOUND} element={<NotFound/>} />
		</Routes>
	)
}

export default App