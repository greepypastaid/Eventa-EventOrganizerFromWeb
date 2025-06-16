import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import Footer from '@/components/layout/Footer';
import { QRCodeSVG } from 'qrcode.react';
import { format, parseISO } from 'date-fns';
import MainNavbar from '@/Components/MainNavbar';

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
const RegistrationForm = ({ eventId, onRegister, eventTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
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
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {eventTitle ? `Register for ${eventTitle}` : 'Secure My Spot'}
        </button>
      </div>
    </form>
  );
};

// Ticket component with QR Code
const EventTicket = ({ registration, event }) => {
  const ticketCode = `EVENTA-${registration.id}-${event.id}`;
  
  // Format the time for ticket display
  const formatTicketTime = (timeString) => {
    if (!timeString) return '00:00';
    
    try {
      // Handle ISO format time strings
      if (timeString.includes('T')) {
        const date = parseISO(timeString);
        return format(date, 'HH:mm');
      }
      
      // Handle simple time strings
      return timeString;
    } catch (error) {
      console.error("Error formatting time for ticket:", error);
      return '00:00';
    }
  };
  
  const formattedDate = event.date ? format(new Date(event.date), 'eeee, d MMMM yyyy') : 'Date not set';
  const formattedTime = formatTicketTime(event.time);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-gray-600">{formattedDate} • {formattedTime}</p>
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
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Track scroll position to adjust navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Get related events by the same organizer - improved approach
  useEffect(() => {
    if (event && event.organizer) {
      // Check if organizer name is empty or too short
      if (!event.organizer.trim() || event.organizer.trim().length < 2) {
        console.warn("Organizer name is empty or too short, cannot fetch related events");
        setIsLoadingEvents(false);
        setFetchError("Organizer name is not valid");
        return;
      }
      
      setIsLoadingEvents(true);
      setFetchError(null);
      
      console.log(`Fetching related events for organizer: "${event.organizer}", excluding event ID: ${event.id}`);
      
      // Properly encode the organizer parameter and use axios for better error handling
      axios.get(`/api/events`, {
        params: {
          organizer: event.organizer,
          exclude_id: event.id,
          limit: 5
        }
      })
      .then(response => {
        console.log("API Response:", response.data);
        if (response.data && response.data.events) {
          console.log(`Found ${response.data.events.length} related events`);
          setRelatedEvents(response.data.events);
        } else {
          console.warn("API response missing 'events' property:", response.data);
          setRelatedEvents([]);
        }
        setIsLoadingEvents(false);
      })
      .catch(error => {
        console.error("Error fetching related events:", error);
        setFetchError(error.message || "Failed to fetch related events");
        setRelatedEvents([]);
        setIsLoadingEvents(false);
      });
    } else {
      console.warn("Cannot fetch related events: event or event.organizer is undefined");
      setIsLoadingEvents(false);
    }
  }, [event]);
  
  // Handle registration submission
  const handleRegister = (formData) => {
    // Create a registration in the database
    axios.post(route('events.register', event.id), {
      ...formData,
      event_id: event.id,
      organization: null,
      dietaryRestrictions: null,
      specialRequests: null
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
  
  // Format the time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'Time not set';
    
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
      return 'Time not set';
    }
  };
  
  const formattedTime = formatTime(event.time);
  
  // Calculate event duration (if start_time and end_time are available)
  const getEventDuration = () => {
    if (event.start_time && event.end_time) {
      const startTime = formatTime(event.start_time);
      const endTime = formatTime(event.end_time);
      return `${startTime} - ${endTime}`;
    } else if (event.time) {
      return formattedTime;
    }
    return 'Time not specified';
  };
  
  // Create target date from event date and time
  const createTargetDate = () => {
    if (!event.date) return null;
    
    try {
      // Parse the event date
      const dateObj = new Date(event.date);
      
      // If we have time, add it to the date
      if (event.time) {
        let timeOnly;
        
        // Handle ISO format time strings
        if (event.time.includes('T')) {
          const timeParts = event.time.split('T')[1].split('.')[0].split(':'); // Get HH:MM:SS
          dateObj.setHours(parseInt(timeParts[0], 10));
          dateObj.setMinutes(parseInt(timeParts[1], 10));
        } else {
          // Handle simple time format
          const timeParts = event.time.split(':');
          dateObj.setHours(parseInt(timeParts[0], 10));
          dateObj.setMinutes(parseInt(timeParts[1], 10));
        }
      }

      return dateObj;
    } catch (error) {
      console.error("Error creating target date:", error);
      return null;
    }
  };

  const targetDate = createTargetDate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Navbar with transparent effect */}
      <div className={`${isScrolled ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50 transition-all duration-300`}>
        <div className="container mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
          <div className={`${isScrolled ? 'bg-white/90' : 'bg-white/20'} backdrop-blur-sm rounded-3xl px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-lg border border-white/20 transition-all duration-300`}>
            {/* Logo */}
            <div className="flex items-center">
              <Link href={route('home')} className={`flex items-center ${isScrolled ? 'text-indigo-700' : 'text-white'}`}>
                <img 
                  src="/images/logo.png" 
                  alt="Eventa Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 mr-1 sm:mr-2 object-contain"
                />
                <span className="text-xl sm:text-2xl font-bold">Eventa</span>
              </Link>
            </div>

            {/* Main Navigation - Desktop */}
            <div className="hidden md:flex space-x-8">
              <Link 
                href={route('home')} 
                className={`${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('home') ? 'font-semibold' : ''}`}
              >
                Home
              </Link>
              <Link 
                href={route('events')} 
                className={`${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('events') ? 'font-semibold' : ''}`}
              >
                Events
              </Link>
              <Link 
                href={route('concerts')} 
                className={`${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('concerts') ? 'font-semibold' : ''}`}
              >
                Concerts
              </Link>
              <Link 
                href={route('about')} 
                className={`${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('about') ? 'font-semibold' : ''}`}
              >
                About Us
              </Link>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {auth?.user ? (
                <div className="flex items-center space-x-4">
                  {auth.user.role === 'admin' && (
                    <Link 
                      href={route('dashboard')} 
                      className={`${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}
                    >
                      Dashboard
                    </Link>
                  )}
                  {auth.user.role !== 'admin' && (
                    <Link 
                      href={route('dashboard')} 
                      className={`${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-3xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Log Out
                  </Link>
                </div>
              ) : (
                <>
                  <Link 
                    href={route('login')} 
                    className={`${isScrolled ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}
                  >
                    Login
                  </Link>
                  <Link 
                    href={route('register')} 
                    className="bg-indigo-600 text-white px-6 py-2 rounded-3xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`${isScrolled ? 'text-gray-700' : 'text-white'} focus:outline-none`}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 bg-white/90 backdrop-blur-lg rounded-3xl p-4 shadow-lg">
              <div className="flex flex-col space-y-3">
                <Link 
                  href={route('home')} 
                  className={`text-gray-700 py-2 ${route().current('home') ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href={route('events')} 
                  className={`text-gray-700 py-2 ${route().current('events') ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  href={route('concerts')} 
                  className={`text-gray-700 py-2 ${route().current('concerts') ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Concerts
                </Link>
                <Link 
                  href={route('about')} 
                  className={`text-gray-700 py-2 ${route().current('about') ? 'font-semibold' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>

                {auth?.user ? (
                  <>
                    {auth.user.role === 'admin' && (
                      <>
                        <div className="border-t border-gray-200 my-2 pt-2">
                          <div className="font-medium text-gray-800 mb-2">Admin Panel</div>
                          <Link 
                            href={route('dashboard')} 
                            className="text-gray-700 py-2 pl-3 block"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <Link 
                            href={route('admin.events.index')} 
                            className="text-gray-700 py-2 pl-3 block"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Manage Events
                          </Link>
                          <Link 
                            href={route('admin.events.create')} 
                            className="text-gray-700 py-2 pl-3 block"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Create Event
                          </Link>
                          <Link 
                            href={route('registrations')} 
                            className="text-gray-700 py-2 pl-3 block"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Registrations
                          </Link>
                          <Link 
                            href={route('check-in')} 
                            className="text-gray-700 py-2 pl-3 block"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            QR Check-in
                          </Link>
                          <Link 
                            href={route('analytics')} 
                            className="text-gray-700 py-2 pl-3 block"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Analytics
                          </Link>
                        </div>
                      </>
                    )}
                    {auth.user.role !== 'admin' && (
                      <Link 
                        href={route('dashboard')} 
                        className="text-gray-700 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-3xl font-medium mt-2"
                    >
                      Log Out
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link 
                      href={route('login')} 
                      className="text-gray-700 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      href={route('register')} 
                      className="bg-indigo-600 text-white px-4 py-2 rounded-3xl font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SIGN UP
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Head title={event.title} />

      {/* Hero Section with Countdown */}
      <div className="relative">
        <div className="relative text-white rounded-b-[2rem] sm:rounded-b-[3rem] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={event.photo_url} 
              alt={event.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/60 to-purple-900/40"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 py-32 sm:py-40 md:pt-56">
            <div className="max-w-4xl">
              <p className="font-semibold mb-2 tracking-wider">Event Details</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">{event.title}</h1>
              <p className="text-lg text-gray-200 mb-8">{formattedDate} at {event.location}</p>
              
              {/* Real-time Countdown Timer */}
              {targetDate && <CountdownTimer targetDate={targetDate} />}
              
              {!registration && auth.user && (
                <button 
                  onClick={() => {
                    // Prevent admins from registering
                    if (auth.user.role === 'admin') {
                      alert("Admins cannot register for events. Please use a regular user account.");
                      return;
                    }
                    setShowRegistrationForm(true);
                  }}
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
            {registration && registration.ticket_id && (
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
                      <p className="text-gray-600">{formattedDate}</p>
                      <p className="text-gray-600 mt-1">Time: {getEventDuration()}</p>
                  </div>
                </div>
                
                {/* Session/Duration */}
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-4">
                    <ClockIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">Session</h3>
                    <p className="text-gray-600">
                      {event.session_details || event.duration 
                        ? `${event.session_details || ''} ${event.duration ? `(${event.duration})` : ''}` 
                        : 'Session details not available'}
                    </p>
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
                
                {/* Organizer */}
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
                    <RegistrationForm eventId={event.id} onRegister={handleRegister} eventTitle={event.title} />
                  </div>
                ) : registration ? (
                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <div className="flex items-center text-yellow-600 mb-4">
                      <div className="bg-yellow-100 rounded-full p-2 mr-3">
                        <ClockIcon />
                      </div>
                      <h3 className="text-lg font-semibold">Registration Pending</h3>
                    </div>
                    <p className="text-gray-600 mb-4">Thank you for registering for {event.title}. Your registration is pending admin approval. You will receive your ticket once approved.</p>
                    <p className="text-sm text-gray-500 mb-4">Registration Code: {registration.registration_code}</p>
                  </div>
                ) : auth.user && auth.user.role === 'admin' ? (
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-bold text-blue-600 mb-4">Admin Notice</h3>
                    <p className="text-gray-600 mb-4">As an admin, you cannot register for events. This restriction is in place to maintain a clear separation between admin and participant roles.</p>
                    <p className="text-gray-600">If you need to test the registration process, please use a regular user account.</p>
                  </div>
                ) : auth.user ? (
                  <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                    <h3 className="text-xl font-bold text-indigo-600 mb-4">Join This Event</h3>
                    <p className="text-gray-600 mb-6">Secure your spot at {event.title}. Register now to receive your ticket with QR code for easy check-in.</p>
                    <p className="font-semibold text-lg mb-6">Price: Rp {event.ticket_price.toLocaleString('id-ID')}</p>
                    <button
                      onClick={() => {
                        // Prevent admins from registering
                        if (auth.user.role === 'admin') {
                          alert("Admins cannot register for events. Please use a regular user account.");
                          return;
                        }
                        setShowRegistrationForm(true);
                      }}
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
      
      {/* Related Events Section - Improved with loading state and error handling */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-indigo-600 mb-8">More Events by {event.organizer}</h2>
          
          {isLoadingEvents ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading related events...</p>
              {/* Could add a spinner here */}
            </div>
          ) : fetchError ? (
            <div className="text-center py-10 bg-red-50 rounded-lg p-4 border border-red-100">
              <p className="text-red-600 mb-2">Unable to load related events</p>
              <p className="text-gray-600 text-sm">We're having trouble finding other events from this organizer. Please try again.</p>
              <button 
                onClick={() => {
                  setIsLoadingEvents(true);
                  setFetchError(null);
                  axios.get(`/api/events`, {
                    params: {
                      organizer: event.organizer,
                      exclude_id: event.id,
                      limit: 5
                    }
                  })
                  .then(response => {
                    if (response.data && response.data.events) {
                      setRelatedEvents(response.data.events);
                    } else {
                      setRelatedEvents([]);
                    }
                    setIsLoadingEvents(false);
                  })
                  .catch(error => {
                    setFetchError(error.message || "Failed to fetch related events");
                    setRelatedEvents([]);
                    setIsLoadingEvents(false);
                  });
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
              <p className="text-gray-400 text-xs mt-4">Technical details: {fetchError}</p>
            </div>
          ) : relatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((relatedEvent) => (
                <Link href={route('events.detail', relatedEvent.id)} key={relatedEvent.id} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-52">
                      <img 
                        src={relatedEvent.photo_url} 
                        alt={relatedEvent.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                        <span className={`text-sm font-medium ${relatedEvent.event_type === 'concert' ? 'text-purple-600' : 'text-green-600'}`}>
                          {relatedEvent.event_type === 'concert' ? 'Concert' : 'Regular'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="mb-2 flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">{relatedEvent.title}</h3>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <CalendarIcon />
                        <span className="ml-2 text-sm">
                          {relatedEvent.date ? format(new Date(relatedEvent.date), 'eeee, d MMMM yyyy') : 'Date not set'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 line-clamp-2 mb-4 flex-grow">{relatedEvent.description}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-indigo-600 font-semibold">
                          Rp {relatedEvent.ticket_price?.toLocaleString('id-ID') || 'Free'}
                        </p>
                        <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium text-lg mb-2">No other events from this organizer</p>
              <p className="text-gray-500">Check back later for more events by {event.organizer}</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 