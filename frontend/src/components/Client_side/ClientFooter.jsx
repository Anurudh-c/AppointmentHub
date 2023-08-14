import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-4 shadow-md md:shadow-lg lg:shadow-2xl mt-4">
      <div className="container mx-auto flex flex-col md:flex-row md:space-x-10">
        {/* First Section */}
        <div className="text-center md:text-left mb-4 md:mb-0 md:ml-40 mt-4 flex-1">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Middle Section */}
        <div className="text-center md:text-left mt-4 flex-1">
          <h2 className="text-xl font-bold mb-2">Our Services</h2>
          <ul className="space-y-2">
            <li>Online Advocate Consultation</li>
            <li>Online Doctor Booking</li>
            <li>Book Appointment With Architect</li>
          </ul>
        </div>

        {/* Last Section */}
        <div className="text-center md:text-left mt-4 flex-1">
          <h2 className="text-xl font-bold mb-2">Social</h2>
          <ul className="space-y-2">
            <li> <FiFacebook className="inline-block mr-1" />Facebook</li>
            <li> <FiTwitter className="inline-block mr-1" />Twitter</li>
            <li> <FiInstagram className="inline-block mr-1" />Instagram</li>
          </ul>
        </div>
      </div>

      {/* White line */}
      <div className="bg-white h-px w-4/5 my-4 mx-auto "></div>

      {/* Copyright */}
      <p className="text-center mb-8">© 2023 AppointmentHub Private Ltd. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
