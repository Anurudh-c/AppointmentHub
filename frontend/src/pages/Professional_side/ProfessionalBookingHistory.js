import React, { useState,useEffect } from "react";
import NavigationBar from '../../components/Professional_side/ProfessionalNavbar';
import LeftNavBar from '../../components/Professional_side/ProfessionalLeftSideNavbar';
import axios from "axios";
import { FiAlignJustify, FiCalendar, FiClock, FiDollarSign, FiFeather, FiList, FiUserCheck } from 'react-icons/fi';


const ProfessionalBookingHistory=()=> {
    const [showComponent, setShowComponent] = useState(true);
    const professional_email = localStorage.getItem("user_email"); // To pass in request
    const [bookings, setBookings] = useState([]);



    const handleToggle = () => {
      setShowComponent((prevShowComponent) => !prevShowComponent);
    };


    const FetchBookings = () => {
      axios.get(`http://127.0.0.1:8000/Professional_side/bookinghistory/${professional_email}`,

      {
        // params: {
        //   email: professional_email, // Pass the email retrieved from localStorage as a parameter
        // },
        headers: {
          "Content-Type": "application/json",
        },
      }


      )
         .then(response => {
          setBookings(response.data);
          console.log(response.data,"dataaaaaaaaaaaaaaaaaa");
        })
        .catch(error => {
          console.error('Error fetching bookings:', error);
        });
    };
  
    useEffect(() => {
      console.log(professional_email);
      FetchBookings();
    }, []);
  

  
  return (
    <div>
          <div className="flex flex-col md:flex-row">
    {showComponent && <LeftNavBar />}
    <div className="flex-1 bg-gray-100 md:min-h-screen flex flex-col">
      <NavigationBar />

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

              Booking History
            </h1>
            <div className="my-4 bg-indigo-100 p-4 md:p-6 shadow-md rounded-lg max-w-full overflow-x-auto">
            <table className="w-full ">
              {/* Table Head */}
              <thead>
                <tr className="bg-indigo-800 text-white">
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiFeather className="inline-block mr-1" /> User Name
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiUserCheck className="inline-block mr-1" /> Professional's Name
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                  <FiCalendar className="inline-block mr-1" /> Booking Date
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiClock className="inline-block mr-1" />
                    Time                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiDollarSign className="inline-block mr-1" />
                   Payment Status
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {bookings.map((user) => (
                  <tr key={user.id} className="hover:bg-indigo-100 ">
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {user.username}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    {user.professionalName}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {user.bookingType}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {user.date}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    {user.paymentStatus}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* <Footer /> */}
      </div>
    </div>

    </div>
  )
}

export default ProfessionalBookingHistory