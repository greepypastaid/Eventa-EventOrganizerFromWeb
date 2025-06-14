import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';

const dummyEvents = [
    {
        id: 1,
        title: 'Tech Conference 2024',
        category: 'Technology',
        date: '25-27 October 2024',
        location: 'Jakarta Convention Center',
        price: '$50.00',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 2,
        title: 'Jazz Festival',
        category: 'Music',
        date: '12 November 2024',
        location: 'GBK, Jakarta',
        price: '$35.00',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 3,
        title: 'Startup Pitching Day',
        category: 'Business',
        date: '5 December 2024',
        location: 'Online Event',
        price: 'Free',
        image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=800&q=60'
    },
];

export default function EventsPage() {
    const { auth } = usePage().props;
    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout>
            <Head title="Events" />

            <div className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-12 text-gray-900">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                                    Explore <span className="text-indigo-600">Popular</span> Events
                                </h1>
                                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                    Find events that match your interests.
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {dummyEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </Layout>
    );
} 