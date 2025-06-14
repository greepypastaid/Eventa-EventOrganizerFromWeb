import React from 'react';
import EventCard from './EventCard';
import { Link } from '@inertiajs/react';

// Combined dummy data from Events and Concerts pages
const events = {
  another: [
    {
      id: 1,
      title: 'Tech Conference 2024',
      category: 'Technology',
      date: '25-27 October 2024',
      location: 'Jakarta Convention Center',
      price: '$50.00',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 2,
      title: 'Jazz Festival',
      category: 'Music',
      date: '12 November 2024',
      location: 'GBK, Jakarta',
      price: '$35.00',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 3,
      title: 'Startup Pitching Day',
      category: 'Business',
      date: '5 December 2024',
      location: 'Online Event',
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=800&q=60'
    },
  ],
  popular: [
    {
      id: 4,
      title: 'Sunset Above the Clouds Tour',
      category: 'Concert',
      date: '18 November 2024',
      location: 'Saburai Field, Bandung',
      price: '$45.00',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 5,
      title: 'World Tour: The Final Chapter',
      category: 'Concert',
      date: '25 November 2024',
      location: 'GBK Main Stadium, Jakarta',
      price: '$75.00',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 6,
      title: 'Acoustic Night Special',
      category: 'Concert',
      date: '10 December 2024',
      location: 'Grand Theater, Jakarta',
      price: '$30.00',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=800&q=60'
    },
  ],
};

const SectionTitle = ({ children }) => (
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-900 relative inline-block">
            {children}
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 transform translate-y-2 rounded"></span>
        </h2>
        <Link href="#" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
        </Link>
    </div>
);

function EventList() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        
        <div className="mb-16">
          <SectionTitle>Upcoming Events</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.another.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle>Popular Concerts</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.popular.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventList; 