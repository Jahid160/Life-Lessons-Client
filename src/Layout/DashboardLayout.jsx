import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
// আইকন ইম্পোর্ট করা হলো
import { FiMenu, FiX } from "react-icons/fi"; 
import { TiHomeOutline } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAddCircle, MdManageAccounts, MdReportGmailerrorred } from "react-icons/md";
import { FaBookReader, FaRegBookmark } from 'react-icons/fa';
import { SiManageiq } from "react-icons/si";
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import Logo from '../Component/Logo/Logo';

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold text-sm ${
      isActive
        ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100/50"
        : "text-slate-500 hover:bg-slate-50 hover:text-indigo-500 border border-transparent"
    }`;

  return (
    <div className="drawer lg:drawer-open bg-slate-50/50 min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Mobile Navbar - Hidden on Desktop */}
        <nav className="w-full bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between lg:hidden sticky top-0 z-40 shadow-sm shadow-slate-100/50">
          <div className="flex items-center gap-3">
            {/* Open Sidebar Toggle Icon */}
            <label 
              htmlFor="my-drawer-4" 
              aria-label="open sidebar" 
              className="p-2 bg-slate-50 text-slate-500 rounded-xl cursor-pointer hover:bg-indigo-50 hover:text-indigo-500 transition-colors"
            >
              <FiMenu size={22} />
            </label>
            <span className="font-bold text-slate-600 text-lg">Dashboard</span>
          </div>
          
          <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center font-bold border-2 border-white shadow-sm">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="w-full max-w-[1600px] p-4 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay backdrop-blur-sm bg-slate-600/10"></label>
        <div className="flex flex-col w-72 min-h-full bg-white border-r border-slate-100 px-6 py-6 shadow-2xl shadow-slate-200/20 lg:shadow-none text-slate-600 overflow-y-auto">
          
          {/* Logo & Close Icon Section */}
          <div className="mb-8 pl-2 flex items-center justify-between">
            <Link to={'/'}>
              <Logo />
            </Link>
            
            {/* Close Sidebar Toggle Icon (Mobile Only) */}
            <label 
              htmlFor="my-drawer-4" 
              aria-label="close sidebar" 
              className="lg:hidden p-2 bg-slate-50 text-slate-400 rounded-xl cursor-pointer hover:bg-rose-50 hover:text-rose-500 transition-colors"
            >
              <FiX size={20} />
            </label>
          </div>

          {/* Menu Items Container */}
          <ul className="flex flex-col gap-2 flex-grow">
            <li>
              <NavLink to={'/dashboard'} end className={navLinkStyle}>
                <TiHomeOutline size={20} />
                <span>Homepage</span>
              </NavLink>
            </li>

            <div className="mt-6 mb-2 pl-4 text-[10px] font-extrabold text-slate-300 uppercase tracking-wider">
              User Menu
            </div>

            <li>
              <NavLink to={'add-lesson'} className={navLinkStyle}>
                <MdAddCircle size={20} />
                <span>Add Lesson</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={'my-lessons'} className={navLinkStyle}>
                <FaBookReader size={18} />
                <span>My Lessons</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={'my-favorites'} className={navLinkStyle}>
                <FaRegBookmark size={18} />
                <span>My Favorites</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`profile/${user?.email}`} className={navLinkStyle}>
                <CgProfile size={20} />
                <span>My Profile</span>
              </NavLink>
            </li>

            {/* Admin Section */}
            {role === 'admin' && (
              <>
                <div className="mt-6 mb-2 pl-4 text-[10px] font-extrabold text-indigo-300 uppercase tracking-wider">
                  Admin Controls
                </div>
                <li>
                  <NavLink to={'admin/manage-users'} className={navLinkStyle}>
                    <MdManageAccounts size={20} />
                    <span>Manage Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'admin/manage-lessons'} className={navLinkStyle}>
                    <SiManageiq size={18} />
                    <span>Manage Lessons</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'admin/reported-lessons'} className={navLinkStyle}>
                    <MdReportGmailerrorred size={20} />
                    <span>Reported Lessons</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'admin/profile'} className={navLinkStyle}>
                    <GrUserAdmin size={18} />
                    <span>Admin Profile</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Bottom Settings / User Profile */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-2">
            <button className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-indigo-500 transition-all font-semibold text-sm w-full">
              <IoSettingsOutline size={20} />
              <span>Settings</span>
            </button>
            
            <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="h-10 w-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200">
                 {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-600 truncate">{user?.displayName || "User Account"}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;