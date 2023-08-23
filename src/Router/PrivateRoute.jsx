import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Shared/Loading';
import useAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (  // Add the missing return statement here
            <div>
                <Loading></Loading>
            </div>
        );
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    } else {
        return children;
    }


};

export default PrivateRoute;