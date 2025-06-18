import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function MobileMenu({ auth, isScrolled, needsDarkerText }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAdmin = auth?.user?.role === 'admin';
    
    const openLoginModal = (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('open-login-modal'));
    };
    
    const openRegisterModal = (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('open-register-modal'));
    };
    
    return (
        <div className="md:hidden">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`${isScrolled || needsDarkerText ? 'text-gray-700' : 'text-white'} focus:outline-none`}
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            
            {/* Mobile menu dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 mx-3 p-4 bg-white rounded-3xl shadow-lg z-50">
                    <div className="flex flex-col space-y-3">
                        <MobileMenuItem href={route('home')}>Home</MobileMenuItem>
                        <MobileMenuItem href={route('events')}>Events</MobileMenuItem>
                        <MobileMenuItem href={route('concerts')}>Concerts</MobileMenuItem>
                        <MobileMenuItem href={route('about')}>About Us</MobileMenuItem>
                        
                        <div className="border-t border-gray-200 my-2 pt-2">
                            {auth?.user ? (
                                <>
                                    <MobileMenuItem href={route('dashboard')}>Dashboard</MobileMenuItem>
                                    
                                    {isAdmin && (
                                        <>
                                            <MobileMenuItem href={route('admin.events.index')}>Manage Events</MobileMenuItem>
                                            <MobileMenuItem href={route('admin.events.create')}>Create Event</MobileMenuItem>
                                            <MobileMenuItem href={route('registrations')}>Registrations</MobileMenuItem>
                                            <MobileMenuItem href={route('check-in')}>QR Check-in</MobileMenuItem>
                                            <MobileMenuItem href={route('analytics')}>Analytics</MobileMenuItem>
                                        </>
                                    )}
                                    
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full mt-4 bg-indigo-600 text-white px-6 py-2 rounded-3xl font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        Log Out
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-3">
                                    <Link 
                                        href={route('login')} 
                                        onClick={(e) => {
                                            setIsMenuOpen(false);
                                            openLoginModal(e);
                                        }}
                                        className="text-gray-700 hover:text-indigo-700 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        href={route('register')} 
                                        onClick={(e) => {
                                            setIsMenuOpen(false);
                                            openRegisterModal(e);
                                        }}
                                        className="bg-indigo-600 text-center text-white px-6 py-2 rounded-3xl font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        SIGN UP
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileMenuItem({ href, children }) {
    return (
        <Link 
            href={href} 
            className="text-gray-700 hover:text-indigo-700 transition-colors"
        >
            {children}
        </Link>
    );
} 