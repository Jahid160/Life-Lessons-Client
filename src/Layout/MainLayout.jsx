import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';




const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      
    
      <Navbar />
      

      {/* Content area grows */}
      <div className="grow text-black">
        <Outlet />
      </div>

    
      <Footer />
    </div>
  );
};

export default MainLayout;
