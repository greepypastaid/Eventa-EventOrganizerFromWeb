import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import Footer from '@/components/layout/Footer';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';

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

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Countdown timer component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    // Function to calculate time left
    const calculateTimeLeft = () => {
      try {
        // Get current date
        const now = new Date();
        console.log('Current time:', now);
        console.log('Target time:', targetDate);
        
        // Calculate difference in milliseconds
        const difference = targetDate - now;
        console.log('Time difference in days:', difference / (1000 * 60 * 60 * 24));
        
        // Return all zeros if the date has passed
        if (difference <= 0) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };
        }
        
        // Calculate time units
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } catch (error) {
        console.error("Error calculating time left:", error);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <div className="mb-8">
      <p className="mb-4">Will be held in:</p>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-16 sm:w-20 h-16 sm:h-20 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.days}
          </div>
          <span className="mt-2 text-sm sm:text-base">Days</span>
        </div>
        <div className="flex items-center text-xl sm:text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-16 sm:w-20 h-16 sm:h-20 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.hours}
          </div>
          <span className="mt-2 text-sm sm:text-base">Hours</span>
        </div>
        <div className="flex items-center text-xl sm:text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-16 sm:w-20 h-16 sm:h-20 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.minutes}
          </div>
          <span className="mt-2 text-sm sm:text-base">Minutes</span>
        </div>
        <div className="flex items-center text-xl sm:text-2xl font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 w-16 sm:w-20 h-16 sm:h-20 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold border border-white border-opacity-40">
            {timeLeft.seconds}
          </div>
          <span className="mt-2 text-sm sm:text-base">Seconds</span>
        </div>
      </div>
    </div>
  );
};

// Registration form component
const RegistrationForm = ({ eventId, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    dietaryRestrictions: '',
    specialRequests: ''
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
        <input
          type="text"
          name="organization"
          id="organization"
          value={formData.organization}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
        <input
          type="text"
          name="dietaryRestrictions"
          id="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          placeholder="Vegetarian, vegan, allergies, etc."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests</label>
        <textarea
          name="specialRequests"
          id="specialRequests"
          rows="3"
          value={formData.specialRequests}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register for Event
        </button>
      </div>
    </form>
  );
};

// Ticket component with QR Code
const EventTicket = ({ registration, event }) => {
  const ticketCode = `EVENTA-${registration.id}-${event.id}`;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-gray-600">{event.date} • {event.time}</p>
      </div>
      
      <div className="border-t border-b border-gray-200 py-4 my-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Attendee</p>
            <p className="font-medium">{registration.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ticket ID</p>
            <p className="font-medium">{ticketCode}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <QRCodeSVG 
            value={ticketCode} 
            size={180}
            level="H"
            includeMargin={true}
          />
        </div>
        
        <p className="text-center text-sm text-gray-500">
          Please present this QR code at the event entrance
        </p>
      </div>
    </div>
  );
};

export default function EventDetailPage({ event }) {
  const { auth } = usePage().props;
  const Layout = auth.user ? AuthenticatedLayout : GuestLayout;
  
  // State for registration form and ticket
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  
  // Handle registration submission
  const handleRegister = (formData) => {
    // Create a registration in the database
    axios.post(route('events.register', event.id), {
      ...formData,
      event_id: event.id,
    })
    .then(response => {
      // Set the registration data from the response
      setRegistration(response.data.registration);
      setShowRegistrationForm(false);
    })
    .catch(error => {
      console.error("Registration error:", error);
      alert("There was an error registering for this event. Please try again.");
    });
  };

  // Format the date for display
  const formattedDate = event.date ? format(new Date(event.date), 'eeee, d MMMM yyyy') : 'Date not set';
  
  // Create target date from event date and time
  const createTargetDate = () => {
    if (!event.date) return null;
    
    try {
      // Parse the event date directly since it's already in 2025
      const dateObj = new Date(event.date);
      
      // If we have time, add it to the date
      if (event.time) {
        const timeOnly = event.time.split('T')[1].split('.')[0]; // Get HH:MM:SS
        const [hours, minutes] = timeOnly.split(':');
        dateObj.setHours(parseInt(hours, 10));
        dateObj.setMinutes(parseInt(minutes, 10));
      }

      return dateObj;
    } catch (error) {
      console.error("Error creating target date:", error);
      return null;
    }
  };

  const targetDate = createTargetDate();
  
  return (
    <Layout user={auth.user}>
      <Head title={event.title} />

      {/* Hero Section with Countdown */}
      <div className="relative">
        <div className="relative text-white">
          <div className="absolute inset-0">
            <img 
              src={event.photo_url} 
              alt={event.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/60 to-purple-900/40"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 py-24 sm:py-32">
            <div className="max-w-4xl">
              <p className="font-semibold mb-2 tracking-wider">Event Details</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">{event.title}</h1>
              <p className="text-lg text-gray-200 mb-8">{formattedDate} at {event.location}</p>
              
              {/* Real-time Countdown Timer */}
              {targetDate && <CountdownTimer targetDate={targetDate} />}
              
              {!registration && auth.user && (
                <button 
                  onClick={() => setShowRegistrationForm(true)}
                  className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Register Now!
              </button>
              )}
              {!registration && !auth.user && (
                <Link 
                  href={route('login')}
                  className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Login to Register
              </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('info')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'info' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Event Info
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'schedule' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Schedule
            </button>
            {registration && (
              <button 
                onClick={() => setActiveTab('ticket')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'ticket' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                My Ticket
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-12">
        <div className="container mx-auto px-6">
          {/* Event Information Tab */}
          {activeTab === 'info' && (
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column - Event Information */}
            <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-indigo-600 mb-6">About the Event</h2>
                <p className="text-gray-600 mb-10">{event.description}</p>
              
              <div className="space-y-8">
                {/* When */}
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-4">
                    <CalendarIcon />
                  </div>
                  <div>
                      <h3 className="text-xl font-semibold text-indigo-600 mb-2">When</h3>
                      <p className="text-gray-600">{formattedDate} at {event.time ? event.time : '00:00'}</p>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-4">
                    <LocationIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Location</h3>
                      <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
                
                {/* Guest Stars */}
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-4">
                    <PeopleIcon />
                  </div>
                  <div>
                      <h3 className="text-xl font-semibold text-indigo-600 mb-2">Organizer</h3>
                      <p className="text-gray-600">{event.organizer}</p>
                  </div>
                </div>
              </div>
            </div>
            
              {/* Right Column - Registration Form */}
              <div className="md:w-1/3 mt-10 md:mt-0">
                {showRegistrationForm ? (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-indigo-600 mb-4">Register for {event.title}</h3>
                    <RegistrationForm eventId={event.id} onRegister={handleRegister} />
                  </div>
                ) : registration ? (
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-600 mb-4">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <CheckIcon />
                      </div>
                      <h3 className="text-lg font-semibold">Registration Complete!</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Thank you for registering for {event.title}. Your ticket has been generated.</p>
                    <button
                      onClick={() => setActiveTab('ticket')}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                      View My Ticket
                    </button>
                </div>
                ) : auth.user ? (
                  <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-600 mb-4">Join This Event</h3>
                    <p className="text-gray-600 mb-6">Secure your spot at {event.title}. Register now to receive your ticket with QR code for easy check-in.</p>
                    <p className="font-semibold text-lg mb-6">Price: Rp {event.ticket_price.toLocaleString('id-ID')}</p>
                    <button
                      onClick={() => setShowRegistrationForm(true)}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                      Register Now
                    </button>
                  </div>
                ) : (
                  <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-600 mb-4">Join This Event</h3>
                    <p className="text-gray-600 mb-6">Secure your spot at {event.title}. Please login to register for this event.</p>
                    <p className="font-semibold text-lg mb-6">Price: Rp {event.ticket_price.toLocaleString('id-ID')}</p>
                    <Link
                      href={route('login')}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 inline-block text-center"
                    >
                      Login to Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div>
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">Event Schedule</h2>
              <p className="text-gray-600 mb-8">Here's the detailed schedule for {event.title}. All sessions are subject to change.</p>
              
              <div className="space-y-6">
                {/* Schedule data is not available in the event model yet. This is a placeholder. */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-500">No detailed schedule has been provided for this event yet. Please check back later!</p>
          </div>
        </div>
      </div>
          )}
          
          {/* Ticket Tab */}
          {activeTab === 'ticket' && registration && (
            <div>
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">Your Ticket</h2>
              <p className="text-gray-600 mb-8">Please present this QR code at the event entrance for check-in. You can also add this event to your calendar.</p>
              
              <EventTicket registration={registration} event={event} />
              
              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4">Need help with your registration?</p>
                <Link href="/contact" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Contact Support
                </Link>
              </div>
          </div>
          )}
        </div>
      </div>

      <Footer />
    </Layout>
  );
} 