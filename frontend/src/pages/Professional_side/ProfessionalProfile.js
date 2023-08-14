import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../pages/AuthContext"; //For logout
import Swal from "sweetalert2";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import pic from "../../images/login background.png";

const ProfessionalProfile = () => {
  const { handleLogout } = useAuthContext();
  const user_email = localStorage.getItem("user_email"); // To pass in request
  const [selectedFile, setSelectedFile] = useState(null); // for image upload
  const [text, setText] = useState(""); // for description
  const [uploadedImages, setUploadedImages] = useState([]); // for displaying the images
  const lastFourImages = uploadedImages.slice(-4); //for displaying only 4 images
  const [descriptions, setDescriptions] = useState([]); // for display descriptions
  const lastFourdescriptions = descriptions.slice(-6); //for displaying only 6 descriptions


  useEffect(() => {
    console.log(user_email);
    fetchUploadedImages();
    fetchDescriptions();
  }, []);

  // Function to fetch uploaded images
  const fetchUploadedImages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/professional/upload/image/${user_email}/`
      );
      setUploadedImages(response.data);
      console.log(response.data, "ttttttttttttt");
    } catch (error) {
      console.error("Error fetching uploaded images:", error.message);
    }
  };

  // Function to fetch uploaded descriptions

  const fetchDescriptions = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/professional/upload/description/${user_email}/`
      );
      setDescriptions(response.data);
      console.log(response.data, "Descriptions");
    } catch (error) {
      console.error("Error fetching descriptions:", error.message);
    }
  };

  //image upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(selectedFile);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/professional/upload/image/${user_email}/`,
        formData,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully:", response.data);
      // Handle success response, if needed
    } catch (error) {
      console.error("Error uploading image:", error.message);
      // Handle error response, if needed
    }
  };

  // Description upload

  const handleDescriptionChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/professional/upload/description/${user_email}/`,
        { text }
      );
      setText(""); // for clear the area after submission

      console.log("Description submitted successfully:", response.data);
      // Handle success response, if needed
    } catch (error) {
      console.error("Error submitting description:", error.message);
      // Handle error response, if needed
    }
  };

  // Function to fetch the logged-in user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/professional/get-professionals/",
        {
          params: {
            email: user_email, // Pass the email retrieved from localStorage as a parameter
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.status === 200) {
        throw new Error("Failed to fetch user details.");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  // Function to fetch the dropdown options for "category" and "location" fields
  const fetchDropdownOptions = async () => {
    try {
      const fetchCategoryOptions = fetch(
        "http://127.0.0.1:8000/professional/get-categories/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());

      const fetchPlaceOptions = fetch(
        "http://127.0.0.1:8000/professional/get-places/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());

      const [category, place] = await Promise.all([
        fetchCategoryOptions,
        fetchPlaceOptions,
      ]);

      return { category, place };
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
      throw error;
    }
  };

//Professionals data updation
  const updateUserDetails = async () => {

    const response = await axios.put(
      `http://127.0.0.1:8000/professional/update-professionals/${user_email}/`,
      
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };



  const handleUpdateUserDetails = () => {
    // Fetch user details and dropdown options
    Promise.all([fetchUserDetails(), fetchDropdownOptions()])
      .then(([userDetails, dropdownOptions]) => {
        

        const containerDiv = document.createElement("div");
        containerDiv.classList.add("grid", "grid-cols-2", "gap-4");

        // Username
        const usernameDiv = createInputField("Username:","text",userDetails[0].user.username);
        containerDiv.appendChild(usernameDiv);

        // Email
        const emailDiv = createInputField("Email:","email",userDetails[0].user.email);
        containerDiv.appendChild(emailDiv);

        // Phone Number
        const phoneNumberDiv = createInputField("Phone Number:","number",userDetails[0].user.phone_number);
        containerDiv.appendChild(phoneNumberDiv);

        // Fee Amount
        const feeAmountDiv = createInputField("Fee Amount:","number",userDetails[0].fee_amount);
        containerDiv.appendChild(feeAmountDiv);

        // Category Dropdown
        const categoryDiv = createSelectField("Category:","category",dropdownOptions.category,userDetails[0].category.id);
        containerDiv.appendChild(categoryDiv);

        // Place Dropdown
        const placeDiv = createSelectField("Place:","place",dropdownOptions.place,userDetails[0].place.id);
        containerDiv.appendChild(placeDiv);

        // Address
        const addressDiv = createTextareaField("Address:","address",userDetails[0].user.address);
        containerDiv.appendChild(addressDiv);

        Swal.fire({
          title: "Update User Details",
          html: containerDiv,
          showCancelButton: true,
          confirmButtonText: "Update",
          cancelButtonText: "Cancel",
          didOpen: () => {
            console.log("Modal opened.");
          },
          preConfirm: (result) => {
            // Handle the form submission and update the user details
            console.log("fffffffffffffForm values:", result.Username); // Log the form values to check if they are captured correctly

            updateUserDetails();
          },
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading(),
        });
      })
      .catch((error) => {
        console.error("Error in handleUpdateUserDetails:", error);
        Swal.fire("Error!", "Failed to load data.", "error");
      });
  };
  const createInputField = (labelText, type, value) => {
    console.log("Label Text:", labelText);
    console.log("Value:", value);

    const inputFieldDiv = document.createElement("div");
    inputFieldDiv.classList.add("grid", "grid-cols-1", "gap-2");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.classList.add("text-sm", "font-semibold", "col-span-1");

    const input = document.createElement("input");
    input.type = type;
    input.name = labelText.toLowerCase().replace(" ", "_");
    input.classList.add("border","border-gray-300","px-2","py-1","rounded-md","col-span-1");
    input.value = value;

    inputFieldDiv.appendChild(label);
    inputFieldDiv.appendChild(input);

    return inputFieldDiv;
  };

  const createSelectField = (labelText, name, options, selectedValue) => {
    const selectFieldDiv = document.createElement("div");
    selectFieldDiv.classList.add("grid", "grid-cols-1", "gap-2");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.classList.add("text-sm", "font-semibold", "col-span-1");

    const select = document.createElement("select");
    select.name = name;
    select.classList.add("border","border-gray-300","px-2","py-1","rounded-md","col-span-1");

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.id;
      optionElement.textContent = option.name;
      if (option.id === selectedValue) {
        optionElement.selected = true;
      }
      select.appendChild(optionElement);
    });

    selectFieldDiv.appendChild(label);
    selectFieldDiv.appendChild(select);

    return selectFieldDiv;
  };

  const createTextareaField = (labelText, name, value) => {
    const textareaFieldDiv = document.createElement("div");
    textareaFieldDiv.classList.add("grid", "grid-cols-1", "gap-2");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.classList.add("text-sm", "font-semibold", "col-span-1");

    const textarea = document.createElement("textarea");
    textarea.name = name;
    textarea.classList.add("border","border-gray-300","px-2","py-1","rounded-md","col-span-1");
    textarea.rows = 3; 
    textarea.value = value;

    textareaFieldDiv.appendChild(label);
    textareaFieldDiv.appendChild(textarea);

    return textareaFieldDiv;
  };



  // const handlePasswordReset = () => {
  //   const containerDiv = document.createElement("div");
  //   containerDiv.classList.add("grid", "grid-cols-2", "gap-2"); // Add grid layout with 2 columns and smaller gap between rows

  //   const fieldNames = [
  //     "Current Password",
  //     "New Password",
  //     "Confirm New Password",
  //   ];

  //   fieldNames.forEach((fieldName) => {
  //     const labelDiv = document.createElement("div");
  //     labelDiv.classList.add("flex", "items-start", "justify-start"); // Align items to the start (left) of the label column

  //     const label = document.createElement("label");
  //     label.textContent = fieldName + ":";

  //     labelDiv.appendChild(label);

  //     const inputDiv = document.createElement("div");
  //     inputDiv.classList.add("flex", "items-center"); // Align items to the start (left) of the input column

  //     const input = document.createElement("input");
  //     input.type = "password";
  //     input.name = fieldName.toLowerCase().replace(/\s+/g, ""); // Use lowercase field name without spaces as the input name
  //     input.classList.add(
  //       "border",
  //       "border-gray-300",
  //       "px-2",
  //       "py-1",
  //       "rounded-md"
  //     );

  //     inputDiv.appendChild(input);

  //     containerDiv.appendChild(labelDiv);
  //     containerDiv.appendChild(inputDiv);
  //   });

  //   Swal.fire({
  //     title: "Password Reset",
  //     html: containerDiv,
  //     showCancelButton: true,
  //     confirmButtonText: "Reset Password",
  //     cancelButtonText: "Cancel",
  //     didOpen: () => {
  //       const confirmButton = document.querySelector(".swal2-confirm");
  //       const cancelButton = document.querySelector(".swal2-cancel");

  //       confirmButton.style.boxShadow = "none";

  //       confirmButton.style.padding = "0.3rem 0.9rem";
  //       confirmButton.style.backgroundColor = "#10B981";
  //       confirmButton.style.color = "#FFFFFF";
  //       confirmButton.style.borderRadius = "0.3rem";

  //       cancelButton.style.padding = "0.3rem 0.7rem";
  //       cancelButton.style.backgroundColor = "#6B7280";
  //       cancelButton.style.color = "#FFFFFF";
  //       cancelButton.style.borderRadius = "0.3rem";
  //     },
  //     preConfirm: (result) => {
  //       const currentPassword = result.currentpassword;
  //       const newPassword = result.newpassword;
  //       const confirmNewPassword = result.confirmnewpassword;

  //       // Handle password reset logic here
  //       if (newPassword !== confirmNewPassword) {
  //         Swal.showValidationMessage("New passwords do not match");
  //       } else {
  //         resetPassword(currentPassword, newPassword);
  //       }
  //     },
  //     showLoaderOnConfirm: true,
  //     allowOutsideClick: () => !Swal.isLoading(),
  //     inputAttributes: {
  //       currentpassword: {
  //         name: "currentpassword",
  //         type: "password",
  //       },
  //       newpassword: {
  //         name: "newpassword",
  //         type: "password",
  //       },
  //       confirmnewpassword: {
  //         name: "confirmnewpassword",
  //         type: "password",
  //       },
  //     },
  //   });
  // };

  // const resetPassword = (currentPassword, newPassword) => {
  //   // Handle password reset API call or logic here
  // };

  return (
    <div className="flex flex-col md:flex-row ">
      {/* Left Side Navbar */}
      <div className="flex-1 bg-gray-100 md:min-h-screen flex flex-col">
        {/* Top NAVBAR */}
        <nav className="bg-indigo-950 text-white p-4 flex flex-wrap justify-between items-center shadow-lg">
          <div className="flex items-center mt-2 md:mt-0"></div>
          <div>
            <Link
              to="/Professional/home"
              className="text-white hover:text-gray-400 px-2 md:px-4 ml-3 mt-3 md:mt-0"
            >
              DashBoard
            </Link>
            <button
              className="px-2 py-1 bg-indigo-800 text-gray-200 rounded ml-3 md:ml-6 mt-3 md:mt-0  transition-colors duration-300 hover:bg-indigo-600"
              onClick={handleLogout}
            >
              <FiLogOut className="inline-block mr-1" />
              Logout
            </button>
          </div>
        </nav>
        <section className="bg-indigo-100 w-full py-8 flex-1 px-4">
          <div className="container mx-auto text-center ">
            <div className="relative">
              <div className="bg-indigo-800 text-white rounded-lg p-1 mb-4">
                {/* Top Card */}
                <h5 className="text-2xl  mb-1">User Profile</h5>
                {/* Add content relevant to the user profile here */}
              </div>
              <div
                class="absolute top-3 right-12 -mt-10 -mr-30 w-24 h-24 cursor-pointer"
                onClick={() => handleUpdateUserDetails()}
              >
                <img
                  src={pic}
                  alt="Profile picture"
                  class="h-full w-full object-cover rounded-full shadow-xl border-2 border-white"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                {/* First Card */}
                <div className="bg-white rounded-lg p-4 shadow-2xl">
                  <div className="bg-indigo rounded-lg shadow-lg p-4 mb-4">
                    <div className="profile-cover rounded-t-lg bg-pink" />
                    <div className="text-center pb-5">
                      <h3 className="text-xl font-bold flex items-start ml-4">
                        Profile details
                      </h3>

                      <div className="rounded-lg p-4 mt-4">
                        <div className="flex items-start">
                          <span className="font-medium">Name:</span>
                          <p className="ml-2">Anurudh</p>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium">Occupation:</span>
                          <p className="ml-2">Senior Software Engineer</p>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium">Location:</span>
                          <p className="ml-2">New York, USA</p>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                          <button
                            onClick={() => handleUpdateUserDetails()}
                            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-800 text-white rounded-md mr-2 mb-2"
                          >
                            Edit
                          </button>
                          <button
                            // onClick={() => handlePasswordReset()}
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md mb-2"
                          >
                            Reset Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                {/* Cards */}
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h2 className="text-lg font-bold mb-2">
                    Upload Office Images
                  </h2>
                  <form onSubmit="">
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      className="mb-4"
                      onChange={handleFileChange}
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-indigo-800 text-white rounded ml-3 md:ml-6 mt-3 md:mt-0  transition-colors duration-300 hover:bg-indigo-500"
                      onClick={handleImageUpload}
                    >
                      Submit
                    </button>
                  </form>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {lastFourImages.map((image, index) => (
                      <div className="relative rounded-lg overflow-hidden bg-gray-200">
                        <img
                          key={index}
                          src={`http://127.0.0.1:8000/${image}`}
                          alt="Image 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Third Card */}
                <div className="bg-white rounded-lg p-4 mt-4 mb-4">
                  <h2 className="text-lg font-bold mb-2">
                    Upload Descriptions about Your service
                  </h2>
                  <form onSubmit={null}>
                    <textarea
                      value={text}
                      onChange={handleDescriptionChange}
                      placeholder="Enter Description"
                      className="bg-gray-200 px-4 py-2 rounded-md w-full mb-4"
                      rows={3} // Set the number of visible rows (you can adjust this as needed)
                    />
                    <div class="flex justify-end">
                      <button
                        type="submit"
                        class="px-2 py-1 bg-indigo-800 text-white rounded ml-3 md:ml-6 mt-3 md:mt-0 transition-colors duration-300 hover:bg-indigo-500"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lastFourdescriptions.map((description, index) => (
                    <div className="bg-indigo-200 rounded-lg shadow-lg p-4" key={index}>
                      <h2 className="text-lg font-bold mb-2">
                        Description Card 
                      </h2>
                      <p>
                      {description}
                      </p>
                    </div>
                            ))}


                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
