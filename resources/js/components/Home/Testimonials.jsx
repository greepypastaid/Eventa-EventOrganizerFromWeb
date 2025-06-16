import React from 'react';

const testimonials = [
  {
    id: 1,
    content: "Eventure made planning our company's annual conference a breeze. The platform is intuitive, and the customer service team was incredibly helpful throughout the process.",
    author: "Muhammad Khoirul Ihsan",
    position: "Founder of Pangory",
    avatar: "/storage/testimonial1.jpeg",
  },
  {
    id: 2,
    content: "I've attended multiple concerts booked through Eventure, and the experience has always been seamless. From ticket purchase to event entry, everything is well organized.",
    author: "Risky Yuniar Pratama",
    position: "Founder of Pangory",
    avatar: "/storage/testimonial2.jpeg",
  },
  {
    id: 3,
    content: "As a small business owner, I've used Eventure to host several workshops. The platform helped me reach a wider audience and simplified the entire event management process.",
    author: "Lyon Ambrosio Djuanda",
    position: "Founder of Lansia Monitoring",
    avatar: "/storage/testimonial3.jpeg",
  },
];

export default function Testimonials() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of event organizers and attendees choose Eventure
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-lg shadow-md border border-gray-100 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-6 text-indigo-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className="text-gray-600 mb-6 relative z-10">{testimonial.content}</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800"
          >
            Read more testimonials
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 