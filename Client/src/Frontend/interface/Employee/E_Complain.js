import React, { useState } from 'react'
import E_Sidebar from '../../E_Comp/E_Slidebar'
import Menubar from '../../Components/Menubar'
import axios from 'axios';

export default function E_Complain() {

  const [name,setName]=useState("");
  const [category,setCategory]=useState("");
  const [describe,setDescribe]=useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    // For example, you can send this data to your server
    const data={
      name:name,
      category:category,
      description:describe,
      status:true
    }

    axios.post("http://localhost:3002/Complain/complaints", data)
      .then(res => {
        console.log(res.data);
        alert('Complaint submitted successfully');
       
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while lodging complain.');
      });

    console.log({ name, category, describe });

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
     <div className="w-full md:w-96 md:max-w-full mx-auto">
  <div className="p-6 border border-gray-300 sm:rounded-md">
  <form onSubmit={handleSubmit}>
            <label className="block mb-6">
              <span className="text-gray-700">Your name</span>
              <input
                name="name"
                type="text"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Joe Bloggs"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="block mb-6">
              <p className="text-gray-700">Category</p>
              <select
                className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="Work Environment">Work Environment</option>
                <option value="Team Collaboration">Team Collaboration</option>
                <option value="Managerial Support">Managerial Support</option>
              </select>
            </label>

            <label className="block mb-6">
              <span className="text-gray-700">What's wrong?</span>
              <textarea
                name="message"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
                placeholder="Please describe your problem"
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              ></textarea>
            </label>

            <div className="mb-6">
              <button
                type="submit"
                className="h-10 px-5 text-indigo-100 bg-purple-500 rounded-lg transition-colors duration-150 focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
  </div>
</div>
</div>
      </body>
    </>
  )
}
