// import React, { useState } from "react";
// import Sidebar from "../../Components/Sidebar";
// import Menubar from "../../Components/Menubar";
// const Leave = () => {

  
//   // Dummy data for leave requests
//   const dummyLeaveRequests = [
//     { id: 1, employee: "John Doe", startDate: "2023-11-20", endDate: "2023-11-25", status: "Pending" },
//     { id: 2, employee: "Jane Smith", startDate: "2023-12-05", endDate: "2023-12-10", status: "Pending" },
//     { id: 3, employee: "Bob Johnson", startDate: "2023-12-15", endDate: "2023-12-20", status: "Pending" },
//   ];

//   // State to manage leave requests
//   const [leaveRequests, setLeaveRequests] = useState(dummyLeaveRequests);

//   useEffect(() => {
//     // Fetch leave requests from the server
//     const fetchLeaveRequests = async () => {
//       try {
//         const response = await axios.get('/api/leaves');
//         setLeaveRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching leave requests:', error);
//       }
//     };

//     fetchLeaveRequests();
//   }, []);

//   // Function to handle leave request approval
//   const grantLeave = (requestId) => {
//     // Find the leave request by id
//     const updatedLeaveRequests = leaveRequests.map((request) =>
//       request.id === requestId ? { ...request, status: "Approved" } : request
//     );

//     // Update the state with the modified leave request
//     setLeaveRequests(updatedLeaveRequests);
    
//   };

//   return (
//     <>
//     <body className="flex bg-gray-100 min-h-screen">
//       <aside className="hidden sm:flex sm:flex-col">
//         <a
//           href="#"
//           className="inline-flex items-center justify-center h-20 w-60 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
//         >
//           <svg fill="none" viewBox="0 0 64 64" className="h-12 w-12">
//             <title>Company logo</title>
//             <path
//               d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z"
//               fill="#fff"
//             />
//           </svg>
//         </a>
//         <Sidebar/>
//       </aside>

//       <div className="flex-grow text-gray-800">
//         <Menubar/>
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4">Leave Requests</h1>
//       <div className="grid grid-cols-3 gap-4">
//         {leaveRequests.map((request) => (
//           <div key={request.id} className="bg-white p-4 rounded-md shadow">
//             <h2 className="text-xl font-bold mb-2">{request.employee}</h2>
//             <p>
//               <strong>Start Date:</strong> {request.startDate}
//             </p>
//             <p>
//               <strong>End Date:</strong> {request.endDate}
//             </p>
//             <p>
//               <strong>Status:</strong> {request.status}
//             </p>
//             {request.status === "Pending" && (
//               <button
//                 className="bg-purple-500 text-white px-2 py-1 mt-2 rounded-md hover:bg-green-400"
//                 onClick={() => grantLeave(request.id)}
//               >
//                 Grant Leave
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//       </body>
//     </>
//   );
// };

// export default Leave;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import Menubar from "../../Components/Menubar";

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch leave requests when the component mounts
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3002/Leave/");
        setLeaveRequests(response.data);
      } catch (error) {
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
                    <strong>Start Date:</strong> {request.date_of_start}
                  </p>
                  <p>
                    <strong>End Date:</strong> {request.date_of_end}
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
