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
                <Link href="/about" className="text-indigo-200 hover:text-white transition-colors py-1">About</Link>
                <Link href="/events" className="text-indigo-200 hover:text-white transition-colors py-1">Events</Link>
                <Link href="/concerts" className="text-indigo-200 hover:text-white transition-colors py-1">Concerts</Link>
                <Link href="/dashboard" className="text-indigo-200 hover:text-white transition-colors py-1">Dashboard</Link>
              </div>
            </div>
          </div>
          
          <hr className="border-indigo-700 my-4" />
          
          <div className="flex flex-col items-center text-xs text-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Online Server</span>
            </div>
            <span className="mb-2">Copyright © 2025 Eventa</span>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
        
        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 mb-0">
            <h2 className="text-2xl font-bold mb-2">Eventa</h2>
              <p className="text-indigo-200 text-base">All in one event manager!</p>
              <p className="text-indigo-200 text-sm mt-3">Create, manage, and attend events with ease. From concerts to events, we've got you covered.</p>
          </div>
          
          <div>
              <h3 className="font-semibold mb-4 text-indigo-100 text-base">Navigation</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/concerts" className="hover:text-white transition-colors">Concerts</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
              <h3 className="font-semibold mb-4 text-indigo-100 text-base">Resources</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
              <li><Link href="blm ada" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
              <h3 className="font-semibold mb-4 text-indigo-100 text-base">Connect</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">X / Twitter</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">YouTube</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
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
                <span>Copyright © 2025 Eventa</span>
            </div>
            <div className="flex space-x-6">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
            </div>
        </div>
      </div>
    </footer>
  );
} 