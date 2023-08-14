import React from 'react'
import NavigationBar from '../../components/Client_side/ClientNavbar'
import Footer from '../../components/Client_side/ClientFooter'
import pic from '../../images/bb.jfif'

 const ClientProfile= () =>{
  return (
    <div>
      <NavigationBar/>

      <section className=" w-full py-8 flex-1 px-4">
          <div className="container mx-auto text-center ">
            <div className="relative">
              <div className="bg-sky-700 text-white rounded-lg p-1 mb-4">
                {/* Top Card */}
                <h5 className="text-2xl  mb-1">User Profile</h5>
                {/* Add content relevant to the user profile here */}
              </div>
              <div
                class="absolute top-3 right-12 -mt-10 -mr-30 w-24 h-24 cursor-pointer"
                onClick=""
              >
                <img
                  src={pic}
                  alt="Profile picture"
                  class="h-full w-full object-cover rounded-full shadow-xl border-2 border-white"
                />
              </div>
            </div>
            </div>
            </section>




      <Footer/>
    </div>
  )
}

export default ClientProfile