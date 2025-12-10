import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div>

      authLayout
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;