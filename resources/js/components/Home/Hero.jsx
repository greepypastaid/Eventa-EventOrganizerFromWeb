import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

// Sample event data
const sampleEvents = [
  {
    id: 1,
    title: 'UNFEST 2025 - Art & Music Festival',
    date: '14 June 2025',
    location: 'PRPP Semarang',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=300&h=200&fit=crop&auto=format'
  },
  {
    id: 2,
    title: 'Tech Conference 2025',
    date: '25 October 2025',
    location: 'Jakarta Convention Center',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=300&h=200&fit=crop&auto=format'
  },
  {
    id: 3,
    title: 'Jazz Festival',
    date: '12 November 2025',
    location: 'GBK, Jakarta',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=300&h=200&fit=crop&auto=format'
  },
  {
    id: 4,
    title: 'Startup Pitching Day',
    date: '5 December 2025',
    location: 'Online Event',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=300&h=200&fit=crop&auto=format'
  },
  {
    id: 5,
    title: 'Fun Run Semarang 2025',
    date: '25 April 2025',
    location: 'Simpang Lima Semarang',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=300&h=200&fit=crop&auto=format'
  }
];

function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    
    // Filter events based on search criteria
    const results = sampleEvents.filter(event => {
      const matchesQuery = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDate = selectedDate === '' || 
        event.date.toLowerCase().includes(selectedDate.toLowerCase());
      
      const matchesLocation = selectedLocation === '' || 
        event.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || 
        event.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesQuery && matchesDate && matchesLocation && matchesCategory;
    });
    
    setSearchResults(results);
  };

  return (
    <div className="relative">
      {/* Section with background image and rounded bottom */}
      <div className="relative text-white bg-indigo-900 rounded-b-[3rem] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop" alt="Concert background with purple stage lighting" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/60 to-purple-900/40"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-7xl min-h-[80vh] flex items-center">
          <div className="w-full text-center md:text-left py-24">
              <div className="max-w-2xl mx-auto md:mx-0">
                  <p className="font-semibold mb-2 tracking-wider">Upcoming Concert!</p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">UNFEST 2025 - Art & Music Festival</h1>
                  <p className="text-lg text-gray-200 mb-8">Saturday, 14 June 2025 at PRPP Semarang</p>
                  <a href="#" className="group inline-flex items-center gap-3 bg-transparent border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300">
                      Book Now!
                      <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:translate-x-1">
                          <path d="M8.5 1L13.5 6L8.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1 6H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </a>
              </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-20">
        {/* Absolutely positioned search bar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 -translate-y-1/2">
          <div className="bg-white text-gray-700 rounded-3xl shadow-2xl p-3 flex flex-col md:flex-row items-center w-full">
              <input 
                  type="text" 
                  placeholder="Search for your favorite events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow p-4 border-none focus:ring-0 text-lg w-full md:w-auto text-gray-800 placeholder-gray-500"
              />
              <div className="flex flex-wrap items-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start space-x-3 pl-0 pr-4 md:px-6 py-2 cursor-pointer">
                      <CalendarIcon />
                      <div className="text-left min-w-[90px]">
                          <p className="text-sm font-semibold text-gray-800">Date</p>
                          <select 
                              className="text-xs text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                          >
                              <option value="">Choose</option>
                              <option value="April">April 2025</option>
                              <option value="June">June 2025</option>
                              <option value="October">October 2025</option>
                              <option value="November">November 2025</option>
                              <option value="December">December 2025</option>
                          </select>
                      </div>
                  </div>
                  <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start space-x-3 px-4 md:px-6 py-2 cursor-pointer border-l border-r border-gray-200">
                      <MapPinIcon />
                      <div className="text-left min-w-[90px]">
                          <p className="text-sm font-semibold text-gray-800">Location</p>
                          <select 
                              className="text-xs text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                              value={selectedLocation}
                              onChange={(e) => setSelectedLocation(e.target.value)}
                          >
                              <option value="">Choose</option>
                              <option value="Semarang">Semarang</option>
                              <option value="Jakarta">Jakarta</option>
                              <option value="Online">Online</option>
                          </select>
                      </div>
                  </div>
                  <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start space-x-3 pl-4 py-2 cursor-pointer">
                      <ChevronDownIcon />
                      <div className="text-left min-w-[90px]">
                          <p className="text-sm font-semibold text-gray-800">Category</p>
                          <select 
                              className="text-xs text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                              value={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                              <option value="">Choose</option>
                              <option value="Music">Music</option>
                              <option value="Technology">Technology</option>
                              <option value="Business">Business</option>
                              <option value="Sports">Sports</option>
                          </select>
                      </div>
                  </div>
              </div>
              <button 
                  onClick={handleSearch}
                  className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 ml-0 md:ml-4 mt-4 md:mt-0 w-auto flex-shrink-0"
              >
                  <SearchIcon />
              </button>
          </div>
        </div>
        
        {/* Search Results */}
        {isSearching && (
          <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Results</h2>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No events match your criteria.</p>
                  <button 
                    onClick={() => setIsSearching(false)}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map(event => (
                      <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full mb-2">
                            {event.category}
                          </span>
                          <h3 className="font-bold text-lg text-gray-800 mb-1">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-1">{event.date}</p>
                          <p className="text-gray-600 text-sm">{event.location}</p>
                          <Link href="#" className="mt-3 inline-block text-indigo-600 font-medium hover:text-indigo-800">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button 
                      onClick={() => setIsSearching(false)}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero; 