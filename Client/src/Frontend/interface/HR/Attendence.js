import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Menubar from '../../Components/Menubar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Attendance = () => {
  const location = useLocation();
  const { team, date: passedDate } = location.state.bar.person;
  const [employees, setEmployees] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:3002/Employee/')
      .then((response) => {
        const filteredEmployees = response.data.filter((emp) => emp.team === team);
        setEmployees(filteredEmployees);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, [team]);

  useEffect(()=>{
    axios.get('http://localhost:3002/Employee')



  });

const handleAddAttendance = async (employeeId) => {
  try {
    // Check if there is an existing attendance record for the given date
    const existingRecord = employees
      .find((emp) => emp._id === employeeId)
      .attendance.find((att) => att.date === passedDate);

    
    // Update statusMap with the existing status if it exists
    setStatusMap({
      ...statusMap,
      [employeeId]: existingRecord ? existingRecord.status : '',
    });
    
    // Send the request to add/update attendance
    const response = await axios.post(`http://localhost:3002/Employee/employees/${employeeId}/attendance`, {
      date: passedDate,
      status: existingRecord ? existingRecord.status : statusMap[employeeId] || '',
    });
   
    // Update the employees array with the new attendance data
    const updatedEmployees = employees.map((emp) =>
      emp._id === employeeId ? { ...emp, attendance: [...emp.attendance, response.data] } : emp
    );

    // Set the updated employees array
    setEmployees(updatedEmployees);
  } catch (error) {
    console.error('Error adding attendance:', error);
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
        <Sidebar/>
      </aside>

      <div className="flex-grow text-gray-800">
        <Menubar/>
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
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
                      <select
                        value={statusMap[employee._id] || ''}
                        onChange={(e) => setStatusMap({ ...statusMap, [employee._id]: e.target.value })}
                        className="p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <option value="">Select Status</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleAddAttendance(employee._id)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md"
                      >
                        Add Attendance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
    </body>
    </>
  );
};

export default Attendance;
