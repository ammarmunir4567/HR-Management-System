import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Menubar from '../../Components/Menubar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewAttendance = () => {
  const location = useLocation();
  const { team, date: passedDate } = location.state.bar.person;
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/Employee/?team=${team}&date=${passedDate}`);
        setEmployees(response.data);
        console.log(employees);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  
    fetchData();
  }, [team, passedDate]);

  const findAttendanceStatus = (employee, searchDate) => {
    const attendanceRecord = employee.attendance.find(
      (att) => new Date(att.date).toISOString() === new Date(searchDate).toISOString()
    );

    return attendanceRecord?.status || 'No Status';
  };

  return (
    <>
      <div className="flex bg-gray-100  md:min-h-screen">
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
          <Sidebar />

        </aside>

        <div className="flex-grow text-gray-800">
          <Menubar />
          <div className="container mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-6">Attendance Management</h1>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{passedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span>{findAttendanceStatus(employee, passedDate)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAttendance;
