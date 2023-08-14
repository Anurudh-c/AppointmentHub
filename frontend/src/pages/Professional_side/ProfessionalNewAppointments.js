import React, { useState } from "react";
import NavigationBar from '../../components/Professional_side/ProfessionalNavbar';
import LeftNavBar from '../../components/Professional_side/ProfessionalLeftSideNavbar';
import { FiAlignJustify } from 'react-icons/fi';

const ProfessionalNewAppointments =()=> {
    const [showComponent, setShowComponent] = useState(true);

    const handleToggle = () => {
      setShowComponent((prevShowComponent) => !prevShowComponent);
    };
  
  return (
    <div>
          <div className="flex flex-col md:flex-row">
    {showComponent && <LeftNavBar />}
    <div className="flex-1 bg-gray-100 md:min-h-screen flex flex-col">
      <NavigationBar />

      <section className="bg-white w-full py-8  flex-1">
        <div className="container mx-auto text-center ">
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

            <h1 className=" text-bold-xl ">
              Welcome to New Appointments 
            </h1>
        </div>
      </section>

      {/* <Footer /> */}
      </div>
    </div>

    </div>
  )
}

export default ProfessionalNewAppointments