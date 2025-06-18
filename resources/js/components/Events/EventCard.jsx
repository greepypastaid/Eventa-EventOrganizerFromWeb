import React from 'react';
import { Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';

// Format time function to handle ISO time strings
const formatTime = (timeString) => {
  if (!timeString) return null;
  
  try {
    // Handle ISO format time strings
    if (timeString.includes('T')) {
      const date = parseISO(timeString);
      return format(date, 'HH:mm');
    }
    
    // Handle simple time strings
    return timeString;
  } catch (error) {
    console.error("Error formatting time:", error);
    return null;
  }
};

// Format date function to handle various date formats
const formatDate = (dateString) => {
  if (!dateString) return 'Date not set';
  
  try {
    return format(new Date(dateString), 'dd MMM yyyy');
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Invalid date';
  }
};

const EventCard = ({ event }) => {
  const formattedDate = formatDate(event.date);
  const formattedTime = formatTime(event.time);
  
  return (
    <Link 
      href={route('events.detail', event.id)} 
      className="block bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl"
    >
      <div className="overflow-hidden relative">
        <img src={event.photo_url} alt={event.title} className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
        <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full capitalize">
          {event.event_type}
          </span>
      </div>
      <div className="p-3 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-gray-800 line-clamp-2">{event.title}</h3>
        <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formattedDate} {formattedTime && `• ${formattedTime}`}</span>
        </div>
        {event.location && (
          <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <p className="text-indigo-600 font-semibold text-sm sm:text-base">
            {event.ticket_price > 0 
              ? `Rp${new Intl.NumberFormat('id-ID').format(event.ticket_price)}`
              : 'Gratis'}
          </p>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 rounded-full">
            Detail
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard; 