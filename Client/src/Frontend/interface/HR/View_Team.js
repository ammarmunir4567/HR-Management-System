import React, { useState, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog';
import Sidebar from '../../Components/Sidebar';
import Menubar from '../../Components/Menubar';
import { Link} from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../Components/LoadingSpinner';


export default function ViewTeam() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch teams from the server when the component mounts
    axios.get('http://localhost:3002/Team/')
      .then(response => {setTeams(response.data)
        setIsLoading(false); // Stop loading
      })
      
      .catch(error => {console.error('Error fetching teams:', error)
      setIsLoading(false);
    });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const deleteTeam = (teamId) => {
    // Make a DELETE request to remove a team
    axios.delete(`http://localhost:3002/Team/delete/${teamId}`)
      .then(() => {
        // After successfully deleting a team, fetch the updated list of teams
        axios.get('http://localhost:3002/Team/')
          .then(response => setTeams(response.data))
          .catch(error => console.error('Error fetching teams:', error));
      })
      .catch(error => console.error('Error deleting team:', error));
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {teams.map((team, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="bg-purple-500 text-white py-4 px-6 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{team.teamname}</h2>
                  <div className="flex space-x-2">
                    {/* <button className="text-white" onClick={() => updateTeam(index, team._id)}>
                      Update
                    </button> */}
                    <button className="text-white" onClick={() => deleteTeam(team._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-center">
                    <Link
                      to="/View_Employee" state={{bar:team.teamname}}
                      className="bg-purple-500 text-white py-2 px-4 rounded-full"
                    >
                      View Members
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </body>
    </>
  );
}
