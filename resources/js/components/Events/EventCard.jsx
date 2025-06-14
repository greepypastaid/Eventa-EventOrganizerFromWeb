import React from 'react';
import { Link } from '@inertiajs/react';

const EventCard = ({ event }) => (
  <Link 
    href={`/events/${event.id}`} 
    className="block bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl"
  >
    <div className="overflow-hidden relative">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
      {event.category && (
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
          {event.category}
        </span>
      )}
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold mb-2 text-gray-800">{event.title}</h3>
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{event.date}</span>
      </div>
      {event.location && (
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
      )}
      <div className="flex justify-between items-center">
        <p className="text-indigo-600 font-semibold">{event.price}</p>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
          Details
        </span>
      </div>
    </div>
  </Link>
);

export default EventCard; 