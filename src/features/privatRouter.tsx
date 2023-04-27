import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    const auth = localStorage.getItem('isAuth');
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export { PrivateRoute }