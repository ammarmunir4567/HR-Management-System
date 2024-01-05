import React, { useEffect, useState } from "react";

import Menubar from "../../Components/Menubar";
import Info from "../../Components/Info";
import E_Sidebar from "../../E_Comp/E_Slidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../Redux/Slice/authSlice';


export default function E_Dashboard() {
  const location = useLocation();
  const username = location.state;
 

  const [employeeData, setEmployeeData] = useState([]);
  const count = useSelector((state) => state.username)
console.log(count);
  useEffect(() => {
    if (username) {
      console.log(username)
      axios.get(`http://localhost:3002/Employee/employee/find/${username.username}`)
        .then(response => {
          setEmployeeData(response.data);
            
        // dispatch(login({
        //   username: username.username,
       
        // }));
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
          // Handle error appropriately
        });
    }
  }, [username]);
  console.log(employeeData.role)


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
          <E_Sidebar email={employeeData.email} />
        </aside>

        <div className="flex-grow text-gray-800">
          <Menubar name={employeeData.name} role={employeeData.role}/>
          <Info/>
        
        </div>
      </body>
    </>
  );
}
