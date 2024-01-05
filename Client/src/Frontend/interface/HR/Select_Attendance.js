import React, { useState } from 'react';

function Select_Attendance() {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const teams = ["Team A", "Team B", "Team C", "Team D"];

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Selected Team: ${selectedTeam}\nSelected Date: ${selectedDate}`);
    
  };

  return (
   <>
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Attendance Selector</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Team:
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedTeam}
            onChange={handleTeamChange}
          >
            <option value="">Select a Team</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>{team}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Date:
          </label>
          <input
            type="date"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
   
   </>
  );
}

export default Select_Attendance;
