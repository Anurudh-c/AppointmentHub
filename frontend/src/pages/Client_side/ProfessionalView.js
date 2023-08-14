import React , {useState,useEffect} from 'react'
import NavigationBar from '../../components/Client_side/ClientNavbar'
import ClientFooter from '../../components/Client_side/ClientFooter'
import pic from '../../images/aa.jpg';
import pic2 from '../../images/bb.jfif';
import {useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";






 const ProfessionalView=()=> {
  const location = useLocation();
  const professionalEmail = location.state.email;
  const [uploadedImages, setUploadedImages] = useState([]); // for displaying the images
  const lastFourImages = uploadedImages.slice(-4); //for displaying only 4 images
  const [descriptions, setDescriptions] = useState([]); // for display descriptions
  const lastFourdescriptions = descriptions.slice(-6); //for displaying only 6 descriptions
  const [professionals, setProfessionals] = useState([]); // for displaying the images
  const [name, setName] = useState(''); // for displaying the images
  const [profession, setProfession] = useState(''); // for displaying the images
  const [photo, setPhoto] = useState(''); // for displaying the images
  const photoUrl = `http://127.0.0.1:8000/${photo}`;
  const navigate = useNavigate();  


  




useEffect (()=>{

  FetchProfessionalDetails()
  FetchUploadedImages()
  FetchDescriptions()
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
        setName(response.data[0].user.username)
        setProfession(response.data[0].category.name)
        console.log(profession);
        setPhoto(response.data[0].user.profile_pic)
        console.log(photo,"qqqqqqqqqqqqqqqqqqqqqqqq");


        console.log("ttttttttttttttttttttttttttttttttttttt",professionals,"qtqtqt");
        console.log("API Response Data:", response.data); // Log the API response data
      } catch (error) {
        console.error("Error fetching professional details:", error);
      }
    };
  
  // Function to fetch uploaded images
  const FetchUploadedImages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/professional/upload/image/${professionalEmail}/`
      );
      setUploadedImages(response.data);

      console.log(uploadedImages,"paaaaaaaaaaaaaaaaaaaaaaa");
      console.log(response.data, "ttttttttttttt");
    } catch (error) {
      console.error("Error fetching uploaded images:", error.message);
    }
  };

  // Function to fetch uploaded descriptions

  const FetchDescriptions = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/professional/upload/description/${professionalEmail}/`
      );
      setDescriptions(response.data);

    } catch (error) {
      console.error("Error fetching descriptions:", error.message);
    }
  };

const handleAppointmentClcik=()=>{
  console.log("button clicked:");

  navigate(`/booking`,{state:{ email:professionalEmail }});
  


}
  return (
    <div>
      <NavigationBar/>

            {/* Banner Section */}
            <section className="relative bg-white">
  {/* Image */}
  <div className="relative w-full">
    <img
      src={pic}
      alt="Banner"
      className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] over-flow-hidden"
    />

    {/* Text Field Layer */}
    <div className="absolute top-4 left-4">
      <div className="flex justify-left mb-4">

        <img
           src={photoUrl}
          alt="Professional Photo"
          className="w-28 h-28 rounded-full mr-4 shadow-md border-4 border-gray ml-16 mt-8"
        />
      </div>

      <p className="font-bold text-lg  mt-0 ml-16 shadow-sm">{name}</p>
      <p className="font-bold text-lg   ml-16 shadow-sm">{profession}</p>

    </div>

    {/* Question Text Field */}
    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 w-3/4 md:w-1/2 bg-transparent border border-gray-300 rounded-lg shadow-md inline-block text-gray">
      OUR TEAM OF PROFESSIONALS HERE TO HELP YOU ANYTIME FIX YOUR APPOINTMENT NOW
    </h1>
  </div>





  <div className="bg-white p-4 rounded-md shadow-xl  md:mx-auto mt-6 mx-4 mb-6 max-w-screen-w">
    
      <div className="flex flex-col md:flex-row items-center ml-4">
        
        <div className="w-20 h-20 md:w-40 md:h-40  overflow-hidden mb-6 mt-8 md:mb-0 ml-48">
          <img
            src={photoUrl}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-bold text-xl  mt-8 ml-28">{name}</h2>
            {/* Appointment Button */}
    <button className="absolute  right-4 px-6 py-3 bg-sky-800 text-white rounded-lg shadow-md mr-10"
    onClick={() => handleAppointmentClcik()}

    >
       Book Appointment
    </button>

      </div>
      <table class="mt-6 w-full md:w-auto mx-auto md:max-w-2xl ml-52 mb-6"> 
      {professionals.map((professional) => (
        

        <tbody>
                    <tr>
            <td className="font-bold">Category:</td>
            <td>{professional.category.name}</td>
          </tr>


          <tr>
            <td className="font-bold ">Email:</td>
            <td>{professional.user.username}</td>
          </tr>
          <tr>
            <td className="font-bold pr-80">Phone:</td>
            <td>{professional.user.phone_number}</td>
          </tr>
          <tr>
            <td className="font-bold">Fee:</td>
            <td>{professional.fee_amount}</td>
          </tr>
          <tr>
            <td className="font-bold">Workplace:</td>
            <td>{professional.place.name}</td>
          </tr>
          <tr>
            <td className="font-bold">Address:</td>
            <td>{professional.user.address}</td>
          </tr>

        </tbody>
        ))}

      </table>
    </div>
    


    <div className="bg-stone-200 p-4 rounded-md shadow-lg mb-4 flex justify-center items-center mt-4 ml-4 mr-4">
  {/* Main Card content goes here */}
  {/* For example: */}
  <p className="font-bold">Know More About Our Services</p>
</div>





<div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-screen-xl mx-auto mt-6 mb-8 ml-4 mr-4">
  {lastFourImages.map((photo, index) => (
    <div className="bg-stone-200 p-4 rounded-md shadow-lg flex" key={index}>
      <div className="aspect-w-16 aspect-h-9 mt-4">
        <img
          src={`http://127.0.0.1:8000/${photo}`}
          alt="hmm"
          style={{ width: "700px",height: "200px" }} // Set your desired fixed height here

          className="object-contain rounded-md"
        />
        <p className="text-sm font-semibold mt-8 ml-16 mr-8">{lastFourdescriptions[index]}</p>

      </div>
    </div>
  ))}
</div>
















</section>

<ClientFooter/>
    </div>
  )
}
export default ProfessionalView