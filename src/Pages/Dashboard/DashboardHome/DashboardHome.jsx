import React from 'react';


import AdminDashboardHome from './AdminDashboardHome';


import useRole from '../../../Hooks/useRole';
import Loading from '../../../Component/Loading/Loading';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;