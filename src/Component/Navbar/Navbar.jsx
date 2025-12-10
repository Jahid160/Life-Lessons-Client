import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/life lessons.png'
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
  const {user,logOut} = useAuth()
  const links = <>
  <li><Link to={'/home'}>Home</Link></li>
  <li><Link>Add Lesson</Link></li>
  <li><Link>My Lessons</Link></li>
  <li><Link>pricing</Link></li>
  <li><Link>Favorites</Link></li>
  
  
  </>

  const handleLogOut = () =>{
    logOut()
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">

  {/* LEFT SIDE */}
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
      >
        {links}
      </ul>
    </div>

    <img className="h-20 w-20" src={logo} alt="Logo" />
  </div>

  {/* CENTER */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">{links}</ul>
  </div>

  {/* RIGHT SIDE */}
  <div className="navbar-end">
    {user ? (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
        >
          <li><Link>Name</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li>
            <button onClick={handleLogOut} className="btn btn-sm btn-error text-white w-full">
              Logout
            </button>
          </li>
        </ul>
      </div>
    ) : (
      <Link to="/login" className="btn">Login</Link>
    )}
  </div>
</div>

  );
};

export default Navbar;