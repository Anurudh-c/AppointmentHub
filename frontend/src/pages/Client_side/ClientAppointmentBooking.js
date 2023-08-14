import React,{useState,useEffect}from 'react'
import NavigationBar from '../../components/Client_side/ClientNavbar'
import Footer from '../../components/Client_side/ClientFooter'
import {useLocation } from "react-router-dom";
import axios from "axios";
import { DatePicker } from 'antd'; 
import moment from 'moment'; // for datepicker 
import { useNavigate } from "react-router-dom";
import { useCallback } from 'react'; 





 const ClientAppointmentBooking =()=> {

  const location = useLocation();
  const professionalEmail = location.state.email;
  const [professional, setProfessionals] = useState([]); // for displaying the professional details
  const [users, setUsers] = useState([]); // for displaying the user details
  const user_email = localStorage.getItem("user_email"); // To pass in request
  const [availability,setAvailability]=useState([]) //store available date from backend
  const [selectedDate, setSelectedDate] = useState(''); // store selected date 
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]); //for manage time slotes
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const navigate = useNavigate();



  
    useEffect (()=>{
      FetchProfessionalDetails()
      fetchUserDetails()
      fetchAvailability()
      
    },[]);
    

      // Function to fetch the selected professionals  details
      const FetchProfessionalDetails = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/professional/get-professionals/",
            {
              params: {
                email: professionalEmail, // Pass the email retrieved from localStorage as a parameter
              },
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setProfessionals(response.data)
        } catch (error) {
          console.error("Error fetching professional details:", error);
        }
      };
  
  // Function to fetch the logged-in user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/get-user/",
        {
          params: {
            email: user_email, // Pass the email retrieved from localStorage as a parameter
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };

  //Functiion to fetch availability
  const fetchAvailability = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/professional/availability-list/${professionalEmail}/`);
        // Handle the fetched slots data as needed
        console.log(response.data,'availabilityyyyyyyyyyyyy');
        setAvailability(response.data)
        
      } catch (error) {
        console.log(error);
      }
    };
// Availabilty displaying related functions

const handleDateChange = (date) => {
  if (date === null) {
    setSelectedDate(null);
    setAvailableTimeSlots([]); 
  } else {

     setSelectedDate(date); // Update selected date


      // Filter available time slots for the selected date
      const dateStr = date.format('YYYY-MM-DD');
      const timeSlots = availability
        .filter((item) => item.date === dateStr && item.is_available) 
        .map((item) => `${item.start_time} - ${item.end_time}`);
      setAvailableTimeSlots(timeSlots);

  } 
  
};


  const disabledDate = (current) => {
    if (!current || current.isBefore(moment().startOf('day'))) {
      return true; // Disable dates in the past or before today
    }
  
    const dateStr = current.format('YYYY-MM-DD');
    const isAvailable = availability.some((item) => item.date === dateStr && item.is_available);
    return !isAvailable; // Return true to disable if it's not available
  };
  
  const handleSubmit = (e) => {

    e.preventDefault();
    console.log('Button clicked!');
    navigate('/payment',{ state: { users, professional,selectedDate,selectedTimeSlot } })
  };
     
  return (
    <div>
    <NavigationBar/>

    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 mt-10 ml-4">
      {/* First Card - Professional Details */}
      <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md">
        
      <div className="bg-sky-600 text-white text-center  text-xl p-4 rounded-t-lg">
         Appointment With
      </div>
      {professional.map((professional)=>(

        <div className="p-6">

          <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
            <img
              src={`http://127.0.0.1:8000/${professional.user.profile_pic}`}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />

          </div>
          <p className="font-bold text-xl text-center mb-2">{professional.user.username}</p>
          <p className=" text-lg mb-2">{professional.category.name}</p>
          <p className="mb-2">Phone: {professional.user.phone_number}</p>
          <p className="mb-2">Email: {professional.user.email}</p>
          <p className="mb-2">Fee Amount: {professional.fee_amount}</p>
        </div>
        ))}
      </div>

      {/* Second Card - Additional Details (Placeholder) */}
      <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg ml-4 mr-4">
        <div className="p-6">
          {/* First Separate Heading Card */}
          <div className="bg-sky-600 text-white text-center  text-xl p-3 rounded-t-2xl">
          Review Your Details 
          </div>
          <div className="p-6">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-bold">Name:</p>
            <p>{users.username}</p>
            <p className="font-bold">Phone Number:</p>
            <p>{users.phone_number}</p>
          </div>
          <div>
            <p className="font-bold">Email:</p>
            <p>{users.email}</p>
            <p className="font-bold">Address:</p>
            <p>{users.address}</p>
          </div>
        </div>
      </div>

          {/* Second Separate Heading Card */}
          <div className="bg-sky-600 text-white text-center  text-xl mt-4 p-3 rounded-t-2xl mt-4">
          Book Your Appointment
          </div>

      {/* Date Picker */}
      <div className="p-6">
      <div className="flex">
        <div className="mr-4">
          <label className="block font-bold mb-2">Select Date :</label>
          <DatePicker
            disabledDate={disabledDate}
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={moment().toDate()}
            maxDate={moment().add(1, 'year').toDate()}
          />
        </div>
        <div className="flex flex-col ml-20">

        {selectedDate && (
          <div>
            {availableTimeSlots.length > 0 ? (
              <div>
              <h2 className="font-bold mb-2">Available Time Slots:</h2>
            
            {availableTimeSlots.map((slot, index) => (
              <label key={index} className="mb-2 ml-4 ">
                <input
                  type="radio"
                  name="timeSlot"
                  value={slot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                />
                {slot}
              </label>
            ))}

              </div>
            ) : (
              <p>No available time slots for the selected date.</p>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
      {/* Confirm Button */}
      <div className="p-6 flex justify-end">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md mr-4 "   
        onClick={handleSubmit}
        >Confirm</button>
      </div>

        </div>
      </div>
    </div>

   <Footer/>
    </div>
  )
}
export default ClientAppointmentBooking