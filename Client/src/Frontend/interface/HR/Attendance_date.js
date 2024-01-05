import React, { useEffect, useState } from 'react';
import Menubar from '../../Components/Menubar';
import Sidebar from '../../Components/Sidebar';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button } from 'bootstrap';



const App = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [teams, setTeams] = useState([]);

  const person={
    team:selectedTeam,
    date:selectedDate
  }

  useEffect(() => {
    // Fetch teams from the server when the component mounts
    axios.get('http://localhost:3002/Team/')
      .then(response => {setTeams(response.data)
        console.log(teams)
      })
      
      .catch(error => {console.error('Error fetching teams:', error)
  
    });
  }, []); 

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Selected Team:', selectedTeam);
    console.log('Selected Date:', selectedDate);
  };

  const isSelectionValid = selectedTeam && selectedDate;

  return ( <>
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
    <div className="container mx-auto p-8 max-w-md bg-gray-100 rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-500">Attendance</h1>
      <div className="mb-4">
        <label htmlFor="team" className="text-gray-700 block mb-2">
          Select Team:
        </label>
        <select onChange={handleTeamChange} value={selectedTeam}>
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.teamname}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="text-gray-700 block mb-2">
          Pick a Date:
        </label>
        <input
          type="date"
          id="date"
          onChange={handleDateChange}
          value={selectedDate}
          className={`p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300`}
        />
      </div>

      {isSelectionValid && (
      <Link to="/Attendance" state={{ bar: { person } }}
        onClick={handleSubmit}
        className={`bg-purple-500 text-white p-3 rounded w-full`}
        disabled={!selectedTeam || !selectedDate}
      >
        Add Attendance
      </Link>

      )}

      {isSelectionValid && (
      <Link to="/View_attendance" state={{ bar: { person } }}
      
      className={" bg-purple-500 ml-6 text-white p-3 rounded w-full"}
      disabled={!selectedTeam || !selectedDate}
    
        
      >
        View Attendance
      </Link>
)}
    </div>
    </div>
      </body>
    </>
  );
};

export default App;
