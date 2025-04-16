import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from './AuthProvider';
import { FaUserCircle } from "react-icons/fa";


const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, handleLogout } = useContext(authContext);
  const [userHasTakenQuiz, setUserHasTakenQuiz] = useState(true);
  const [userRank, setUserRank] = useState(12);
  const [userProfilePic, setUserProfilePic] = useState('/images/user123.jpg');
  const [userName, setUserName] = useState('Alex Johnson');


  return (
    <div className="flex justify-between items-center w-[90%] mx-auto h-[80px]">
      {/* Logo + Brand Name */}
      <NavLink to="/" className="text-xl font-semibold text-[#034C53]">
        QuizApp
      </NavLink>

      {/* Center Menu */}
      <div className='flex flex-1 items-center justify-end gap-4 uppercase me-8 font-semibold' >
        <NavLink className={"hover:text-primary"} to="/createQuiz">Create</NavLink>
        <NavLink className={"hover:text-primary"} to="/allQuizs">Attend</NavLink>
      </div>

      {/* Right Side */}
      <div className="">
        {user?.email ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <div>
                <FaUserCircle
                  className="w-8 h-8 rounded-full border border-white bg-white" color='black'
                />
              </div>

            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 z-50 w-80 rounded-xl bg-white p-5 shadow-2xl text-gray-800">
                <div className="flex flex-col items-center text-center">
                  <img className="w-16 h-16 rounded-full mb-2" src={user.photoURL} alt="Profile" />
                  <p className="font-semibold text-lg">
                    Hi, {user.displayName || 'User'}!
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                  <button className="text-sm text-blue-600 mt-2 hover:underline">
                    Manage your Account
                  </button>
                </div>

                <div className="mt-5 border-t pt-4 text-sm flex flex-col items-center">
                  <div className="bg-[#F0F4F8] p-4 rounded-xl shadow-inner w-full text-left mb-4">
                    <h3 className="text-md font-bold text-[#034C53] mb-2">
                      🎯 Quiz Summary
                    </h3>
                    <p><span className="font-semibold">Topic:</span> JavaScript Basics</p>
                    <p><span className="font-semibold">Score:</span> 8/10</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white w-1/2"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login" className="text-gray-800 font-medium">
              Login
            </NavLink>
            <NavLink to="/register">
              <button className="bg-teal-500 text-white rounded-full px-4 py-1 hover:bg-teal-600 transition-all">
                Registration
              </button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
