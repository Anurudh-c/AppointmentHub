import React, { useState,useEffect } from "react";
import axios from 'axios';

 const FetchProfessionals =()=> {
    const [professionals, setProfessionals] = useState([]);  



    useEffect(() => {


              // Fetch users data from the backend API
              axios.get('http://127.0.0.1:8000/Admin_side/professionals/')
              .then(response => {
                setProfessionals(response.data);
              })
              .catch(error => {
                if (error.response) {
                  // The request was made, but the server responded with an error status code
                  console.error('Server responded with error:', error.response.status);
                } else if (error.request) {
                  // The request was made, but no response was received
                  console.error('No response received:', error.request);
                } else {
                  // Something else happened while setting up the request
                  console.error('Error setting up request:', error.message);
                }
          
            });
      
   }, []);




      return professionals
    };
    
  
  



export default  FetchProfessionals