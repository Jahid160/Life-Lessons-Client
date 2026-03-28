import React, { useContext } from "react";
import Navbar from "../Component/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Component/Footer/Footer";
import ThemeToggle from "../Component/ThemeToggle/ThemeToggle";
import About from "../Component/about/About";
import StoryCategories from "../Component/StoryCategories/StoryCategories";
import { ThemeContext } from "../Contexts/ThemeContext";

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="max-w-7xl mx-auto ">
      <Navbar />

      {/* <div
        className={`min-h-screen ${theme === "dark" ? "dark" : ""} 
                   bg-white dark:bg-gray-950 
                   text-gray-900 dark:text-gray-100 transition-colors`}
      ></div> */}

      {/* Content area grows */}
      <main className=" max-w-7xl mx-auto w-full">
        <Outlet />
      </main>


      <Footer />
    </div>
  );
};

export default MainLayout;
