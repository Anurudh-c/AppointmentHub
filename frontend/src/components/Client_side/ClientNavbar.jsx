// NavigationBar.js
import React from 'react';
import { useAuthContext } from "../../pages/AuthContext";

const NavigationBar = () => {
  const { handleLogout } = useAuthContext();

  return (
    <nav className="bg-sky-900 text-white p-4 flex justify-between items-center">
      {/* Navigation bar content on the left side */}
      <div>
        {/* Add your navigation links and other elements here */}
        {/* For example: */}
        <a href="/Home" className="text-gray hover:text-gray-400 px-2">
          Home
        </a>
      </div>

      {/* Buttons on the right side */}
      <div>
      <a href="/profile" className="text-gray hover:text-gray-400 px-2 ml-3">
           My Profile
        </a>
        <button
          className="px-2 py-1 bg-sky-800 text-gray rounded ml-3 mr-3  transition-colors duration-300 hover:bg-blue-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
