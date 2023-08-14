import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/Client_side/ClientNavbar";
import Footer from "../../components/Client_side/ClientFooter";
import FetchProfessionals from "../../components/Admin_side/ProfessionalList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientBookingCategories = () => {
  const professionals = FetchProfessionals(); //to get professionals data
  const [selectedProfession, setSelectedProfession] = useState("");
  const [professional, setProfessional] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const backgroundColors = [
    "bg-blue-200",
    "bg-emerald-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-red-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-fuchsia-200",
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://127.0.0.1:8000/categories/")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleButtonClick = (categoryName) => {
    // Use the categoryName to fetch data from the professional table
    setSelectedProfession(categoryName);
    axios
      .get(`http://127.0.0.1:8000/get-professionals/?category=${categoryName}`)
      .then((response) => {
        // Process the fetched data here
        // For example, set the filtered data in a state variable
        setProfessional(response.data);
        console.log(response.data, "ttttttttttttttttttttttttttttttt");
      })
      .catch((error) => {
        console.error("Error fetching professionals:", error);
      });
  };

  const handleCardClick = (professional) => {
    // Navigate to the '/view' page with the professional's ID
    navigate(`/view`, { state: { email: professional.user.email } });
  };

  return (
    <div>
      <NavigationBar />

      <div className="bg-slate-200 p-4 rounded-md shadow-lg mb-4 flex justify-center items-center  font-bold text-lg mt-8 ml-4 mr-4">
        <p>Professionals Galore</p>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 mt-10 ml-4">
        {/* First Card - Professional Details */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-2xl">
          <div className="bg-slate-200  text-center   text-xl p-4 rounded-t-lg shadow-md">
            Select Professional Category
          </div>

          <div className="p-6 ">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  className={`${
                    selectedProfession === category.name
                      ? "bg-gray-400"
                      : "bg-transparent"
                  } profession-button text-lg text-center mb-2 block hover:text-blue-600 `}
                  onClick={() => handleButtonClick(category.name)}
                >
                  {category.name}
                </button>
                <div className="w-full h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Card - Additional Details (Placeholder) */}
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg ml-4 mr-4">
          <div className="bg-slate-200  text-center  text-xl p-4 rounded-t-lg shadow-md">
            Selected Professional Category
          </div>

          <div className="bg-white p-4 rounded-md shadow-2xl flex flex-col md:flex-row md:gap-4 md:justify-center md:mx-auto mt-6 mx-4  max-w-screen-w">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-4 mb-4">
              {professional.length > 0
                ? professional.map((professional) => (
                    <div
                      key={professional.id}
                      className={`${
                        backgroundColors[
                          professional.id % backgroundColors.length
                        ]
                      } p-4 rounded-md shadow-xl flex flex-wrap justify-between`}
                      onClick={() => handleCardClick(professional)}
                    >
                      <div className="flex justify-left  w-full mb-4 ">
                        <img
                          src={`http://127.0.0.1:8000/${professional.user.profile_pic}`}
                          alt="Professional Photo"
                          className="w-28 h-28 rounded-full mr-4 shadow-md border-4 border-gray ml-16"
                        />
                      </div>
                      <div className="flex flex-col ml-7">
                        <p className="font-bold text-lg ">
                          {professional.user.username}
                        </p>
                        <p className="text-black">
                          Category: {professional.category?.name}
                        </p>
                        <p className="text-black">
                          Phone: {professional.user.phone_number}
                        </p>
                        <p className="text-gray-800">
                          Address: {professional.user.address}
                        </p>
                      </div>
                    </div>
                  ))
                : professionals.map((professional) => (
                    <div
                      key={professional.id}
                      className={`${
                        backgroundColors[
                          professional.id % backgroundColors.length
                        ]
                      } p-4 rounded-md shadow-xl flex flex-wrap justify-between`}
                      onClick={() => handleCardClick(professional)}

                    >
                      <div className="flex justify-left  w-full mb-4 ">
                        <img
                          src={professional.user.profile_pic}
                          alt="Professional Photo"
                          className="w-28 h-28 rounded-full mr-4 shadow-md border-4 border-gray ml-16"
                        />
                      </div>
                      <div className="flex flex-col ml-7">
                        <p className="font-bold text-lg ">
                          {professional.user.username}
                        </p>
                        <p className="text-black">
                          Category: {professional.category?.name}
                        </p>
                        <p className="text-black">
                          Phone: {professional.user.phone_number}
                        </p>
                        <p className="text-gray-800">
                          Address: {professional.user.address}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientBookingCategories;
