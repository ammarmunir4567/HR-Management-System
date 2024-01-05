
import './App.css';
import Login from './Frontend/interface/HR/Login';
import Signup from './Frontend/interface/HR/Signup';
import NoPage from './Frontend/interface/HR/NoPage';
import Dashboard from './Frontend/interface/HR/Dashboard';
import Add_Team from './Frontend/interface/HR/Add_Team';
import Blog from './Frontend/interface/HR/Blog';
import ImageSlider from './Frontend/Components/imageSlider.js';
import Setting from './Frontend/interface/HR/Setting';
import Contact from './Frontend/interface/HR/Contact';
import E_Dashboard from './Frontend/interface/Employee/E_Dashboard';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import E_Complain from './Frontend/interface/Employee/E_Complain';
import Leave from './Frontend/interface/HR/Leave';
import View_Employee from './Frontend/interface/HR/View_Employee';
import Complain_Handler from './Frontend/interface/HR/Complain_Handler';
import AddEmployee from './Frontend/interface/HR/Add_Employee';
import View_Team from './Frontend/interface/HR/View_Team.js'
import Attendance from './Frontend/interface/HR/Attendence';
import OurTeam from './Frontend/interface/HR/OurTeam';
import E_Leave from './Frontend/interface/Employee/E_Leave';
import Blog1 from './Frontend/interface/HR/Blog1'
import Blog2 from './Frontend/interface/HR/Blog2'
import Attendance_date from './Frontend/interface/HR/Attendance_date';
import View_profile from './Frontend/interface/HR/View_profile.js';
import Edit_profile from './Frontend/interface/HR/Edit_profile.js';
import View_attendance from './Frontend/interface/HR/View_attendance.js'
import E_Attendance from './Frontend/interface/Employee/E_Attendance.js';
import ProtectedRoute from './Frontend/interface/HR/ProtectedRoute'; // Make sure the path is correct
import { selectUser } from './Frontend/Redux/Slice/authSlice.js'; // Update the import path to your authSlice
import { useSelector } from 'react-redux';
import EventForm from './Frontend/interface/HR/EventForm.js';
import View_event from './Frontend/interface/HR/View_event.js';
import Evaluate_profile from './Frontend/interface/HR/Evaluate_profile.js';
import E_Review from './Frontend/interface/Employee/E_Review.js';

function App() {
  // Using useSelector to access the isLoggedIn state from Redux store
  const user = useSelector(selectUser);
  const isLoggedIn = user && user.isLoggedIn;

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from base path */}

        <Route path="/" element={<Navigate replace to={isLoggedIn ? "/Dashboard" : "/Login"} />} />

        {/* Public Routes */}
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="View_event" element={<ProtectedRoute Component={View_event} isLoggedIn={isLoggedIn} />} />
        <Route path="Event_form" element={<ProtectedRoute Component={EventForm} isLoggedIn={isLoggedIn} />} />
        <Route path="Dashboard" element={<ProtectedRoute Component={Dashboard} isLoggedIn={isLoggedIn} />} />
        <Route path="E_Complain" element={<ProtectedRoute Component={E_Complain} isLoggedIn={isLoggedIn} />} />
        <Route path="E_Leave" element={<ProtectedRoute Component={E_Leave} isLoggedIn={isLoggedIn} />} />
        <Route path="View_profile" element={<ProtectedRoute Component={View_profile} isLoggedIn={isLoggedIn} />} />

        <Route path="Evaluate_profile" element={<ProtectedRoute Component={Evaluate_profile} isLoggedIn={isLoggedIn} />} />
        <Route path="E_Review" element={<ProtectedRoute Component={E_Review} isLoggedIn={isLoggedIn} />} />
        <Route path="Edit_profile" element={<ProtectedRoute Component={Edit_profile} isLoggedIn={isLoggedIn} />} />
        <Route path="View_attendance" element={<ProtectedRoute Component={View_attendance} isLoggedIn={isLoggedIn} />} />
        <Route path="E_Attendance" element={<ProtectedRoute Component={E_Attendance} isLoggedIn={isLoggedIn} />} />
        <Route path="Leave" element={<ProtectedRoute Component={Leave} isLoggedIn={isLoggedIn} />} />
        <Route path="Complain_Handler" element={<ProtectedRoute Component={Complain_Handler} isLoggedIn={isLoggedIn} />} />
        <Route path="Setting" element={<ProtectedRoute Component={Setting} isLoggedIn={isLoggedIn} />} />
        <Route path="Attendance_date" element={<ProtectedRoute Component={Attendance_date} isLoggedIn={isLoggedIn} />} />
        <Route path="Attendance" element={<ProtectedRoute Component={Attendance} isLoggedIn={isLoggedIn} />} />
        <Route path="OurTeam" element={<ProtectedRoute Component={OurTeam} isLoggedIn={isLoggedIn} />} />
        <Route path="View_Team" element={<ProtectedRoute Component={View_Team} isLoggedIn={isLoggedIn} />} />
        <Route path="View_Employee" element={<ProtectedRoute Component={View_Employee} isLoggedIn={isLoggedIn} />} />
        <Route path="Contact" element={<ProtectedRoute Component={Contact} isLoggedIn={isLoggedIn} />} />
        <Route path="ImageSlider" element={<ProtectedRoute Component={ImageSlider} isLoggedIn={isLoggedIn} />} />
        <Route path="E_Dashboard" element={<ProtectedRoute Component={E_Dashboard} isLoggedIn={isLoggedIn} />} />
        <Route path="Add_Employee" element={<ProtectedRoute Component={AddEmployee} isLoggedIn={isLoggedIn} />} />
        <Route path="Add_Team" element={<ProtectedRoute Component={Add_Team} isLoggedIn={isLoggedIn} />} />
        <Route path="Blog" element={<ProtectedRoute Component={Blog} isLoggedIn={isLoggedIn} />} />
        <Route path="Blog1" element={<ProtectedRoute Component={Blog1} isLoggedIn={isLoggedIn} />} />
        <Route path="Blog2" element={<ProtectedRoute Component={Blog2} isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<ProtectedRoute Component={NoPage} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
