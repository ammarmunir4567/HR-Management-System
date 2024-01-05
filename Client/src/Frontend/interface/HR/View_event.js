import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import Menubar from '../../Components/Menubar';
import { useLocation } from 'react-router-dom';
import E_Sidebar from '../../E_Comp/E_Slidebar';

const View_event = () => {
    const location = useLocation();
    const bar=location.state.bar;
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3002/Event/');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-xl font-semibold">Loading events...</div>
        </div>;
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
          {bar==="E_Sidebar" ? <E_Sidebar /> : <Sidebar />}
        </aside>
    
        <div className="flex-grow text-gray-800">
              <Menubar />
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-purple-600 mb-3">{event.title}</h3>
                            <p className="text-gray-700 mb-4">{event.description}</p>
                            <div className="text-gray-600 text-sm">
                                <div className="mb-2"><span className="font-semibold">Start:</span> {new Date(event.startDate).toLocaleDateString()}</div>
                                <div><span className="font-semibold">End:</span> {new Date(event.endDate).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
            </body>
        </>
    );
};

export default View_event;
