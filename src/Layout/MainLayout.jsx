import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import ThemeToggle from '../Component/ThemeToggle/ThemeToggle';
import About from '../Component/about/About';
import StoryCategories from '../Component/StoryCategories/StoryCategories';




const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      
    
      <Navbar />
       

      <div className="p-6">
        <ThemeToggle />
        
      </div>
    

      {/* Content area grows */}
      <main className=" max-w-7xl mx-auto w-full">
        <Outlet />
      </main>


      <Footer />
    </div>
  );
};

export default MainLayout;
