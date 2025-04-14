import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from './AuthProvider';

const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, handelLogOut } = useContext(authContext);

  const links = (
    <>
      <NavLink to="createQuiz">
        <li className="text-white">
          <a>CreateQuiz</a>
        </li>
      </NavLink>
      <NavLink to="attendQuiz">
        <li className="text-white">
          <a>AttendQuiz</a>
        </li>
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-[#034C53] shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-white text-xl">QUIZ APP</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-3.5">
        {user?.email ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center focus:outline-none">
              <img
                className="w-8 h-8 rounded-full border border-white"
                src={user.photoURL}
                alt="User Avatar"
              />
            </button>

            {/* Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-xl bg-white p-5 shadow-2xl text-gray-800">
                <div className="flex flex-col items-center text-center">
                  <img
                    className="w-16 h-16 rounded-full mb-2"
                    src={user.photoURL}
                    alt="Profile"
                  />
                  <p className="font-semibold text-lg">
                    Hi, {user.displayName || 'User'}!
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                  <button className="text-sm text-blue-600 mt-2 hover:underline">
                    Manage your Account
                  </button>
                </div>

                {/* Quiz Summary Card */}
                <div className="mt-5 border-t pt-4 text-sm">
                  <div className="bg-[#F0F4F8] p-4 rounded-xl shadow-inner mb-4">
                    <h3 className="text-md font-bold text-[#034C53] mb-2">
                      🎯 Quiz Summary
                    </h3>
                    <p>
                      <span className="font-semibold">Topic:</span> JavaScript Basics
                    </p>
                    <p>
                      <span className="font-semibold">Score:</span> 8/10
                    </p>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handelLogOut}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white w-full">
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <button className="btn btn-sm">Login Now</button>
          </NavLink>
        )}
          <div>
         <button
                    onClick={handelLogOut}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white w-full">
                    Log Out
                  </button>
      </div>
      </div>
    
    </div>
  );
};

export default NavBar;
