import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';




const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      
    
      <Navbar />
      

      {/* Content area grows */}
      <main className="flex-grow max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

    
      <Footer />
    </div>
  );
};

export default MainLayout;
