import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile Footer - Simplified */}
        <div className="md:hidden">
          <div className="flex flex-wrap justify-between">
            <div className="w-1/2 mb-4">
              <h2 className="text-lg font-bold mb-2">Eventa</h2>
              <p className="text-indigo-200 text-xs">All in one event manager!</p>
            </div>
            
            <div className="w-1/2 mb-4">
              <h3 className="font-semibold mb-2 text-indigo-100 text-xs">Links</h3>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <a href="#" className="text-indigo-200 hover:text-white transition-colors py-1">About</a>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors py-1">Events</a>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors py-1">FAQ</a>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors py-1">Support</a>
              </div>
            </div>
          </div>
          
          <hr className="border-indigo-700 my-4" />
          
          <div className="flex flex-col items-center text-xs text-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Online Server</span>
            </div>
            <span className="mb-2">Copyright 2025</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
        
        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 mb-0">
            <h2 className="text-2xl font-bold mb-2">Eventa</h2>
              <p className="text-indigo-200 text-base">All in one event manager!</p>
          </div>
          
          <div>
              <h3 className="font-semibold mb-4 text-indigo-100 text-base">Company</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Add Event</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
              <h3 className="font-semibold mb-4 text-indigo-100 text-base">Resources</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
              <h3 className="font-semibold mb-4 text-indigo-100 text-base">Social</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">X</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Linkedin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Youtube</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-indigo-700 my-8" />

          <div className="flex flex-row justify-between items-center text-sm text-indigo-200">
            <div className="flex flex-row items-center gap-6">
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
      </div>
    </footer>
  );
} 