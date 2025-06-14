import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M12 25L4 16L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 7L28 16L20 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", route: "home" },
    { name: "Events", route: "events" },
    { name: "Concerts", route: "concerts" },
    { name: "About Us", route: "about" }
  ];

  return (
    <>
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 flex justify-between items-center text-white">
        <Link href={route('home')} className="flex items-center space-x-3">
            <Logo />
            <span className="text-2xl font-bold">Eventa</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={route(link.route)} 
              className={`pb-1 transition-colors duration-300 ${link.name === 'Home' ? 'border-b-2 border-white font-semibold' : 'text-gray-200 hover:text-white'}`}
            >
                {link.name}
            </Link>
            ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
            <Link 
              href={route('login')} 
              className="text-gray-200 hover:text-white transition-colors px-3 py-2"
              onClick={(e) => {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('open-login-modal'));
              }}
            >
              Login
            </Link>
            <Link 
              href={route('register')} 
              className="bg-white text-indigo-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300 shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('open-register-modal'));
              }}
            >
              Sign Up
            </Link>
        </div>
        
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>

      {isMenuOpen && (
          <div className="md:hidden mt-2 bg-white/20 backdrop-blur-lg rounded-2xl p-4">
              <div className="flex flex-col space-y-4 text-center">
              {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={route(link.route)} 
                    className="py-2 text-gray-200 hover:text-white"
                  >
                    {link.name}
                  </Link>
              ))}
              <hr className="border-white/20"/>
              <Link 
                href={route('login')} 
                className="py-2 text-gray-200 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  document.dispatchEvent(new CustomEvent('open-login-modal'));
                }}
              >
                Login
              </Link>
              <Link 
                href={route('register')} 
                className="bg-white text-indigo-700 block w-full py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  document.dispatchEvent(new CustomEvent('open-register-modal'));
                }}
              >
                Sign Up
              </Link>
              </div>
          </div>
      )}
    </>
  );
}

export default Navbar; 