import React from 'react';

const steps = [
  {
    id: 1,
    title: 'Find Events',
    description: 'Browse through our extensive collection of events or use the search feature to find exactly what you\'re looking for.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Book Tickets',
    description: 'Select your preferred event date and time, choose your seats, and securely purchase your tickets in just a few clicks.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Attend & Enjoy',
    description: 'Activate your tickets via QR Code, show them at the venue, and enjoy an unforgettable experience at your chosen event.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover, book, and enjoy events in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-8 rounded-lg shadow-md text-center relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                {step.id}
              </div>
              <div className="text-indigo-600 mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Connecting lines between steps (visible on md screens and up) */}
        <div className="hidden md:block relative h-0">
          <div className="absolute top-[-120px] left-1/3 w-1/3 border-t-2 border-dashed border-gray-300"></div>
          <div className="absolute top-[-120px] right-1/3 w-1/3 border-t-2 border-dashed border-gray-300"></div>
        </div>
      </div>
    </div>
  );
} 