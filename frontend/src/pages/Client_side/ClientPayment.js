import React,{useState,useEffect}from 'react'
import NavigationBar from '../../components/Client_side/ClientNavbar'
import Footer from '../../components/Client_side/ClientFooter'
import pic from '../../images/bb.jfif'
import {useLocation,useNavigate } from "react-router-dom";
import axios from "axios";



 const  ClientPayment =()=> {
  const location = useLocation();
  const navigate = useNavigate();
  const { users, professional, selectedDate, selectedTimeSlot } = location.state;
  //spliting time 
  const [startTime, endTime] = selectedTimeSlot.split(' - ');

  //  formatting the date to yyyy-mm-dd
  const dateObject = selectedDate ? selectedDate.$d : null;
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const Date = `${year}-${month}-${day}`; // "2023-08-16"

  const [feeAmount, setFeeAmount] = useState(0);
  const [id, setId] = useState(0);


  useEffect(() => {
    // Set feeAmount and id once when the component mounts
    const professionalData = location.state.professional;
    const feeAmount = professionalData[0].fee_amount; 
    const id = professionalData[0].id;
    setFeeAmount(feeAmount);
    setId(id);
  

  }, [location.state.professional]);
  





  const showRazorpay = async () => {
    try {
      const bodyData = new FormData();
      bodyData.append("fee", feeAmount);

      const response = await axios.post(
        `http://127.0.0.1:8000/start_payment/${id}/`,
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const options = {
        key: "rzp_test_5INtJRSgBN8pfL", // Replace with your Razorpay API key
        amount: feeAmount * 100,
        currency: "INR",
        name: "Professional Booking",
        description: "This is the payment for AppointmentHub pvtltd",
        image: "", // Add image URL
        handler: function (response) {
          handlePaymentSuccess(response);

        },
        prefill: {
          name: "User's name",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };


  const handlePaymentSuccess = async (response) => {
    const order_id = response.razorpay_payment_id; // Use razorpay_payment_id as the order ID
    console.log(order_id, "-yyy");
    try {
      const bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));
      bodyData.append("user_id", users.id);
      bodyData.append("id", id);
      bodyData.append("date", Date);
      bodyData.append("start_time", startTime);
      bodyData.append("end_time", endTime);
      bodyData.append("fee", feeAmount);
      bodyData.append("payment", true)


      await axios.post("http://127.0.0.1:8000/handle_payment_success/", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setId("");
      setFeeAmount("");
      navigate("/success", {
        state: {
          user: users.id,
          professional: id,
          date: Date,
          start_time: startTime,
          end_time: endTime,
          amount:feeAmount,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };









return (
<div>
<NavigationBar/>

<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 mt-10 ml-4 mb-24">
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
Appointment Booking Confirmation and Payment 
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-1 md:gap-4">
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
          <div>
            <p className="font-bold">Date:</p>
            <p>{Date}</p>
          </div>
          <div>
            <p className="font-bold">Start Time:</p>
            <p>{startTime}</p>
            <p className="font-bold">End Time:</p>
            <p>{endTime}</p>

          </div>
        </div>
      </div>

  {/* Confirm Button */}
  <div className="p-6 flex justify-end">
    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md mr-4" onClick={showRazorpay}>Payment</button>
  </div>

    </div>
  </div>
</div>

<Footer/>
</div>
)
}

export default ClientPayment