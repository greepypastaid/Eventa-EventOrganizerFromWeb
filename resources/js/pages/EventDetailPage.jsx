import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';

// Icons
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PeopleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// Mock event data for different events
const eventDatabase = {
  1: {
    id: 1,
    title: "Tech Conference 2024",
    date: "25-27 October 2024",
    location: "at Jakarta",
    fullLocation: "Jakarta Convention Center",
    description: "Join us for the biggest tech conference in Indonesia featuring workshops, keynotes, and networking opportunities with industry leaders.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=2070&q=60",
    price: "$50.00",
    guestStars: "Leading Tech CEOs and Innovators",
    eventDate: "2025-10-25T09:00:00"
  },
  2: {
    id: 2,
    title: "Jazz Festival",
    date: "12 November 2024",
    location: "at Jakarta",
    fullLocation: "GBK, Jakarta",
    description: "Experience a night of smooth jazz under the stars with performances from both local and international jazz musicians.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=2070&q=60",
    price: "$35.00",
    guestStars: "Top Jazz Musicians from Around the World",
    eventDate: "2025-11-12T19:30:00"
  },
  3: {
    id: 3,
    title: "Startup Pitching Day",
    date: "5 December 2024",
    location: "at Online Event",
    fullLocation: "Virtual Conference Platform",
    description: "Join us for an exciting day of startup pitches, where innovative entrepreneurs present their ideas to potential investors.",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=2070&q=60",
    price: "Free",
    guestStars: "Venture Capitalists and Angel Investors",
    eventDate: "2025-12-05T10:00:00"
  },
  4: {
    id: 4,
    title: "Sunset Above the Clouds Tour",
    date: "18 November 2024",
    location: "at Bandung",
    fullLocation: "Saburai Field, Bandung",
    description: "A magical evening with live music as the sun sets over Bandung. Don't miss this unforgettable concert experience.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=2070&q=60",
    price: "$45.00",
    guestStars: "Popular Indie Band & Special Guests",
    eventDate: "2025-11-18T18:00:00"
  },
  5: {
    id: 5,
    title: "World Tour: The Final Chapter",
    date: "25 November 2024",
    location: "at Jakarta",
    fullLocation: "GBK Main Stadium, Jakarta",
    description: "The legendary rock group's final world tour. Experience the magic one last time with their greatest hits and spectacular stage production.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=60",
    price: "$75.00",
    guestStars: "Legendary Rock Group with Special Opening Acts",
    eventDate: "2025-11-25T20:00:00"
  },
  6: {
    id: 6,
    title: "Acoustic Night Special",
    date: "10 December 2024",
    location: "at Jakarta",
    fullLocation: "Grand Theater, Jakarta",
    description: "An intimate evening of acoustic performances by a renowned female solo artist. Experience her beautiful voice in a stripped-back setting.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=2070&q=60",
    price: "$30.00",
    guestStars: "Award-winning Female Solo Artist",
    eventDate: "2025-12-10T19:00:00"
  }
};

// Countdown timer component
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    
    // Return all zeros if the date has passed
    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });
  
  return (
    <div className="mb-8">
      <p className="mb-4">Will be held in:</p>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.days}
          </div>
          <span className="mt-2">Days</span>
        </div>
        <div className="flex items-center text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.hours}
          </div>
          <span className="mt-2">Hours</span>
        </div>
        <div className="flex items-center text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.minutes}
          </div>
          <span className="mt-2">Minutes</span>
        </div>
        <div className="flex items-center text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-20 h-20 rounded-lg flex items-center justify-center text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.seconds}
          </div>
          <span className="mt-2">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default function EventDetailPage(props) {
  const { auth } = usePage().props;
  const Layout = auth.user ? AuthenticatedLayout : GuestLayout;
  
  // Get the event ID from props
  const eventId = props.eventId ? parseInt(props.eventId) : 1;
  
  // Get the event data from our mock database
  const eventData = eventDatabase[eventId] || eventDatabase[1];
  
  // Log for debugging
  useEffect(() => {
    console.log("Event ID:", eventId);
    console.log("Event Data:", eventData);
  }, [eventId, eventData]);

  return (
    <Layout>
      <Head title={eventData.title} />

      {/* Hero Section with Countdown */}
      <div className="relative">
        <div className="relative text-white">
          <div className="absolute inset-0">
            <img 
              src={eventData.image} 
              alt={eventData.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/60 to-purple-900/40"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 py-32">
            <div className="max-w-4xl">
              <p className="font-semibold mb-2 tracking-wider">Detailed of</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{eventData.title}</h1>
              <p className="text-lg text-gray-200 mb-8">{eventData.date} {eventData.location}</p>
              
              {/* Real-time Countdown Timer */}
              <CountdownTimer targetDate={eventData.eventDate} />
              
              <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors">
                Book Now!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column - Event Information */}
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">Detailed Information</h2>
              <p className="text-gray-600 mb-10">{eventData.description}</p>
              
              <div className="space-y-8">
                {/* When */}
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-4">
                    <CalendarIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">When Will Be Held?</h3>
                    <p className="text-gray-600">{eventData.date}</p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-4">
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Location</h3>
                    <p className="text-gray-600">{eventData.fullLocation}</p>
                  </div>
                </div>
                
                {/* Guest Stars */}
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-4">
                    <PeopleIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Guest Stars</h3>
                    <p className="text-gray-600">{eventData.guestStars}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Price Card */}
            <div className="md:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl font-bold text-indigo-600">$</h3>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  </div>
                </div>
                <h4 className="text-4xl font-bold text-gray-800 mb-2">Price*</h4>
                <p className="text-2xl text-gray-600 mb-10">{eventData.price}</p>
                
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                  Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-12 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Want to create your own<br/>Event just in a minutes?
            </h2>
            <p className="text-gray-600 mb-8">All in one event manager!</p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
              Create Now!
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
} 