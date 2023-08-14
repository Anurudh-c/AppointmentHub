import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Professional_side/ProfessionalRegistration.css';

const ProfessionalRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  console.log(username)
  console.log(email)
  console.log(password)
  console.log(navigate)



  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/professional/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password,is_staff:true }),
      });

      if (response.ok) {
        // Registration successful
        toast.success('Registration successful');
        navigate('/'); // Redirect to the login page
      } else {
        // // Registration failed
        // const errorData = await response.json();
        // const errorMessage = errorData.message || 'Registration failed';
        // // toast.error(errorMessage);
        toast.error('Registration Failed!'
        , {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnHover: false,

        });

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
<div className="main-div  bg-cover bg-center flex justify-center items-center">
  <ToastContainer  />
    <div className="login-content text-white">
      <h1 className="text-3xl font-bold">SignUp</h1>
      <p>Please Enter Your SignUp  Details</p>
      <form className="login-input flex flex-col"  onSubmit={handleRegistration}>
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
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="login-btn mt-8 text-white font-bold text-lg bg-transparent border-2 border-blue-500 hover:bg-blue-700 rounded-md h-10"
          type="submit"
          value="SIGNUP"
        />
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

  );
};

export default ProfessionalRegistration;
