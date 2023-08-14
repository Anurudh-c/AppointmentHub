import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiUserCheck, FiCalendar, FiMapPin, FiList } from 'react-icons/fi';
import { useAuthContext } from "../../pages/AuthContext"; // Import the custom hook useAuthContext to access the AuthContext data


const LeftNavBar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isFirstClick, setIsFirstClick] = useState(true);
    // Destructure the data and functions from the AuthContext using the useAuthContext hook
    const {
      accessToken,
      refreshToken,
      userRole,
      handleLogin,
      handleLogout,
      email,
      name,

    } = useAuthContext();

  

  useEffect(() => {
    if (isFirstClick) {
      // Change link color on the first single click
      setIsFirstClick(false);
      // Set the activeLink state to the current link on first single click
      const path = window.location.pathname;
      setActiveLink(path);
    }
  }, [isFirstClick]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex-shrink-0 bg-purple-950 text-white h-screen md:h-auto md:min-h-screen shadow-lg">
      <div className="bg-purple-900 text-white p-3 flex justify-between items-center shadow-lg">
      {/* <p className="px-4 py-2">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}'s Dashboard</p> */}
      <p className="px-4 py-2"> Admin's Dashboard</p>
      </div>
      <nav className="py-4">
        {/*  Navigation links  */}
        <Link
          to="/Admin/Dashboard"
          onClick={() => handleLinkClick('/Admin/Dashboard')}
          className={`block py-2 px-4 hover:bg-gray-400 ${
            activeLink === '/Admin/Dashboard' ? 'bg-gray-400' : ''
          }`}
        >
          <FiHome className="inline-block mr-2" /> Dashboard
        </Link>
        <Link
          to="/Admin/RegisteredUsers"
          onClick={() => handleLinkClick('/Admin/RegisteredUsers')}
          className={`block py-2 px-4 hover:bg-gray-400 ${
            activeLink === '/Admin/RegisteredUsers' ? 'bg-gray-400' : ''
          }`}
        >
          <FiUser className="inline-block mr-2" /> Registered Users
        </Link>
        <Link
          to="/Admin/RegisteredProfessionals"
          onClick={() => handleLinkClick('/Admin/RegisteredProfessionals')}
          className={`block py-2 px-4 hover:bg-gray-400 ${
            activeLink === '/Admin/RegisteredProfessionals' ? 'bg-gray-400' : ''
          }`}
        >
          <FiUserCheck className="inline-block mr-2" /> Registered Professionals
        </Link>
        <Link
          to="/Admin/BookingDetails"
          onClick={() => handleLinkClick('/Admin/BookingDetails')}
          className={`block py-2 px-4 hover:bg-gray-400 ${
            activeLink === '/Admin/BookingDetails' ? 'bg-gray-400' : ''
          }`}
        >
          <FiCalendar className="inline-block mr-2" /> Booking Details
        </Link>
        <Link
          to="/Admin/ServiceLocation"
          onClick={() => handleLinkClick('/Admin/ServiceLocation')}
          className={`block py-2 px-4 hover:bg-gray-400 ${
            activeLink === '/Admin/ServiceLocation' ? 'bg-gray-400' : ''
          }`}
        >
          <FiMapPin className="inline-block mr-2" /> Service Locations
        </Link>
        <Link
          to="/Admin/ProfessionalCategories"
          onClick={() => handleLinkClick('/Admin/ProfessionalCategories')}
          className={`block py-2 px-4 hover:bg-gray-400 ${
            activeLink === '/Admin/ProfessionalCategories' ? 'bg-gray-400' : ''
          }`}
        >
          <FiList className="inline-block mr-2" /> Professional Categories
        </Link>
      </nav>
    </div>
  );
};

export default LeftNavBar;
