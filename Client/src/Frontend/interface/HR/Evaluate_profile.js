import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import Menubar from '../../Components/Menubar';

const PerformanceEvaluation = () => {
    const location = useLocation()
    const employee = location.state

    const [rating, setRating] = useState(5);
    const [description, setDescription] = useState('');
    const [month, setMonth] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // POST request to backend API to save the performance evaluation
        axios.post(`http://localhost:3002/Employee/${employee.bar.person._id}/review`, { month, rating, description })
            .then(response => {
                console.log(response.data);
                alert("Review Added");
            })
            .catch(error => {
                console.error('Error posting performance review:', error);
                alert("Error: Can't add review");
            });
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
        <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
            <div className="max-w-lg w-full bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Performance Evaluation</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{employee.bar.person.name}'s Evaluation</h3>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="month">Month of Evaluation</label>
                        <input 
                            type="month" 
                            id="month" 
                            value={month} 
                            onChange={(e) => setMonth(e.target.value)} 
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="rating">Rating (out of 10)</label>
                        <input 
                            type="number" 
                            id="rating" 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)} 
                            min="1" max="10"
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out">
                            Submit Evaluation
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
      </body>
    </>
    );
};

export default PerformanceEvaluation;
