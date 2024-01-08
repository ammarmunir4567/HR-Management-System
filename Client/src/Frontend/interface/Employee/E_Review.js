import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slice/authSlice";
import E_Sidebar from '../../E_Comp/E_Slidebar';
import Menubar from '../../Components/Menubar';
import LoadingSpinner from '../../Components/LoadingSpinner';

const E_Review = ({ employeeId }) => {
    const auth = useSelector(selectUser);
    console.log(auth.id)
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3002/Employee/${auth.id}/reviews`)
            .then(response => {
                setReviews(response.data);
                setIsLoading(false); // Stop loading
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setIsLoading(false); // Stop loading
            });
    }, [employeeId]);
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
          <E_Sidebar/>
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
          <E_Sidebar/>
        </aside>
    
        <div className="flex-grow text-gray-800">
          <Menubar/>
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold text-center mb-6">Your Performance Reviews</h2>
            {reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-2">Review for {new Date(review.month).toLocaleDateString()}</h3>
                            <p className="text-gray-600 mb-2">Rating: {review.rating} / 10</p>
                            <p className="text-gray-700">{review.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-4">No reviews available.</p>
            )}
        </div>
        </div>
      </body>


</>
    );
};

export default E_Review;
