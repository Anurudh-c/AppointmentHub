import React, { useState,useEffect } from "react";
import NavigationBar from "../../components/Admin_side/AdminNavBar";
import LeftNavBar from "../../components/Admin_side/AdminLeftSideNavBar";
import axios from "axios";
import Swal from "sweetalert2";

import {
  FiAlignJustify,
  FiEdit2,
  FiEdit3,
  FiMapPin,
  FiTrash,
  FiTrash2,
} from "react-icons/fi";

const ServiceLocations = () => {
  const [showComponent, setShowComponent] = useState(true); // for toggle
  const [places, setPlaces] = useState([]);

  const handleToggle = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  };

 const fetchLocations =()=>{
        // Fetch places data from the backend API
        axios.get('http://127.0.0.1:8000/Admin_side/locations/')
        .then(response => {
          setPlaces(response.data);
        })
        .catch(error => {
          console.error('Error fetching places:', error);
        });
  }


  useEffect(() => {
    fetchLocations();

  }, []);

  // Function to add a new location
const addLocation = (newLocationName) => {
  // Send a request to the backend API to add the new location
  axios
    .post("http://127.0.0.1:8000/Admin_side/locations/create/", { name: newLocationName })
    .then((response) => {
      console.log("Place created!");
      fetchLocations();


    })
    .catch((error) => {
      // If there is an error during the API call, log the error (you can handle errors differently if needed)
      console.error("Error adding location:", error.message);
    });
};

  const handlePlaceUpdate = (placeId, newName) => {
    // Send a request to the backend to update the place name
    axios
      .put(`http://127.0.0.1:8000/Admin_side/locations/update/${placeId}/`, { name: newName,})
      .then((response) => {
        // Handle successful response, e.g., show a success message or update the locations list
        console.log("Place updated!");
        fetchLocations();
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error updating place:", error);
      });
  };

  const handleDeleteLocation = (locationId) => {
    // Send a request to the backend to delete the location
    axios.delete(`http://127.0.0.1:8000/Admin_side/locations/delete/${locationId}/`)
      .then(response => {
        // Handle successful response, e.g., show a success message or update the location list
        console.log("Location deleted!");
        // After deleting, refetch the locations data
        fetchLocations();
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error deleting location:', error.message);
      });
  };
  
  const handleAddLocation = () => {
    Swal.fire({
      title: "Add New Location",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Add",
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
        // Get the new location from the Swal input field
        const newLocationName = result.value;
        addLocation(newLocationName)

      }
    });
  };
  

  const PlaceEditAlert = (placeId,currentName) => {
    Swal.fire({
      title: "Edit Service Location",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Update",
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
        const newName = result.value; // Get the updated name from Swal input field
        handlePlaceUpdate(placeId, newName); // Call the function to update the place data
      }
    });
  };


  const LocationDeleteAlert = (locationId) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this location?",
      showCancelButton: true,
      confirmButtonText: "Delete",
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
        handleDeleteLocation(locationId);
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
        <div className="container mx-auto text-center flex justify-between items-center">
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
            <button
          className="px-2 py-1 bg-purple-800 text-white rounded md:ml-auto mt-3 md:mt-0 transition-colors duration-300 hover:bg-purple-600 mr-10 shadow-md transition-shadow hover:shadow-lg"
          onClick={()=>handleAddLocation()}
        >
           <FiMapPin className="inline-block mr-1" />Add New Locations
        </button>
          </div>
          <h1 className=" text-xl ml-7 flex justify-start items-center">Service Locations</h1>

          <div className="my-4 bg-purple-100 p-4 md:p-6 shadow-md rounded-lg max-w-full overflow-x-auto">
            <table className="w-full ">
              {/* Table Head */}
              <thead>
                <tr className="bg-purple-800 text-white">
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiMapPin className="inline-block mr-1" /> Service Available Locations
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiEdit3 className="inline-block mr-1" /> Edit The Location
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiTrash2 className="inline-block mr-1" /> Stop The Service
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {places.map((location) => (
                  <tr key={location.id} className="hover:bg-purple-100 ">
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    {location.name}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      <button className="border bg-green-700 hover:bg-green-900 text-white py-1 px-2 rounded w-full md:w-auto"
                        onClick={()=>PlaceEditAlert(location.id, location.name)}
                        >
                        <FiEdit2 className="inline-block mr-1" />
                          Edit
                        </button> 

                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <button
                        className="bg-red-700 hover:bg-red-900 text-white py-1 px-2 rounded w-full md:w-auto"
                        onClick={()=>LocationDeleteAlert(location.id)}
                      >
                      <FiTrash className="inline-block mr-1" />
                        Delete
                      </button>

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
export default ServiceLocations;
