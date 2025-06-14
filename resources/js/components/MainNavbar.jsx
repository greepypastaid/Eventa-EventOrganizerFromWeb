import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function MainNavbar({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentRoute, setCurrentRoute] = useState('');
    
    // Track scroll position to adjust navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        setCurrentRoute(route().current());
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Determine if we're on a page that needs darker text (not home)
    const needsDarkerText = currentRoute !== 'home';
    
    const openLoginModal = (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('open-login-modal'));
    };
    
    const openRegisterModal = (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('open-register-modal'));
    };

    return (
        <div className="absolute top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 pt-6">
                <div className={`${isScrolled || needsDarkerText ? 'bg-white/90' : 'bg-white/20'} backdrop-blur-sm rounded-full px-6 py-4 flex items-center justify-between shadow-lg border border-white/20`}>
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href={route('home')} className={`flex items-center ${isScrolled || needsDarkerText ? 'text-indigo-700' : 'text-white'}`}>
                            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 19H20L12 5L4 19Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-2xl font-bold">Eventa</span>
                        </Link>
                    </div>

                    {/* Main Navigation - Desktop */}
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            href={route('home')} 
                            className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('home') ? 'font-semibold' : ''}`}
                        >
                            Home
                        </Link>
                        <Link 
                            href={route('events')} 
                            className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('events') ? 'font-semibold' : ''}`}
                        >
                            Events
                        </Link>
                        <Link 
                            href={route('concerts')} 
                            className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('concerts') ? 'font-semibold' : ''}`}
                        >
                            Concerts
                        </Link>
                        <Link 
                            href={route('about')} 
                            className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${route().current('about') ? 'font-semibold' : ''}`}
                        >
                            About Us
                        </Link>
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {auth?.user ? (
                            <div className="flex items-center space-x-4">
                                <Link href={route('dashboard')} className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}>
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    Log Out
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link 
                                    href={route('login')} 
                                    onClick={openLoginModal}
                                    className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}
                                >
                                    Login
                                </Link>
                                <Link 
                                    href={route('register')} 
                                    onClick={openRegisterModal}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    SIGN UP
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
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
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-2 bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow-lg">
                        <div className="flex flex-col space-y-3">
                            <Link 
                                href={route('home')} 
                                className={`text-gray-700 py-2 ${route().current('home') ? 'font-semibold' : ''}`}
                            >
                                Home
                            </Link>
                            <Link 
                                href={route('events')} 
                                className={`text-gray-700 py-2 ${route().current('events') ? 'font-semibold' : ''}`}
                            >
                                Events
                            </Link>
                            <Link 
                                href={route('concerts')} 
                                className={`text-gray-700 py-2 ${route().current('concerts') ? 'font-semibold' : ''}`}
                            >
                                Concerts
                            </Link>
                            <Link 
                                href={route('about')} 
                                className={`text-gray-700 py-2 ${route().current('about') ? 'font-semibold' : ''}`}
                            >
                                About Us
                            </Link>

                            {auth?.user ? (
                                <>
                                    <Link 
                                        href={route('dashboard')} 
                                        className="text-gray-700 py-2"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium mt-2"
                                    >
                                        Log Out
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col space-y-2 pt-2">
                                    <Link 
                                        href={route('login')} 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsMenuOpen(false);
                                            document.dispatchEvent(new CustomEvent('open-login-modal'));
                                        }}
                                        className="text-gray-700 py-2"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        href={route('register')} 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsMenuOpen(false);
                                            document.dispatchEvent(new CustomEvent('open-register-modal'));
                                        }}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-center"
                                    >
                                        SIGN UP
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 