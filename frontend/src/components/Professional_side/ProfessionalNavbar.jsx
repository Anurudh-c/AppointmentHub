import React from 'react';
import { FiLogOut, FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../pages/AuthContext"; //For logout

const NavigationBar = () => {
  const { handleLogout } = useAuthContext();
  return (
    <nav className="bg-indigo-950 text-white p-4 flex flex-wrap justify-between items-center shadow-lg">
      <div className="flex items-center mt-2 md:mt-0"></div>
      <div>
        <Link to ="/Professional/Profile" className="text-white hover:text-gray-400 px-2 md:px-4 ml-3 mt-3 md:mt-0">
        <FiUser className="inline-block mr-1" />Manage Profile</Link>
        <button
          className="px-2 py-1 bg-indigo-800 text-gray-200 rounded ml-3 md:ml-6 mt-3 md:mt-0  transition-colors duration-300 hover:bg-indigo-600"
          onClick={handleLogout}><FiLogOut className="inline-block mr-1" />Logout</button>
      </div>
    </nav>
  );
};

export default NavigationBar;
