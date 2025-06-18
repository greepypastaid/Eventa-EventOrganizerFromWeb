import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import NavigationLink from './NavigationLink';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

export default function MainNavbar({ auth }) {
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
    
    return (
        <div className={`${isScrolled ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50`}>
            <div className="container mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
                <div className={`${isScrolled || needsDarkerText ? 'bg-white/90' : 'bg-white/20'} backdrop-blur-sm rounded-3xl px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-lg border border-white/20`}>
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href={route('home')} className={`flex items-center ${isScrolled || needsDarkerText ? 'text-indigo-700' : 'text-white'}`}>
                            <img 
                                src="/images/logo.png" 
                                alt="Eventa Logo" 
                                className="w-8 h-8 sm:w-10 sm:h-10 mr-1 sm:mr-2 object-contain"
                            />
                            <span className="text-xl sm:text-2xl font-bold">Eventa</span>
                        </Link>
                    </div>

                    {/* Main Navigation - Desktop */}
                    <div className="hidden md:flex space-x-8">
                        <NavigationLink 
                            href={route('home')} 
                            active={route().current('home')}
                            isScrolled={isScrolled}
                            needsDarkerText={needsDarkerText}
                        >
                            Home
                        </NavigationLink>
                        <NavigationLink 
                            href={route('events')} 
                            active={route().current('events')}
                            isScrolled={isScrolled}
                            needsDarkerText={needsDarkerText}
                        >
                            Events
                        </NavigationLink>
                        <NavigationLink 
                            href={route('concerts')} 
                            active={route().current('concerts')}
                            isScrolled={isScrolled}
                            needsDarkerText={needsDarkerText}
                        >
                            Concerts
                        </NavigationLink>
                        <NavigationLink 
                            href={route('about')} 
                            active={route().current('about')}
                            isScrolled={isScrolled}
                            needsDarkerText={needsDarkerText}
                        >
                            About Us
                        </NavigationLink>
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <AuthButtons 
                            auth={auth} 
                            isScrolled={isScrolled} 
                            needsDarkerText={needsDarkerText} 
                        />
                    </div>

                    {/* Mobile Menu */}
                    <MobileMenu 
                        auth={auth} 
                        isScrolled={isScrolled} 
                        needsDarkerText={needsDarkerText} 
                    />
                </div>
            </div>
        </div>
    );
} 