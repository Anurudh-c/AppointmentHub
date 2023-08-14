import React from 'react';
import NavigationBar from '../../components/Client_side/ClientNavbar';
import Footer from '../../components/Client_side/ClientFooter';
import pic from '../../images/aa.jpg';
import pic2    from '../../images/bb.jfif'
import { FiCalendar, FiHome, FiMonitor, FiPhoneCall, FiWifi } from 'react-icons/fi';
import FetchProfessionals from'../../components/Admin_side/ProfessionalList'
import { useNavigate } from "react-router-dom";





const ClientHome = () => {
  const professionals = FetchProfessionals(); //to get professionals data
  const backgroundColors = ['bg-blue-200', 'bg-emerald-200','bg-indigo-200', 'bg-purple-200', 'bg-red-200',  'bg-yellow-200','bg-orange-200','bg-fuchsia-200'];
  const navigate = useNavigate();

  const handleCardClick = (professional) => {
    // Your logic to handle the click event goes here
    console.log("Card clicked:", professional);
  
    // Navigate to the '/view' page with the professional's ID
    navigate(`/view`,{state:{ email: professional.user.email}});
  };

  const handleAppointmentClick = () => {
    navigate('/categories');
  };

  
  
  return (
    <div>
      <NavigationBar />

      {/* Banner Section */}
      <section className="relative bg-white">
        {/* Image */}
        <div className="relative w-full">
          <img
            src={pic}
            alt="Banner"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] over-flow-hidden"
          />
          {/* Appointment Button */}
          <button className="absolute bottom-6 right-4 px-6 py-3 bg-sky-800 text-white rounded-lg shadow-md mr-10"
          onClick={handleAppointmentClick}

          >
            Take Appointment
          </button>

          {/* Question Text Field */}
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 w-3/4 md:w-1/2 bg-transparent border border-gray-300 rounded-lg shadow-md inline-block text-gray">
          OUR TEAM OF PROFESSIONALS HERE TO HELP YOU ANYTIME FIX YOUR APPOINTMENT NOW
          </h1></div>


<div className="bg-slate-200 p-4 rounded-md shadow-lg mb-4 flex justify-center items-center mt-4 ml-4 mr-4">
  {/* Main Card content goes here */}
  {/* For example: */}
  <p>OUR SERVICES</p>
</div>

<div className="bg-neutral-100 p-4 rounded-md shadow-lg flex flex-col md:flex-row md:gap-4 md:justify-center md:mx-auto mt-6 mx-4 mb-6 max-w-screen-w">
  

  {/* Sky Blue Card */}
  <div className="bg-stone-300 p-4 rounded-md shadow-lg w-64 h-44 ml-16 flex flex-col justify-center items-center mt-8 mb-8">
  <FiMonitor size={64} color="gray"className="inline-block mr-2" />
    {/* For example: */}
    <p className="text-gray-800 text-center mt-3">Availability Tracking</p>
  </div>

  {/* Blue Card */}
  <div className="bg-zinc-300 p-4 rounded-md shadow-lg w-64 h-44 ml-16 flex flex-col justify-center items-center mt-8 mb-8">
  <FiCalendar size={64} color="gray"className="inline-block mr-2" />
    {/* For example: */}
    <p className="text-text-gray-800 text-center mt-3">Appointment Management</p>
  </div>

  {/* Pink Card */}
  <div className="bg-neutral-300 p-4 rounded-md shadow-lg w-64 h-44 ml-16 flex flex-col justify-center items-center mt-8 mb-8">
  <FiWifi size={64} color="gray"className="inline-block mr-2" />
    {/* For example: */}
    <p className="text-text-gray-800 text-center mt-3">Online Appointment</p>
  </div>

  {/* Indigo Card */}
  <div className="bg-gray-300 p-4 rounded-md shadow-lg w-64 h-44 ml-16 flex flex-col justify-center items-center mt-8 mb-8">
  <FiPhoneCall size={64} color="gray"className="inline-block mr-2" />
    {/* For example: */}
    <p className="text-text-gray-800 text-center mt-3">Help Desk</p>
  </div>
</div>
        
<div className="bg-slate-200 p-4 rounded-md shadow-lg mb-4 flex justify-center items-center mt-4 ml-4 mr-4">
  {/* Main Card content goes here */}
  {/* For example: */}
  <p>Meet Our Profound Professionals</p>
</div>




<div className="bg-white p-4 rounded-md shadow-2xl flex flex-col md:flex-row md:gap-4 md:justify-center md:mx-auto mt-6 mx-4 mb-6 max-w-screen-w">

<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-4 mb-4">
{professionals.map((professional) => (
      <div
        key={professional.id}
        className={`${backgroundColors[professional.id % backgroundColors.length]} p-4 rounded-md shadow-xl flex flex-wrap justify-between`}
        onClick={() => handleCardClick(professional)}
      
      >

    <div className="flex justify-left  w-full mb-4 ">
      
        <img
          src={professional.user.profile_pic}
          alt="Professional Photo"
          className="w-28 h-28 rounded-full mr-4 shadow-md border-4 border-gray ml-16"
        />
      <p className="font-bold text-lg rounded-md mt-0 mr-10 ml-20">{professional.category?.name}</p>

      </div>
      <div className="flex flex-col ml-7">
          <p className="font-bold text-lg ">{professional.user.username}</p>
          <p className="text-black">Category: {professional.category?.name}</p>
          <p className="text-black">Phone: {professional.user.phone_number}</p>
          <p className="text-gray-800">Address: {professional.user.address}</p>

        </div>

    </div>
  ))}
</div>
</div>
  
      </section>

      <Footer />
    </div>
  );
};

export default ClientHome;
