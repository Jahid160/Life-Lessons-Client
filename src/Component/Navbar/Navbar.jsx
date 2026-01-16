import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/life lessons.png";
import useAuth from "../../Hooks/useAuth";

import useUserByEmail from "../../Hooks/useUserByEmail ";
import Loading from "../Loading/Loading";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user?.photoURL);
  const { userData, isLoading, refetch } = useUserByEmail();

  if (isLoading) return <Loading></Loading>;

  console.log(userData);
  const isPremium =
    userData?.isPremium === false || userData?.isPremium === "false";

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/life-lessons"}>Public Lessons</NavLink>
      </li>
      {isPremium && (
        <li>
          <NavLink to={"premium-upgrade"}>PremiumUpgrade</NavLink>
        </li>
      )}
      {userData?.isPremium == true && <li>⭐</li>}

      <li>
        <NavLink to={"/contact"}>Contact</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={"/dashboard/my-favorites"}>Favorites</NavLink>
          </li>
          <li>
            <NavLink to={"dashboard/add-lesson"}>Add Lesson</NavLink>
          </li>
          <li>
            <NavLink to={"dashboard/my-lessons"}>My Lessons</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* LEFT SIDE */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  rounded-box z-10 mt-3 w-52 p-2 shadow bg-green-300 text-gray-600 font-semibold"
          >
            {links}
          </ul>
        </div>

        <img className="h-20 w-20" src={logo} alt="Logo" />
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 bg-green-300 text-gray-600 font-semibold">
          {links}
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user?.photoURL} />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content  rounded-box w-52 p-2 shadow bg-green-400 font-semibold"
            >
              <li>
                <Link>{user?.displayName}</Link>
              </li>
              <li className="my-4">
                <Link to={`/dashboard/profile/${user?.email}`}>Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-error text-white w-full my-4"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
