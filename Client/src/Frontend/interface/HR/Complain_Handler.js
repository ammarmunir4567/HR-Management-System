
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import Menubar from '../../Components/Menubar';
import LoadingSpinner from '../../Components/LoadingSpinner';

const Complain_Handler = () => {
    const [complaints, setComplaints] = useState([]);
    const [empty, setEmpty]=useState(1);
    const [isLoading, setIsLoading] = useState(true);

       // Function to handle complaint resolution
       const resolveComplaint = async (complaintId) => {
        try {
            const updatedComplaint = await axios.delete(`http://localhost:3002/Complain/complaints/${complaintId}`, { status: 'Resolved' });
            setComplaints(complaints.map(complaint => 
                complaint.id === complaintId ? updatedComplaint.data : complaint
            ));
        } catch (error) {
            console.error('Error updating complaint:', error);
        }
    };
    // Fetch complaints from the server
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('http://localhost:3002/Complain/');
                setComplaints(response.data);
                setEmpty(response.data.length);
                setIsLoading(false); // Stop loading
            } catch (error) {
                console.error('Error fetching complaints:', error);
                setIsLoading(false); // Stop loading
            }
        };

        fetchComplaints();
    }, [resolveComplaint]);

 

    

    
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
          <p className='text-center mt-60 font-bold text-6xl'>No complain found</p>
    </div>
      </body>
    </>
  )
  }

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
                    <div className="container mx-auto mt-8">
                        <h1 className="text-3xl font-bold mb-4 ml-4">Employee Complaints</h1>
                        <div className="grid grid-cols-3 gap-4">
                            {complaints.map((complaint) => (
                                <div key={complaint.id} className="bg-white p-4 rounded-md shadow">
                                    {/* <p>{complaint._id}</p> */}
                                    <h2 className="text-xl font-bold mb-2">{complaint.name}</h2>
                                    
                                    <p><strong>Category:</strong> {complaint.category}</p>
                                    <p><strong>Description:</strong> {complaint.description}</p>
                                    <p><strong>Status:</strong> {complaint.status} open </p>
                                    
                                        <button
                                            className="bg-purple-500 text-white px-2 py-1 mt-2 rounded-md hover:bg-blue-400"
                                            onClick={() => resolveComplaint(complaint._id)}
                                        >
                                            Resolve Complaint
                                        </button>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
};

export default Complain_Handler;
