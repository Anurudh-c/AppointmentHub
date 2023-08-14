import React, { useState,useEffect } from "react";
import axios from "axios";
import NavigationBar from "../../components/Admin_side/AdminNavBar";
import LeftNavBar from "../../components/Admin_side/AdminLeftSideNavBar";


import {
  FiAlignJustify,
  FiCalendar,
  FiDollarSign,
  FiEdit,
  FiFeather,
  FiGitMerge,
  FiList,
  FiMail,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";
const RegisteredUsers = () => {
  const [showComponent, setShowComponent] = useState(true);
  const [bookings, setBookings] = useState([]);


  const handleToggle = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  };

  const fetchBookings = () => {
    axios.get('http://127.0.0.1:8000/Admin_side/bookings/') // Use the correct API endpoint for bookings
      .then(response => {
        setBookings(response.data);
        console.log(response.data,"dataaaaaaaaaaaaaaaaaa");
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);



  return (
    <div className="flex flex-col md:flex-row">
      {showComponent && <LeftNavBar />}{" "}
      {/* Left bar Navbar based on togle condition  */}
      <div className="flex-1 bg-gray-100 md:min-h-screen flex flex-col">
        <NavigationBar />
        {/* This places the NavigationBar component at the top */}
        <section className="bg-white w-full py-8  flex-1">
          <div className="container mx-auto text-center ">
            <button
              onClick={handleToggle}
              className="flex justify-start items-center hover:bg-gray-400 hover:text-gray-600 px-2 py-1 rounded"
            >
              {showComponent ? (
                <FiAlignJustify className="inline-block mr-1 text-xl" />
              ) : (
                <FiAlignJustify className="inline-block mr-1 text-xl" />
              )}
            </button>
            <h1 className=" text-xl ml-7 flex justify-start items-center">

              Booking Details
            </h1>
          </div>

          <div className="my-4 bg-purple-100 p-4 md:p-6 shadow-md rounded-lg max-w-full overflow-x-auto">
            <table className="w-full ">
              {/* Table Head */}
              <thead>
                <tr className="bg-purple-800 text-white">
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiFeather className="inline-block mr-1" /> User Name
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiUserCheck className="inline-block mr-1" /> Professional's Name
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiList className="inline-block mr-1" /> Booking Category
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiCalendar className="inline-block mr-1" />
                    Date&Time                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiDollarSign className="inline-block mr-1" />
                   Payment Status
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-purple-100 ">
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {booking.user.username}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    {booking.professional.user.username}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {booking.professional.category.name}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {booking.date}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    {booking.payment ? "Completed" : "Pending"}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
export default RegisteredUsers;
