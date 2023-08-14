import React from 'react'
import HelloWorldComponent from './HelloWorldComponent'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRegistrationForm from './pages/Client_side/RegistrationForm'
import ProfessionalRegistration from './pages/Professional_side/ProfessionalRegistration'
import LoginPage from './pages/Client_side/ClientLoginPage'
import ClientHome from './pages/Client_side/ClientHomePage'
import ProfessionalHome from './pages/Professional_side/ProfessionalHome'
import AdminDashBoard from './pages/Admin_side/AdminDashBoard'
import BookingDetails from './pages/Admin_side/BookingDetails'
import ProfessionalCategories from './pages/Admin_side/ProfessionalCategories'
import RegisteredProfessionals from './pages/Admin_side/RegisteredProfessionals'
import RegisteredUsers from './pages/Admin_side/RegisteredUsers'
import ServiceLocations from './pages/Admin_side/ServiceLocations'
import { AuthProvider } from "./pages/AuthContext";
import ProfessionalProfile from './pages/Professional_side/ProfessionalProfile'
import ProfessionalNewAppointments from './pages/Professional_side/ProfessionalNewAppointments'
import ProfessionalSheduleAvailability from './pages/Professional_side/ProfessionalSheduleAvailability'
import ProfessionalCalender from './pages/Professional_side/ProfessionalCalender'
import ProfessionalBookingHistory from './pages/Professional_side/ProfessionalBookingHistory'
import Profile from './pages/Client_side/Profile'
import ProfessionalView from './pages/Client_side/ProfessionalView'
import ClientAppointmentBooking from './pages/Client_side/ClientAppointmentBooking'
import ClientPayment from './pages/Client_side/ClientPayment'
import ClientBookingCategories from './pages/Client_side/ClientBookingCategories'
import PaymentSuccess from './pages/Client_side/PaymentSuccess'


export default function App() {
  return (
    <div>

      <Router>
              <AuthProvider>

        <Routes>
          {/* COMMON PAGES */}
        <Route Component={HelloWorldComponent } path='/hello'></Route>
        <Route Component={UserRegistrationForm} path='/register'></Route>
        <Route Component={LoginPage} path='/'></Route>
          {/* ADMIN_SIDE  */}
        <Route Component={AdminDashBoard} path='Admin/Dashboard'></Route>
        <Route Component={BookingDetails} path='Admin/BookingDetails'></Route>
        <Route Component={ProfessionalCategories} path='Admin/ProfessionalCategories'></Route>
        <Route Component={RegisteredProfessionals} path='Admin/RegisteredProfessionals'></Route>
        <Route Component={RegisteredUsers} path='Admin/RegisteredUsers'></Route>
        <Route Component={ServiceLocations} path='Admin/ServiceLocation'></Route>
          {/* PROFESSIONAL_SIDE */}
        <Route Component={ProfessionalRegistration} path='professional/register'></Route>  
        <Route Component={ProfessionalHome} path='Professional/home'></Route>
        <Route Component={ProfessionalNewAppointments} path='Professional/NewAppointments'></Route>
        <Route Component={ProfessionalSheduleAvailability} path='Professional/SheduleAvailability'></Route>
        <Route Component={ProfessionalCalender} path='Professional/Calender'></Route>
        <Route Component={ProfessionalBookingHistory} path='Professional/BookingHistory'></Route>
        <Route Component={ProfessionalProfile} path='Professional/profile'></Route>
        {/* CLIENT_SIDE */}
        <Route Component={ClientHome} path='/home'></Route>
        <Route Component={Profile} path='/profile'></Route>
        <Route Component={ProfessionalView} path='/view'></Route>
        <Route Component={ClientAppointmentBooking} path='/booking'></Route>
        <Route Component={ClientPayment} path='/payment'></Route>
        <Route Component={ClientBookingCategories} path='/categories'></Route>
        <Route Component={PaymentSuccess} path='/success'></Route>














      </Routes>
            </AuthProvider>

      </Router>

    </div>
  )
}
