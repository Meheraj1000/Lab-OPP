import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {  authContext} from './AuthProvider';

const NavBar = () => {
    const links=<>
    <NavLink><li className='text-white'><a>Home</a></li></NavLink>
    <NavLink><li className='text-white'><a></a></li></NavLink>
    <NavLink><li className='text-white'><a>Home</a></li></NavLink>
    <NavLink><li className='text-white'><a>Home</a></li></NavLink>
    </>
     const {user,handelLogOut}=useContext(authContext);
    return (
        <div className="navbar bg-[#034C53] shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
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
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end">
  {user?.email ? (
                    <div className="flex justify-center items-center gap-3">
                        <div><img className="w-7 h-7 rounded-full" src={user.photoURL} alt="" /></div>
                        <button onClick={handelLogOut} className="btn">LogOut</button>
                    </div>) :
                    (<NavLink to='/login'><button className="btn btn-sm">Login Now</button></NavLink>)}
                
  </div>
</div>
    );
};

export default NavBar;