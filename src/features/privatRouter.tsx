import { Navigate, Outlet, useLocation } from 'react-router-dom';


const PrivateRoute = () => {
	const auth = localStorage.getItem('isAuth');
	const { pathname } = useLocation()
	if(!auth && pathname !== '/login') {
		return <Navigate to="/login" />
	}
	if(auth && pathname === '/login') {
		return <Navigate to="/" />
	}

	return <Outlet />;
}

export { PrivateRoute }