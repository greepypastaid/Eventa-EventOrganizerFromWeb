import React from 'react';
import EventCard from './EventCard';
import { Link } from '@inertiajs/react';

const SectionTitle = ({ children, viewAllLink }) => (
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-900 relative inline-block">
            {children}
            <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-500 transform translate-y-2 rounded"></span>
        </h2>
        {viewAllLink && (
            <Link href={viewAllLink} className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
        </Link>
        )}
    </div>
);

function EventList({ events, title = "Upcoming Events", viewAllLink = null }) {
  // Debug events
  console.log('EventList received events:', events);
  
  const regularEvents = events?.filter(event => event.event_type === 'regular') || [];
  const concerts = events?.filter(event => event.event_type === 'concert') || [];
  
  // Debug filtered events
  console.log('Regular events:', regularEvents);
  console.log('Concert events:', concerts);
  
  // On the homepage, we might get a mix. On dedicated pages, we only get one type.
  // Changed the logic to detect homepage more effectively
  const isHomePage = true; // Always show both sections if events exist

  if (!events || events.length === 0) {
    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-6">
                <SectionTitle>{title}</SectionTitle>
                <p>No events found.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        
        {isHomePage ? (
          <>
            {regularEvents.length > 0 && (
              <div className="mb-16">
                <SectionTitle viewAllLink={route('events')}>Upcoming Events</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {concerts.length > 0 && (
              <div>
                <SectionTitle viewAllLink={route('concerts')}>Popular Concerts</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {concerts.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <SectionTitle viewAllLink={viewAllLink}>{title}</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList; 