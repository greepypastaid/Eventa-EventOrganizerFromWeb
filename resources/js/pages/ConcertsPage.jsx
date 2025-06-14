import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';

const dummyConcerts = [
    {
        id: 4,
        title: 'Sunset Above the Clouds Tour',
        category: 'Concert',
        date: '18 November 2024',
        location: 'Saburai Field, Bandung',
        price: '$45.00',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 5,
        title: 'World Tour: The Final Chapter',
        category: 'Concert',
        date: '25 November 2024',
        location: 'GBK Main Stadium, Jakarta',
        price: '$75.00',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 6,
        title: 'Acoustic Night Special',
        category: 'Concert',
        date: '10 December 2024',
        location: 'Grand Theater, Jakarta',
        price: '$30.00',
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=800&q=60'
    },
];

export default function ConcertsPage() {
    const { auth } = usePage().props;
    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout>
            <Head title="Concerts" />

            <div className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-12 text-gray-900">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                                    Upcoming <span className="text-indigo-600">Concert</span> Schedule
                                </h1>
                                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                    Don't miss performances by your favorite artists.
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {dummyConcerts.map(concert => (
                                    <EventCard key={concert.id} event={concert} />
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