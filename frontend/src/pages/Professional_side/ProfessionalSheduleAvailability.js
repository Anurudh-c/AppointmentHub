import React, { useState } from "react";
import NavigationBar from '../../components/Professional_side/ProfessionalNavbar';
import LeftNavBar from '../../components/Professional_side/ProfessionalLeftSideNavbar';
import { FiAlignJustify } from 'react-icons/fi';
import axios from 'axios';


const  ProfessionalSheduleAvailability=()=> {
    const [showComponent, setShowComponent] = useState(true);
    const user_email = localStorage.getItem("user_email"); // To pass in request
    const [formData, setFormData] = useState({
      // email:'',
      date: '',
      start_time: '',
      end_time: '',
    });

    const handleToggle = () => {
      setShowComponent((prevShowComponent) => !prevShowComponent);
    };


  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData,"fffffffffffffffffffffff");
      const updatedFormData = {
        ...formData,
        email: user_email,
      };

  
      // Perform your POST request here using Fetch, Axios, or any other library
      // For example, using Fetch API
      axios
      .post('http://127.0.0.1:8000/professional/availability/', updatedFormData)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
        console.log(formData,"fffffffffffffffffffffff");
        // Handle success or any other logic here
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        // Handle error or any other logic here
      });
  };
    
  
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





            <div className="bg-indigo-100 shadow-lg p-4 rounded-lg ml-8 mr-8 mt-8">
      <h2 className="text-xl font-bold mb-4">Schedule Availability</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 ml-4 mr-4">
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            name="date"

            type="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 ml-4 mr-4">
          <label className="block text-sm font-medium text-gray-700">Start Time:</label>
          <input
            name="start_time"
            type="time"
            value={formData.start_time}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 ml-4 mr-4">
          <label className="block text-sm font-medium text-gray-700">End Time:</label>
          <input
            name="end_time"

            type="time"
            value={formData.end_time}
            onChange={handleChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button type="submit" className="bg-indigo-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onSubmit={handleSubmit}
        >
          Save Availability
        </button>
      </form>
    </div>













        </div>
      </section>

      {/* <Footer /> */}
      </div>
    </div>

    </div>
  )
}

export default ProfessionalSheduleAvailability
