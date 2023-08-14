import React, { useState,useEffect } from "react";
import NavigationBar from "../../components/Admin_side/AdminNavBar";
import LeftNavBar from "../../components/Admin_side/AdminLeftSideNavBar";
import axios from "axios";
import Swal from "sweetalert2";


import {
  FiAlignJustify,
  FiEdit2,
  FiEdit3,
  FiList,
  FiMapPin,
  FiTrash,
  FiTrash2,
} from "react-icons/fi";

const ProfessionalCategories = () => {
  const [showComponent, setShowComponent] = useState(true); // for toggle 
  const [categories, setCategories] = useState([]);


  const handleToggle = () => {
    setShowComponent((prevShowComponent) => !prevShowComponent);
  };

  const fetchCategories =()=>{
        // Fetch categories data from the backend API
        axios.get('http://127.0.0.1:8000/Admin_side/categories/')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
  

  }

  useEffect(() => {
    fetchCategories();
  }, []);


  const createCategory = async (newCategoryName) => {
    try {
      // Send a POST request to the backend API to create the category
      const response = await axios.post('http://127.0.0.1:8000/Admin_side/categories/create/', { name: newCategoryName });
      console.log("Category added successfully!");
      fetchCategories(); // Assuming you have a function to fetch the updated category list
    } catch (error) {
      console.error("Error adding category:", error.message);
    }
  };

  
  const updateCategoryName = (categoryId, updatedName) => {
    // Send a request to the backend to update the category's name
    axios
      .put(`http://127.0.0.1:8000/Admin_side/categories/update/${categoryId}/`, {
        name: updatedName,
      })
      .then((response) => {
        // Handle successful response, e.g., show a success message or update the categories list
        console.log("Category updated!");
        // After updating, refetch the categories data
        fetchCategories();
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error updating category:", error.message);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    // Send a request to the backend to delete the category with the specified categoryId
    axios.delete(`http://127.0.0.1:8000/Admin_side/categories/delete/${categoryId}/`)
      .then(response => {
        // Handle successful response, e.g., show a success message or update the category list
        console.log("Category deleted!");
        // After deleting the category, refetch the categories data
        fetchCategories();
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error deleting category:', error.message);
      });
  };


  const handleAddCategory = () => {
    Swal.fire({
      title: "Add New Professions",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      didOpen: () => {
        // Get the SweetAlert2 confirm button element
        const confirmButton = document.querySelector(".swal2-confirm");
  
        // Get the SweetAlert2 cancel button element
        const cancelButton = document.querySelector(".swal2-cancel");
  
        // Remove the default blue border (if any)
        confirmButton.style.boxShadow = "none";
  
        // Apply custom styles to the confirm button
        confirmButton.style.padding = "0.3rem 0.9rem"; // Smaller padding
        confirmButton.style.backgroundColor = "#10B981"; // Green background
        confirmButton.style.color = "#FFFFFF"; // White text color
        confirmButton.style.borderRadius = "0.3rem"; // Smaller rounded corners
  
        // Apply custom styles to the cancel button
        cancelButton.style.padding = "0.3rem 0.7rem"; // Smaller padding
        cancelButton.style.backgroundColor = "#6B7280"; // Gray background
        cancelButton.style.color = "#FFFFFF"; // White text color
        cancelButton.style.borderRadius = "0.3rem"; // Smaller rounded corners
  
        // Get the SweetAlert2 dialog container element
        const dialogContainer = Swal.getPopup();
  
        // Apply custom inline styles directly to the dialog container
        dialogContainer.style.backgroundColor = "#F3E8FF"; // Purple background
        dialogContainer.style.borderRadius = "15px"; // Rounded corners
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Get the new category name from the Swal input field
        const newCategoryName = result.value;
        createCategory(newCategoryName)
      }
    });
  };
  
  
  const handleEditCategory = (categoryId, currentName) => {
    Swal.fire({
      title: "Edit Category",
      input: "text",
      inputValue: currentName, // Pre-fill the input field with the current category name
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      didOpen: () => {
        // Get the SweetAlert2 confirm button element
        const confirmButton = document.querySelector(".swal2-confirm");
  
        // Get the SweetAlert2 cancel button element
        const cancelButton = document.querySelector(".swal2-cancel");
  
        // Remove the default blue border (if any)
        confirmButton.style.boxShadow = "none";
  
        // Apply custom styles to the confirm button
        confirmButton.style.padding = "0.2rem 0.8rem"; // Smaller padding
        confirmButton.style.backgroundColor = "#10B981"; // Green background
        confirmButton.style.color = "#FFFFFF"; // White text color
        confirmButton.style.borderRadius = "0.3rem"; // Smaller rounded corners
  
        // Apply custom styles to the cancel button
        cancelButton.style.padding = "0.2rem 0.8rem"; // Smaller padding
        cancelButton.style.backgroundColor = "#6B7280"; // Gray background
        cancelButton.style.color = "#FFFFFF"; // White text color
        cancelButton.style.borderRadius = "0.3rem"; // Smaller rounded corners
  
        // Get the SweetAlert2 dialog container element
        const dialogContainer = Swal.getPopup();
  
        // Apply custom inline styles directly to the dialog container
        dialogContainer.style.backgroundColor = "#F3E8FF"; // Purple background
        dialogContainer.style.borderRadius = "15px"; // Rounded corners
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Get the updated category name from the Swal input field
        const updatedName = result.value;
        updateCategoryName(categoryId, updatedName);
      }
    });
  };

  const CategoryDeleteAlert = (categoryId) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this category?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      didOpen: () => {
        // Get the SweetAlert2 confirm button element
        const confirmButton = document.querySelector(".swal2-confirm");
  
        // Get the SweetAlert2 cancel button element
        const cancelButton = document.querySelector(".swal2-cancel");
  
        // Remove the default blue border (if any)
        confirmButton.style.boxShadow = "none";
  
        // Apply custom styles to the confirm button
        confirmButton.style.padding = "0.2rem 0.9rem"; // Smaller padding
        confirmButton.style.backgroundColor = "#DC2626"; // Red background
        confirmButton.style.color = "#FFFFFF"; // White text color
        confirmButton.style.borderRadius = "0.3rem"; // Smaller rounded corners
  
        // Apply custom styles to the cancel button
        cancelButton.style.padding = "0.2rem 0.8rem"; // Smaller padding
        cancelButton.style.backgroundColor = "#6B7280"; // Gray background
        cancelButton.style.color = "#FFFFFF"; // White text color
        cancelButton.style.borderRadius = "0.3rem"; // Smaller rounded corners
  
        // Get the SweetAlert2 dialog container element
        const dialogContainer = Swal.getPopup();
  
        // Apply custom inline styles directly to the dialog container
        dialogContainer.style.backgroundColor = "#F3E8FF"; // Purple background
        dialogContainer.style.borderRadius = "15px"; // Rounded corners
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Execute the callback function if the user clicks on the confirm button
        handleDeleteCategory(categoryId);
      }
    });
  };
  
  
        
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left bar Navbar based on togle condition  */}
      {showComponent && <LeftNavBar />}
    
      <div className="flex-1 bg-gray-100 md:min-h-screen flex flex-col">
         {/* This places the NavigationBar component at the top */}
        <NavigationBar />
       
        <section className="bg-white w-full py-8  flex-1">
        <div className="container mx-auto text-center flex justify-between items-center">
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
            <button
          className="px-2 py-1 bg-purple-800 text-white rounded md:ml-auto mt-3 md:mt-0 transition-colors duration-300 hover:bg-purple-600 mr-10 shadow-md transition-shadow hover:shadow-lg"
          onClick={()=>handleAddCategory()}
        >
          <FiList className="inline-block mr-2" />Add New Professions
        </button>


          </div>
          <h1 className=" text-xl ml-7 flex justify-start items-center">

Professiional Categories
</h1>


          <div className="my-4 bg-purple-100 p-4 md:p-6 shadow-md rounded-lg max-w-full overflow-x-auto">
            <table className="w-full ">
              {/* Table Head */}
              <thead>
                <tr className="bg-purple-800 text-white">
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                  <FiList className="inline-block mr-2" /> Listed Professional Categories
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiEdit3 className="inline-block mr-1" /> Edit The Category
                  </th>
                  <th className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <FiTrash2 className="inline-block mr-1" /> Delete The Category
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-purple-100 ">
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    {category.name}
                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                      <button className="border bg-green-700 hover:bg-green-900 text-white py-1 px-2 rounded w-full md:w-auto"
                          onClick={()=>handleEditCategory(category.id,category.name)}
                        >
                          <FiEdit2 className="inline-block mr-1" />
                          Edit
                        </button> 

                    </td>
                    <td className="border px-4 py-2 text-center shadow-md transition-shadow hover:shadow-lg">
                    <button
                        className="bg-red-700 hover:bg-red-900 text-white py-1 px-2 rounded w-full md:w-auto"
                        onClick={()=>CategoryDeleteAlert(category.id)}
                      >
                        <FiTrash className="inline-block mr-1" />
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ProfessionalCategories;
