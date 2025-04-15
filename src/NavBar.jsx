import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { authContext } from './AuthProvider';

const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, handelLogOut } = useContext(authContext);
  const [userHasTakenQuiz, setUserHasTakenQuiz] = useState(true);
  const [userRank, setUserRank] = useState(12);
  const [userProfilePic, setUserProfilePic] = useState('/images/user123.jpg');
  const [userName, setUserName] = useState('Alex Johnson');
  
  return (
    <div className="navbar bg-[#D1FAE5] shadow-sm px-4">
      {/* Logo + Brand Name */}
      <div className="navbar-start flex items-center gap-2">
      <img src="/src/assets/images.jpeg" alt="Quiz" className="w-6 h-6 bg-[#D1FAE5]" />

        <NavLink to="/" className="text-xl font-semibold text-[#034C53]">
          QuizApp
        </NavLink>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex gap-6">
        {/* Trivia Dropdown */}
       

        {/* Quiz Dropdown */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="cursor-pointer font-medium text-gray-700">
            Quiz ▼
          </label>
          <ul tabIndex={0} className="menu dropdown-content bg-white rounded-box w-40 mt-2 shadow text-sm">
            <li><NavLink to="/createQuiz">Create Quiz</NavLink></li>
            <li><NavLink to="/attendQuiz">Attend Quiz</NavLink></li>
          </ul>
        </div>

        {/* Leaderboard Dropdown */}
        <div className="dropdown dropdown-hover">
  <label tabIndex={0} className="cursor-pointer font-medium text-gray-700">
    Rankboard ▼
  </label>
  <ul tabIndex={0} className="menu dropdown-content bg-white rounded-box w-56 mt-2 shadow text-sm">    {userHasTakenQuiz && (
      <>
        <li className="menu-title">Your Rank</li>
        <li className="flex flex-col items-start px-4 py-2">
          <span className="text-xs text-gray-500">Rank #{userRank}</span>
          <div className="flex items-center gap-2 mt-1">
            <img src={userProfilePic} alt="Your Profile" className="w-6 h-6 rounded-full" />
            <span>{userName}</span>
          </div>
          <li>
  <NavLink 
    to="/leaderboard" 
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
  >
    Leader Board
  </NavLink>
</li>


        </li>
      </>
    )}
  </ul>
</div>

      </div>

      {/* Right Side */}
      <div className="navbar-end gap-4">
        {user?.email ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                className="w-8 h-8 rounded-full border border-gray-300"
                src={user.photoURL}
                alt="User Avatar"
              />
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
                    onClick={handelLogOut}
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
