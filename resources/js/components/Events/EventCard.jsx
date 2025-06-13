import React from 'react';

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl">
    <div className="overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold mb-2 text-gray-800">{event.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{event.date}</p>
      <p className="text-indigo-600 font-semibold">{event.price}</p>
    </div>
  </div>
);

export default EventCard; 