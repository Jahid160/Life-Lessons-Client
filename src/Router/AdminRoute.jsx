import React from 'react';




import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Component/Loading/Loading';
import Error404Page from '../Component/ErrorPage/Error404Page';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Error404Page></Error404Page>
    }

    return children;
};

export default AdminRoute;