import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import E_Sidebar from '../../E_Comp/E_Slidebar';
import Menubar from '../../Components/Menubar';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slice/authSlice";

export default function E_Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const location = useLocation();
  const email = location.state;
  const auth = useSelector(selectUser);
  console.log(auth.username)
  

  useEffect(() => {
    // Fetch attendance data using the email
    axios
      .get(`http://localhost:3002/Employee/attendance/${auth.username}`)
      .then((response) => {
        // Update component state with the fetched attendance data
        setAttendanceData(response.data.attendance);
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
        // Handle error appropriately
      });
  }, [email]);

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
      <E_Sidebar/>
    </aside>

    <div className="flex-grow text-gray-800">
      <Menubar/>
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold ml-4 mb-4">Attendance </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left font-semibold text-sm text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left font-semibold text-sm text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance) => (
              <tr key={attendance.id}>
                <td className="py-3 px-4 border-b text-left text-sm">{attendance.date}</td>
                <td className="py-3 px-4 border-b text-left text-sm capitalize">
                  {attendance.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
      </body>


</>
  );
}
