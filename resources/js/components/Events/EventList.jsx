import React from 'react';
import EventCard from './EventCard';

const events = {
  another: [
    {
      id: 1,
      title: 'Penanaman Mangrove',
      date: '22 April 2025 - Hutan Mangrove Semarang',
      price: 'Free for Join',
      image: 'https://images.unsplash.com/photo-1590622212354-913320341753?q=80&w=300&h=200&fit=crop&auto=format',
    },
    {
      id: 2,
      title: 'Fun Run Semarang 2025',
      date: '25 April 2025 - Simpang Lima Semarang',
      price: 'Rp25.000,00',
      image: 'https://images.unsplash.com/photo-1594734439223-a1210b395b3d?q=80&w=300&h=200&fit=crop&auto=format',
    },
    {
      id: 3,
      title: 'Borobudur Marathon 2025',
      date: '30 April 2025 - Borobudur Magelang',
      price: 'Rp50.000,00',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd402907?q=80&w=300&h=200&fit=crop&auto=format',
    },
  ],
  popular: [
    {
      id: 4,
      title: 'Fun Run Semarang 2025',
      date: '25 April 2025 - Simpang Lima Semarang',
      price: 'Rp25.000,00',
      image: 'https://images.unsplash.com/photo-1594734439223-a1210b395b3d?q=80&w=300&h=200&fit=crop&auto=format',
    },
    {
      id: 5,
      title: 'Borobudur Marathon 2025',
      date: '30 April 2025 - Borobudur Magelang',
      price: 'Rp50.000,00',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd402907?q=80&w=300&h=200&fit=crop&auto=format',
    },
     {
      id: 6,
      title: 'Penanaman Mangrove',
      date: '22 April 2025 - Hutan Mangrove Semarang',
      price: 'Free for Join',
      image: 'https://images.unsplash.com/photo-1590622212354-913320341753?q=80&w=300&h=200&fit=crop&auto=format',
    },
  ],
};

const SectionTitle = ({ children }) => (
    <h2 className="text-3xl font-bold mb-8 text-indigo-900 relative inline-block">
        {children}
        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 transform translate-y-2 rounded"></span>
    </h2>
);

function EventList() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        
        <div className="mb-16">
          <SectionTitle>Another Events</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.another.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Popular Events</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.popular.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventList; 