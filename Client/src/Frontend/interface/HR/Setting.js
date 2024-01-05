import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import Menubar from '../../Components/Menubar'
import { useLocation } from 'react-router-dom'
import E_Sidebar from '../../E_Comp/E_Slidebar'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slice/authSlice"

export default function Setting() {
    
    const location = useLocation();
    const bar=location.state.bar;
    // const email=location.state.email;
    // console.log(email);


const auth = useSelector(selectUser);
console.log(auth.username)
const email=auth.username

    const [newPassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isValidPassword = (password) => {
      const minLength = 10;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      return password.length >= minLength && hasUpperCase && hasSpecialChar;
  };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Add validation if needed, for example, check if passwords match
        if (newPassword !== confirmPassword) {
          alert("Passwords do not match");
          return;
      }

      if (!isValidPassword(newPassword)) {
          alert("Password must be at least 10 characters long and include at least one uppercase letter and one special character.");
          return;
      }

       else{
    
        axios.post(`http://localhost:3002/User//update-password/${email}`, { newPassword })
  .then(response => {
    console.log(email,newPassword)
    console.log(response.data);
    alert("password changed successfully")
  })
  .catch(error => {
    console.log(email,newPassword)
    alert('Error updating password:', error);
  });

       }
    };

  return (
    <>
   <body className="flex bg-gray-100 min-h-screen">
        <aside className="hidden sm:flex sm:flex-col">
          <a
            href="#"
            className="inline-flex items-center justify-center h-20 w-60 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
          >
            <svg fill="none" viewBox="0 0 64 64" className="h-12 w-12">
              <title>Company logo</title>
              <path
                d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z"
                fill="#fff"
              />
            </svg>
          </a>
          {bar==="E_Sidebar" ? <E_Sidebar /> : <Sidebar />}
        </aside>

        <div className="flex-grow text-gray-800">
          <Menubar/>
    <div className="bg-gray-200 min-h-screen pt-2 font-mono my-16">
        <div className="container mx-auto">
            <div className="inputs w-full max-w-2xl p-6 mx-auto">
                <h2 className="text-2xl text-gray-900">Account Setting</h2>
                <form className="mt-6 border-t border-gray-400 pt-4" onSubmit={handleSubmit}>
            {/* ... other form elements ... */}
            <div className='w-full md:w-1/2 px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Password</label>
                <input
                    className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-gray-500'
                    type='password'
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Re-enter Password</label>
                <input
                    className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-gray-500'
                    type='password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
            </div>
            <div className="flex justify-end">
                <button className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">Save Changes</button>
            </div>
        </form>
            </div>
        </div>
    </div> 
    </div>
      </body>
    </>
  )
}
