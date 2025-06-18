import React, { useState } from 'react';
import { format } from 'date-fns';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;

// Default price ranges if not provided through props
const defaultPriceRanges = [
  { label: 'Free', min: 0, max: 0 },
  { label: 'Under Rp 100.000', min: 1, max: 100000 },
  { label: 'Rp 100.000 - Rp 500.000', min: 100000, max: 500000 },
  { label: 'Rp 500.000 - Rp 1.000.000', min: 500000, max: 1000000 },
  { label: 'Above Rp 1.000.000', min: 1000000, max: Number.MAX_SAFE_INTEGER },
];

export default function SearchFilter({ events, onSearchResults, priceRanges = defaultPriceRanges }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique dates (month and year) from events
  const uniqueDates = [...new Set(events.map(event => 
    event.date ? format(new Date(event.date), 'MMMM yyyy') : ''
  ))].filter(Boolean);

  // Get unique locations from events
  const uniqueLocations = [...new Set(events.map(event => event.location))].filter(Boolean);

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate a brief delay to show loading state (better UX)
    setTimeout(() => {
      try {
        // Search through all events
        const results = events.filter(e => {
          // Query matching
          const matchesQuery = searchQuery === '' || 
            e.title?.toLowerCase().includes(searchQuery.toLowerCase().trim());
          
          // Date matching with error handling
          let matchesDate = true;
          if (selectedDate) {
            try {
              const eventDate = e.date ? format(new Date(e.date), 'MMMM yyyy') : '';
              matchesDate = eventDate === selectedDate;
            } catch (error) {
              console.error(`Error formatting date for event ${e.id}:`, error);
              matchesDate = false;
            }
          }
          
          // Location matching with null check
          const matchesLocation = selectedLocation === '' || 
            (e.location && e.location === selectedLocation);
          
          // Price range matching with null check
          let matchesPrice = true;
          if (selectedPriceRange) {
            const range = priceRanges.find(r => r.label === selectedPriceRange);
            if (range) {
              matchesPrice = e.ticket_price !== null && 
                            e.ticket_price !== undefined &&
                            e.ticket_price >= range.min && 
                            e.ticket_price <= range.max;
            }
          }
          
          return matchesQuery && matchesDate && matchesLocation && matchesPrice;
        });
        
        onSearchResults(results);
      } catch (error) {
        console.error("Error during search:", error);
        onSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedDate('');
    setSelectedLocation('');
    setSelectedPriceRange('');
    onSearchResults(null); // Reset to show all events
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Modern minimalist search bar */}
      <div className="bg-white shadow-sm rounded-full border border-gray-100 flex items-center w-full">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input 
            type="text" 
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="py-3 pl-12 pr-3 w-full rounded-full text-gray-700 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 border-none text-sm md:text-base"
          />
        </div>

        <div className="flex items-center px-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full mr-2 ${showFilters ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            title="Toggle filters"
          >
            <FilterIcon />
          </button>
          
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 w-9 h-9 flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <SearchIcon />
            )}
          </button>
        </div>
      </div>

      {/* Expandable filters */}
      {showFilters && (
        <div className="bg-white mt-2 p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-1">
              <div className="flex items-center mb-1.5">
                <CalendarIcon />
                <label className="ml-1.5 text-sm font-medium text-gray-700">Date</label>
              </div>
              <select 
                className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Any Date</option>
                {uniqueDates.map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>

            <div className="md:flex-1">
              <div className="flex items-center mb-1.5">
                <MapPinIcon />
                <label className="ml-1.5 text-sm font-medium text-gray-700">Location</label>
              </div>
              <select 
                className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Any Location</option>
                {uniqueLocations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="md:flex-1">
              <div className="flex items-center mb-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <label className="ml-1.5 text-sm font-medium text-gray-700">Price Range</label>
              </div>
              <select 
                className="w-full py-2 px-3 border border-gray-200 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="">Any Price</option>
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>

          {(selectedDate || selectedLocation || selectedPriceRange) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearSearch}
                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 