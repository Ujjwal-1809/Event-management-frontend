import React, { useEffect, useState } from 'react';
import { useEventStore } from '../store/useEventStore.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { events, getEvents } = useEventStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getEvents(); // Fetch events on mount
  }, []);

  useEffect(() => {
    setFilteredEvents(events); // Initialize filtered events when events are fetched
  }, [events]);

  const handleSearch = () => {
    const filtered = events.filter((event) => {
      const matchesTitle = event.title.toLowerCase().includes(searchQuery.toLowerCase()); // returns an event with matching title with searchQuery.
      const matchesDate = searchDate ? event.date.split('T')[0] === searchDate : true; // if the event date matches with the searched date, filter that event, else filter all the events.
      return matchesTitle && matchesDate;
    });

    setFilteredEvents(filtered); //filtered events according to the above conditions.
  };

  return (
    <div className="mt-16 min-h-screen flex flex-col items-center py-10 px-4 sm:px-8 bg-gray-100">
      {/* Search and Filter Section */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center gap-4 mb-8">
        <input
          className="w-48 sm:w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          className="w-40 sm:w-1/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button 
          className="w-36 p-2 text-white bg-indigo-500 rounded-lg shadow-sm cursor-pointer hover:bg-indigo-700"
          onClick={handleSearch}
        >
          Search Event
        </button>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <p className="text-gray-600 text-lg">No events found</p>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="h-48 bg-gray-200">
                <img
                  className="w-full h-full object-cover"
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <div className="p-5">
                <h5 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h5>
                <p className="text-gray-700 text-sm mb-3">{item.location}</p>
                <h3 className="text-sm font-semibold text-indigo-600 mb-4">
                  {new Date(item.date).toLocaleDateString()}
                </h3>
                <button onClick={() => navigate(`/event/${item._id}`)} className="cursor-pointer w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
