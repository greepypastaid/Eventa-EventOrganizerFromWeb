import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import axios from 'axios';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

function Hero({ event }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // List of months for date filter
  const months = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ];

  // List of locations
  const locations = [
    { value: 'Yogyakarta', label: 'Yogyakarta' },
    { value: 'Jakarta', label: 'Jakarta' },
    { value: 'Semarang', label: 'Semarang' },
    { value: 'Bandung', label: 'Bandung' },
    { value: 'Surabaya', label: 'Surabaya' },
    { value: 'Online', label: 'Online' },
  ];

  // Event categories
  const categories = [
    { value: 'regular', label: 'Regular' },
    { value: 'concert', label: 'Concert' },
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    setIsLoading(true);
    setShowMobileFilters(false);
    
    try {
      // Call API to search events
      const response = await axios.get('/api/events/search', {
        params: {
          query: searchQuery,
          date: selectedDate,
          location: selectedLocation,
          category: selectedCategory,
        }
      });
      
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching events:', error);
      // Fallback to client-side filtering if API call fails
      const allEvents = event ? [event] : [];
      const results = allEvents.filter(e => {
        const matchesQuery = searchQuery === '' || 
          e.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesDate = selectedDate === '' || 
          (e.date && e.date.includes(selectedDate));
        
        const matchesLocation = selectedLocation === '' || 
          e.location?.toLowerCase().includes(selectedLocation.toLowerCase());
        
        const matchesCategory = selectedCategory === '' || 
          e.event_type?.toLowerCase() === selectedCategory.toLowerCase();
        
        return matchesQuery && matchesDate && matchesLocation && matchesCategory;
      });
      
      setSearchResults(results);
    } finally {
      setIsLoading(false);
    }
  };

  const heroImage = event?.photo_url || "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop";
  const heroTitle = event?.title || "No Hero Event Set";
  const heroDate = event ? `${format(new Date(event.date), 'eeee, d MMMM yyyy')} at ${event.location}` : "Please set a hero event in the admin panel.";

  return (
    <div className="relative">
      {/* Section with background image and rounded bottom */}
      <div className="relative text-white bg-indigo-900 rounded-b-[2rem] sm:rounded-b-[3rem] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroTitle} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/60 to-purple-900/40"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl min-h-[70vh] sm:min-h-[80vh] flex items-center">
          <div className="w-full text-center md:text-left py-16 sm:py-24">
              <div className="max-w-2xl mx-auto md:mx-0">
                  {event ? (
                    <>
                      <p className="font-semibold mb-2 tracking-wider">Upcoming {event.event_type === 'concert' ? 'Concert' : 'Event'}!</p>
                      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">{heroTitle}</h1>
                      <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8">{heroDate}</p>
                      <Link href={route('events.detail', event.id)} className="group inline-flex items-center gap-2 sm:gap-3 bg-transparent border-2 border-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition-all duration-300">
                      Book Now!
                      <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:translate-x-1">
                          <path d="M8.5 1L13.5 6L8.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1 6H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      </Link>
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">{heroTitle}</h1>
                      <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8">{heroDate}</p>
                    </>
                  )}
              </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-20">
        {/* Desktop search bar (unchanged) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-3 sm:px-6 -translate-y-1/2 hidden md:block">
          <div className="bg-white text-gray-700 rounded-3xl shadow-2xl p-3 flex flex-row items-center w-full">
              <input 
                  type="text" 
                  placeholder="Search for your favorite events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow p-4 border-none focus:ring-0 text-lg w-auto text-gray-800 placeholder-gray-500"
              />
              
              <div className="flex flex-wrap items-center w-auto">
                  <div className="flex-initial flex items-center justify-start space-x-3 px-6 py-2 cursor-pointer">
                      <CalendarIcon />
                      <div className="text-left min-w-[90px]">
                          <p className="text-sm font-semibold text-gray-800">Date</p>
                          <select 
                              className="text-xs text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                          >
                              <option value="">Choose</option>
                              {months.map((month) => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                              ))}
                          </select>
                      </div>
                  </div>
                  <div className="flex-initial flex items-center justify-start space-x-3 px-6 py-2 cursor-pointer border-l border-r border-gray-200">
                      <MapPinIcon />
                      <div className="text-left min-w-[90px]">
                          <p className="text-sm font-semibold text-gray-800">Location</p>
                          <select 
                              className="text-xs text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                              value={selectedLocation}
                              onChange={(e) => setSelectedLocation(e.target.value)}
                          >
                              <option value="">Choose</option>
                              {locations.map((location) => (
                                <option key={location.value} value={location.value}>{location.label}</option>
                              ))}
                          </select>
                      </div>
                  </div>
                  <div className="flex-initial flex items-center justify-start space-x-3 px-6 py-2 cursor-pointer">
                      <ChevronDownIcon />
                      <div className="text-left min-w-[90px]">
                          <p className="text-sm font-semibold text-gray-800">Category</p>
                          <select 
                              className="text-xs text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                              value={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                              <option value="">Choose</option>
                              {categories.map((category) => (
                                <option key={category.value} value={category.value}>{category.label}</option>
                              ))}
                          </select>
                      </div>
                  </div>
              </div>
              
              <button 
                  onClick={handleSearch}
                  className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 ml-4 w-auto flex-shrink-0 flex justify-center"
              >
                  <SearchIcon />
              </button>
          </div>
        </div>
        
        {/* Mobile search bar (redesigned) */}
        <div className="md:hidden w-full px-4 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-3">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border-none focus:ring-0 text-sm text-gray-800 placeholder-gray-500"
              />
              <button 
                onClick={handleSearch}
                className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 flex-shrink-0 flex justify-center"
              >
                <SearchIcon />
              </button>
            </div>
            
            <div className="mt-2 border-t border-gray-100 pt-2">
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center justify-center w-full py-1 text-xs text-gray-600 font-medium"
              >
                {showMobileFilters ? 'Hide Filters' : 'Show Filters'} 
                <ChevronDownIcon />
              </button>
              
              {showMobileFilters && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Date</p>
                    <select 
                      className="text-xs bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="">Any</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Location</p>
                    <select 
                      className="text-xs bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">Any</option>
                      {locations.map((location) => (
                        <option key={location.value} value={location.value}>{location.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Category</p>
                    <select 
                      className="text-xs bg-transparent border-none focus:ring-0 cursor-pointer p-0 w-full"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Any</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Search Results */}
        {isSearching && (
          <div className="container mx-auto px-4 sm:px-6 pt-32 pb-16 md:pt-32">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Search Results</h2>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                  <p className="mt-2 text-gray-600">Searching...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No events match your criteria.</p>
                  <button 
                    onClick={() => setIsSearching(false)}
                    className="mt-4 px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {searchResults.map(event => (
                      <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        {event.photo_url && (
                          <img src={event.photo_url} alt={event.title} className="w-full h-40 sm:h-48 object-cover" />
                        )}
                        <div className="p-3 sm:p-4">
                          <span className="inline-block px-2 sm:px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded-full mb-2">
                            {event.event_type || 'Event'}
                          </span>
                          <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1">{event.title}</h3>
                          <p className="text-gray-600 text-xs sm:text-sm mb-1">
                            {event.date && format(new Date(event.date), 'dd MMMM yyyy')}
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">{event.location}</p>
                          <Link 
                            href={route('events.detail', event.id)} 
                            className="mt-2 sm:mt-3 inline-block text-indigo-600 text-sm sm:text-base font-medium hover:text-indigo-800"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 sm:mt-8 text-center">
                    <button 
                      onClick={() => setIsSearching(false)}
                      className="px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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