import React, { useState } from 'react';
import Menubar from '../../Components/Menubar';
import E_Sidebar from '../../E_Comp/E_Slidebar';
import axios from 'axios';

const E_Leave = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');

  const submitApplication = () => {
    console.log("name :",name)
    console.log('Leave Application Details:');
    console.log('Leave Type:', leaveType);
    console.log('Reason:', reason);

    const data={
      name:name,
      date_of_start:startDate,
      date_of_end:endDate,
      lType:leaveType,
      reason:reason
    }

    axios.post(`http://localhost:3002/Leave/add`, data)
    .then(res => {
      console.log(res.data);
      alert('Leave request done successfully');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while submitting Leave request.');
    });
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
          <E_Sidebar/>
        </aside>

        <div className="flex-grow text-gray-800">
          <Menubar/>
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Leave Application</h1>
      <form>
      <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>





        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Start Date:
          </label>
          <input
            type="date"
            id="date"
            className="w-full p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Ending Date:
          </label>
          <input
            type="date"
            id="date"
            className="w-full p-2 border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>




        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="leaveType">
            Leave Type:
          </label>
          <select
            id="leaveType"
            className="w-full p-2 border rounded"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select Leave Type</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="reason">
            Reason for Application:
          </label>
          <textarea
            id="reason"
            className="w-full p-2 border rounded"
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-purple-500 text-white p-2 rounded"
          onClick={submitApplication}
        >
          Submit Application
        </button>
      </form>
    </div>
    </div>
      </body>
      </>
  );
};

export default E_Leave;
