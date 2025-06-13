import React from 'react';
import Navbar from '../layout/Navbar';

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

function Hero() {
  return (
    <div className="relative">
      {/* Section with background image and rounded bottom */}
      <div className="relative text-white bg-indigo-900 rounded-b-[3rem] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop" alt="Concert background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-indigo-800/60 to-purple-900/40"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="py-4">
              <Navbar />
          </div>
          <div className="pt-24 pb-32 text-left">
              <div className="max-w-2xl">
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
      
      {/* Absolutely positioned search bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 z-20 translate-y-1/2">
        <div className="bg-white text-gray-700 rounded-3xl shadow-2xl p-3 flex flex-col md:flex-row items-center w-full">
            <input 
                type="text" 
                placeholder="Search your favourite event?"
                className="flex-grow p-4 border-none focus:ring-0 text-lg w-full md:w-auto text-gray-800 placeholder-gray-500"
            />
            <div className="flex items-center w-full md:w-auto mt-4 md:mt-0">
                <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start space-x-2 pl-0 pr-4 md:px-6 py-2 cursor-pointer">
                    <CalendarIcon />
                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800">Date</p>
                        <p className="text-xs text-gray-500">Choose date</p>
                    </div>
                </div>
                <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start space-x-2 px-4 md:px-6 py-2 cursor-pointer border-l border-r border-gray-200">
                    <MapPinIcon />
                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800">Location</p>
                        <p className="text-xs text-gray-500">Choose Location</p>
                    </div>
                </div>
                <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start space-x-2 pl-4 py-2 cursor-pointer">
                    <ChevronDownIcon />
                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800">Category</p>
                        <p className="text-xs text-gray-500">Choose Category</p>
                    </div>
                </div>
            </div>
            <button className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 ml-0 md:ml-4 mt-4 md:mt-0 w-auto flex-shrink-0">
                <SearchIcon />
            </button>
        </div>
      </div>
    </div>
  );
}

export default Hero; 