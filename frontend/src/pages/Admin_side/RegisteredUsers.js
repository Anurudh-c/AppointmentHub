import React, { useState,useEffect } from "react";
import NavigationBar from "../../components/Admin_side/AdminNavBar";
import LeftNavBar from "../../components/Admin_side/AdminLeftSideNavBar";
import Swal from "sweetalert2";
import axios from 'axios';

import {
  FiAlignJustify,
  FiCamera,
  FiEdit,
  FiFeather,
  FiMail,
  FiPhone,
  FiSlash,
  FiUnlock,
  FiUser,
} from "react-icons/fi";


const RegisteredUsers = () => {
  const [showComponent, setShowComponent] = useState(true);  // for toggle 
  const [users, setUsers] = useState([]);    // for storig user data from database 


  const handleToggle = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  };

  const fetchUsers = () => {
    // Fetch users data from the backend API
    axios.get('http://127.0.0.1:8000/Admin_side/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Server responded with error:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      });
  };

  useEffect(() => {
    // Fetch users data initially
    fetchUsers();
  }, []);


    const handleBlockUser = (userId) => {
      // Send a request to the backend to update the user's is_active status to false (blocked)
      axios.put(`http://127.0.0.1:8000/Admin_side/users/block/${userId}/`, { is_active: false })
        .then(response => {
          // Handle successful response, e.g., show a success message or update the user list
          console.log("User blocked!");
          fetchUsers();



        })
        .catch(error => {
          // Handle error, e.g., show an error message
          console.error('Error blocking user:', error.message);
        });
    };
    const handleUnBlockUser = (userId) => {
      // Send a request to the backend to update the user's is_active status to true (unblocked)
      axios.put(`http://127.0.0.1:8000/Admin_side/users/unblock/${userId}/`, { is_active: true })
        .then(response => {
          // Handle successful response, e.g., show a success message or update the user list
          console.log("User unblocked!");
          // After unblocking, refetch the users data
          fetchUsers();
        })
        .catch(error => {
          // Handle error, e.g., show an error message
          console.error('Error unblocking user:', error.message);
        });
    };
  
  const UserBlockAlert = (userId) => {
    Swal.fire({
      title: "Confirm Blocking",
      text: "Are you sure you want to block this user?",
      showCancelButton: true,
      confirmButtonText: "Block",
      cancelButtonText: "Cancel",
      didOpen: () => {
        // Get the SweetAlert2 confirm button element
        const confirmButton = document.querySelector(".swal2-confirm");

        // Get the SweetAlert2 cancel button element
        const cancelButton = document.querySelector(".swal2-cancel");

        // Remove the default blue border (if any)
        confirmButton.style.boxShadow = "none";

        // Apply custom styles to the confirm button
        confirmButton.style.padding = "0.2rem 0.8rem"; // Smaller padding
        confirmButton.style.backgroundColor = "#DC2626"; // Red background
        confirmButton.style.color = "#FFFFFF"; // White text color
        confirmButton.style.borderRadius = "0.3rem"; // Smaller rounded corners

        // Apply custom styles to the cancel button
        cancelButton.style.padding = "0.2rem 0.8rem"; // Smaller padding
        cancelButton.style.backgroundColor = "#6B7280"; // Gray background
        cancelButton.style.color = "#FFFFFF"; // White text color
        cancelButton.style.borderRadius = "0.3rem"; // Smaller rounded corners

        // Get the SweetAlert2 dialog container element
        const dialogContainer = Swal.getPopup();

        // Apply custom inline styles directly to the dialog container
        dialogContainer.style.backgroundColor = "#F3E8FF"; // Purple background
        dialogContainer.style.borderRadius = "15px"; // Rounded corners
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Execute the callback function if the user clicks on the confirm button
        handleBlockUser(userId);
      }
    });
  };
  const UserUnBlockAlert = (userId) => {
    Swal.fire({     
    title: "Confirm Unblocking",
    text: "Are you sure you want to unblock this user?",
    showCancelButton: true,
    confirmButtonText: "Unblock",
    cancelButtonText: "Cancel",
    didOpen: () => {
      // Get the SweetAlert2 confirm button element
      const confirmButton = document.querySelector(".swal2-confirm");

      // Get the SweetAlert2 cancel button element
      const cancelButton = document.querySelector(".swal2-cancel");

      // Remove the default blue border (if any)
      confirmButton.style.boxShadow = "none";

      // Apply custom styles to the confirm button
      confirmButton.style.padding = "0.2rem 0.9rem"; // Smaller padding
      confirmButton.style.backgroundColor = "#10B981"; // Green background
      confirmButton.style.color = "#FFFFFF"; // White text color
      confirmButton.style.borderRadius = "0.3rem"; // Smaller rounded corners

      // Apply custom styles to the cancel button
      cancelButton.style.padding = "0.2rem 0.8rem"; // Smaller padding
      cancelButton.style.backgroundColor = "#6B7280"; // Gray background
      cancelButton.style.color = "#FFFFFF"; // White text color
      cancelButton.style.borderRadius = "0.3rem"; // Smaller rounded corners

      // Get the SweetAlert2 dialog container element
      const dialogContainer = Swal.getPopup();

      // Apply custom inline styles directly to the dialog container
      dialogContainer.style.backgroundColor = "#F3E8FF"; // Purple background
      dialogContainer.style.borderRadius = "15px"; // Rounded corners
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Execute the callback function if the user clicks on the confirm button
      handleUnBlockUser(userId);
    }
  });
};

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
              {/* <h1 className="text-xl  ml-7 flex justify-start items-center text-purple-400 text-center tracking-wide leading-tight"> */}
              Registered Users
            </h1>
          </div>

          <div className="my-4 bg-purple-100 p-4 md:p-6 shadow-md rounded-lg max-w-full overflow-x-auto">
            <table className="w-full ">
              {/* Table Head */}
              <thead>
                <tr className="bg-purple-800 text-white">
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiFeather className="inline-block mr-1" /> Name
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiCamera className="inline-block mr-1" /> Image
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiMail className="inline-block mr-1" /> Email
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiPhone className="inline-block mr-1" />
                    Phone Number
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiEdit className="inline-block mr-1" />
                    Actions
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-purple-100 ">
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {user.username}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                      {/* Conditionally display user image or default Feather icon */}
                      {user.profile_pic ? (
                        <img
                          src={user.profile_pic}
                          alt={user.username}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <FiUser className="h-8 w-8 text-gray-500" />
                      )}
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {user.email}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {user.phone_number}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      {user.is_active ? (
                      <button
                        className="bg-red-700 hover:bg-red-900 text-white py-1 px-2 rounded w-full md:w-auto"
                        onClick={()=>UserBlockAlert(user.id)}
                      >
                        <FiSlash className="inline-block mr-1" />
                        Block
                      </button> 
                     ) : ( 
                      <button
                          className="border bg-green-700 hover:bg-green-900 text-white py-1 px-2 rounded w-full md:w-auto"
                           onClick={()=>UserUnBlockAlert(user.id)}
                        >
                          <FiUnlock className="inline-block mr-1" />
                          Unblock
                        </button>
                      )}
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
