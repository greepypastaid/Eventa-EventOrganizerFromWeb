import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import SearchFilter from '@/components/events/SearchFilter';
import React, { useState, useEffect } from 'react';
import { format, isAfter, isBefore, parseISO } from 'date-fns';

export default function EventsPage({ events, priceRanges }) {
    const { auth } = usePage().props;
    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    const [searchResults, setSearchResults] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);
    const [activeSection, setActiveSection] = useState('popular'); // 'popular', 'upcoming', or 'search'

    useEffect(() => {
        // Current date for comparison
        const currentDate = new Date();

        // Get upcoming events (events with date after today)
        const upcoming = events
            .filter(event => {
                const eventDate = parseISO(event.date);
                return isAfter(eventDate, currentDate);
            })
            .sort((a, b) => parseISO(a.date) - parseISO(b.date))
            .slice(0, 6);

        setUpcomingEvents(upcoming);

        // For demo purposes, simulate popular events by taking events with highest ticket prices
        // In a real app, this would be based on registration counts or views
        const popular = [...events]
            .sort((a, b) => b.ticket_price - a.ticket_price)
            .slice(0, 6);

        setPopularEvents(popular);
    }, [events]);

    const handleSearchResults = (results) => {
        if (results) {
            setSearchResults(results);
            setActiveSection('search');
        } else {
            setSearchResults(null);
            setActiveSection('popular');
        }
    };

    // Next/previous slide functionality for event sections
    const scrollSection = (sectionId, direction) => {
        const container = document.getElementById(sectionId);
        if (container) {
            const scrollAmount = direction === 'next' ? 800 : -800;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <Head title="Events" />

            {/* Hero Section with Gradient Background */}
            <div className="relative pt-28 sm:pt-32 pb-16 overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 z-0"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                            Events<span className="text-indigo-600">.</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                            Find and join exciting events
                        </p>
                    </div>
                    
                    {/* Search Filter */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <SearchFilter 
                            events={events} 
                            onSearchResults={handleSearchResults} 
                            priceRanges={priceRanges}
                        />
                    </div>
                </div>
            </div>
            
            {/* Content Section */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {searchResults ? (
                        <section>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
                                <button 
                                    onClick={() => handleSearchResults(null)}
                                    className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                    </svg>
                                    Back to Events
                                </button>
                            </div>

                            {searchResults.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {searchResults.map(event => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            )}
                        </section>
                    ) : (
                        <>
                            {/* Popular Events */}
                            <section className="mb-16">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">Most Popular Events</h2>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => scrollSection('popular-events', 'prev')}
                                            className="p-1 rounded-full border border-indigo-300 hover:bg-indigo-100"
                                            aria-label="Previous"
                                        >
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => scrollSection('popular-events', 'next')}
                                            className="p-1 rounded-full border border-indigo-300 hover:bg-indigo-100"
                                            aria-label="Next"
                                        >
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div id="popular-events" className="flex overflow-x-auto pb-4 space-x-6 hide-scrollbar">
                                    {popularEvents.map(event => (
                                        <div key={event.id} className="flex-none w-72 sm:w-80">
                                            <EventCard event={event} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Upcoming Events */}
                            <section>
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => scrollSection('upcoming-events', 'prev')}
                                            className="p-1 rounded-full border border-indigo-300 hover:bg-indigo-100"
                                            aria-label="Previous"
                                        >
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => scrollSection('upcoming-events', 'next')}
                                            className="p-1 rounded-full border border-indigo-300 hover:bg-indigo-100"
                                            aria-label="Next"
                                        >
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div id="upcoming-events" className="flex overflow-x-auto pb-4 space-x-6 hide-scrollbar">
                                    {upcomingEvents.map(event => (
                                        <div key={event.id} className="flex-none w-72 sm:w-80">
                                            <EventCard event={event} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>

            {/* Add CSS to hide scrollbars but maintain functionality */}
            <style jsx global>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;  /* Chrome, Safari, Opera */
                }
            `}</style>
            
            <Footer />
        </Layout>
    );
} 