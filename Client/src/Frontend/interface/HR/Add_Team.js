import React, { useState } from 'react';
import Menubar from '../../Components/Menubar';
import Sidebar from '../../Components/Sidebar';
import { useDispatch } from "react-redux";
import addTeamSlice, { setTeam } from '../../Redux/Slice/addTeamSlice';
import axios from 'axios';


const Add_Team = ({ onAddTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');


const dispatch=useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTeam({ teamName, description });
    setTeamName('');
    setDescription('');

  };
function addTeamHandler(){
  const data={
    teamname:teamName,
    description:description

  }

  axios.post("http://localhost:3002/Team/add", data)
  .then(res => {
    console.log(res.data);
    alert('Team Added successfully');
    dispatch(setTeam({
      team:teamName,
      description:description
  
  }))
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while Adding Team.');
  });
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
    <div className="max-w-lg mx-auto my-10 p-8 border rounded shadow-lg">
      <form onSubmit={addTeamHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamName">
            Team Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="teamName"
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter a brief description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={addTeamHandler}
          >
            Add Team
          </button>
        </div>
      </form>
    </div>
    </div>
      </body>
    </>
  );
};

export default Add_Team;
