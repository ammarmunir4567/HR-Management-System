import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import Menubar from "../../Components/Menubar";
import LoadingSpinner from '../../Components/LoadingSpinner';

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [empty, setEmpty]=useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch leave requests when the component mounts
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3002/Leave/");
        setLeaveRequests(response.data);
        setEmpty(response.data.length);
        setIsLoading(false); // Stop loading
      } catch (error) {
        setIsLoading(false); // Stop loading
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const grantLeave = async (requestId) => {
    try {
      // Make an Axios PUT request to update the leave status
      await axios.delete(`http://localhost:3002/Leave/leaves/${requestId}`, { status: "Approved" });

      // Remove the granted leave request from the screen
      setLeaveRequests((prevLeaveRequests) =>
        prevLeaveRequests.filter((request) => request._id !== requestId)
      );
    } catch (error) {
      console.error("Error granting leave:", error);
    }
  };

  if (isLoading) {
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
    <LoadingSpinner />; 
    </div>
      </body>
    </>
  )
  }

  if (empty==0) {
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
          <p className='text-center mt-60 font-bold text-6xl'>No Leave Request found</p>
    </div>
      </body>
    </>
  )
  }

  return (
    <> <body className="flex bg-gray-100 min-h-screen">
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
          <Menubar />
          <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4 ml-6">Leave Requests</h1>
            <div className="grid grid-cols-3 gap-4">
              {leaveRequests.map((request) => (
                <div key={request._id} className="bg-white p-4 rounded-md shadow">
                  <h2 className="text-xl font-bold mb-2 ml-2">{request.name}</h2>
                  <p>
                    <strong>Start Date:</strong> {new Date(request.date_of_start).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong> {new Date(request.date_of_end).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Leave Type:</strong> {request.lType}
                  </p>
                  <p>
                    <strong>Description:</strong> {request.reason}
                  </p>

                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                  { (
                    <button
                      className="bg-purple-500 text-white px-2 py-1 mt-2 rounded-md hover:bg-green-400"
                      onClick={() => grantLeave(request._id)}
                    >
                      Grant Leave
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Leave;
