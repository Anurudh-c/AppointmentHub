import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import '../Client_side/LoginPage.css';
// import { CgSpinner } from "react-icons/cg";
import { auth } from "../../pages/FirebaseConfig/Config";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


const UserRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [verify, setVerify] = useState(null);




  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!email || !password || !username) {
      setError("Please fill in all fields");
      return false;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (phone_number < 0) {
      toast.error("Phone number cannot be negative");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }


    return true;
  };


const onSignup = async (userData) => {
  console.log("Starting user signup...");
  setLoading(true);
  const formatPhone = "+91" + phone_number;
  console.log("Formatted phone number:", formatPhone);


  try {
    console.log('sssssssssssssssssssssssssss');
    const appVerifier = new RecaptchaVerifier( auth,"recaptcha-container", {
      size: "normal",
      callback: (response) => {    console.log("reCAPTCHA response:", response);
    },
      
      "expired-callback": () => {    console.log("reCAPTCHA expired");
    }
    });
    console.log("Starting phone number verification...");

    const confirmationResult = await signInWithPhoneNumber(auth, formatPhone, appVerifier);
    console.log("Verification result:", confirmationResult);

    setUser(confirmationResult);
    setLoading(false);
    setShowOtp(true);
    setVerify(confirmationResult);
    toast.success("OTP sent successfully!");
    console.log("OTP sent successfully!");

  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};


  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      email: email,
      password: password,
      username: username,
      phone_number: phone_number,
    };

    try {
      const response = await axios.get('http://127.0.0.1:8000/register/', {
        params: {
          email: email
        }
      });

      if (response.data.message === "success") {
        onSignup(userData);
      } else {
        console.log("User exists. Terminate.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors &&
        error.response.data.errors.phone_number
      ) {
        const errorMessage = error.response.data.errors.phone_number;
        setError(errorMessage);
      } else {
        setError("Invalid credentials.");
      }
    }
  };









  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  const onOTPVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await user.confirm(otp);

      if (response) {
        toast.success("OTP verification successful!");
        const userData = {
          email: email,
          username: username,
          password: password,
          phone_number: phone_number,
        };

       const response = await axios.post('http://127.0.0.1:8000/register/', userData);

        console.log(response.data.user_id,'this is from django after signup-----');
        navigate("/");
      } else {
        setError("Invalid OTP");
      }
    } catch (error) {
      setError("Failed to verify OTP");
    }

    setLoading(false);
  };



  return (
<>
{showOtp ? (

<div className="main-div  bg-cover bg-center flex justify-center items-center">
  <ToastContainer  />
    <div className="login-content text-white">
      <h1 className="text-3xl font-bold">Verifu OTP</h1>
      <p>Welcome to AppointmentHub! verify your account.</p>
      <form className="login-input flex flex-col"  onSubmit={onOTPVerify}>
        <input
          className="input-field h-10 w-80 text-white mt-8 bg-transparent border-2 border-white rounded-md pl-4 outline-none"
          type="chracter"
          name="otp"
          placeholder="Enter Your otp"
          value={otp}
          onChange={handleChange}
          />
          <button type="submit"
           className="login-btn mt-8 text-white font-bold text-lg bg-transparent border-2 border-blue-500 hover:bg-blue-700 rounded-md h-10"
           >
           {/* {loading && (
             <CgSpinner size={20} className="mt-1 animate-spin" />
           )} */}
           <span>Verify</span>
         </button>

        <div className="signup-navi mt-8">
          <p>Already a member..?</p>
          <p>
            <Link className="lo-sign text-white" to="/">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
):(



<div className="main-div  bg-cover bg-center flex justify-center items-center">
  <ToastContainer  />
    <div className="login-content text-white">
      <h1 className="text-3xl font-bold">SignUp</h1>
      <p>Please Enter Your SignUp  Details</p>
      <div>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                </div>

      <form className="login-input flex flex-col"  onSubmit={submitForm}>
        <input
          className="input-field h-10 w-80 text-white mt-8 bg-transparent border-2 border-white rounded-md pl-4 outline-none"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field h-10 w-80 text-white mt-8 bg-transparent border-2 border-white rounded-md pl-4 outline-none"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
                <input
          className="input-field h-10 w-80 text-white mt-8 bg-transparent border-2 border-white rounded-md pl-4 outline-none"
          type="phone_number"
          name="phone_number"
          placeholder="phone_number"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />

        <input
          className="input-field h-10 w-80 text-white mt-8 bg-transparent border-2 border-white rounded-md pl-4 outline-none"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-btn mt-8 text-white font-bold text-lg bg-transparent border-2 border-blue-500 hover:bg-blue-700 rounded-md h-10"
          type="submit"
          value="SIGNUP"
        > <div id="recaptcha-container"></div></button>
        <div className="signup-navi mt-8">
          <p>Already a member..?</p>
          <p>
            <Link className="lo-sign text-white" to="/">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>


)}
</>
  );
};

export default UserRegistrationForm;
