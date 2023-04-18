import { lazy, Suspense } from 'react'
import { Routes,Route } from 'react-router-dom';

//https://getform.io/

import NavbarComp from './components/NavbarComp';
import * as ROUTES from './constants/routes';

import FirebaseAuthListener from './hooks/FirebaseAuthListener';
import UserContext from './context/user';

const Home = lazy(() => import('./pages/Home'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
	const { user } = FirebaseAuthListener();
	return (
		<UserContext.Provider value={{ user }}>
			<NavbarComp />
			<Suspense fallback = {<p>Loading data....Please wait..</p>}>
				<Routes>
					<Route exact path={ROUTES.HOME} element={<Home/>} />
					<Route exact path={ROUTES.LOGIN} element={<Login/>} />
					<Route exact path={ROUTES.SIGN_UP} element={<Signup/>} />
					<Route path={ROUTES.NOT_FOUND} element={<NotFound/>} />
				</Routes>
			</Suspense>
		</UserContext.Provider>
	)
}

export default App
