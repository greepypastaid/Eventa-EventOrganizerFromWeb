import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';

export default function ConcertsPage({ concerts }) {
    const { auth } = usePage().props;
    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout>
            <Head title="Concerts" />

            <div className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 md:p-12 text-gray-900">
                            <div className="text-center mb-8 sm:mb-12">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
                                    Upcoming <span className="text-indigo-600">Concert</span> Schedule
                                </h1>
                                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                                    Don't miss performances by your favorite artists.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                                {concerts.map(concert => (
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