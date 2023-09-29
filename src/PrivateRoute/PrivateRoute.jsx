import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading';
// import useAuth from '../Hooks/useAuth';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <Loading></Loading>
            </div>
        );
    }

    if (!user) {
        // User is not logged in, redirect to login page
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
    }

    return children;
};

export default PrivateRoute;
