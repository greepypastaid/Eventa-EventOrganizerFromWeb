import React from 'react';

function Footer() {
  return (
    <footer className="bg-indigo-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="col-span-2 md:col-span-2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Eventa</h2>
            <p className="text-indigo-200">All in one event manager!</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-indigo-100">Company</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Add Event</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-indigo-100">Resources</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-indigo-100">Social</h3>
            <ul className="space-y-2 text-indigo-200">
              <li><a href="#" className="hover:text-white transition-colors">X</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Linkedin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Youtube</a></li>
            </ul>
          </div>

        </div>

        <hr className="border-indigo-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-indigo-200">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Online Server</span>
                </div>
                <span>Copyright 2025</span>
            </div>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Term of Use</a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 