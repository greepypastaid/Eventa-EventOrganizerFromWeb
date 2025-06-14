import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    const { auth } = usePage().props;

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout>
            <Head title="About Us" />

            <div className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="    p-6 md:p-12 text-gray-900">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                                    About <span className="text-indigo-600">Eventure</span>
                                </h1>
                                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                    Your platform to discover and experience the best events.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-gray-700">Our Mission</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        At Eventure, our mission is to connect people with their passions through unforgettable events. We believe that every event is a story, and we want to help you become part of that story. Whether it's a music concert, an educational seminar, or a cultural festival, we provide it for you.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        We strive to make the process of discovering and booking tickets as easy and enjoyable as possible, so you can focus more on enjoying the moment.
                                    </p>
                                </div>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Our Mission" className="rounded-lg shadow-xl w-full h-auto object-cover" />
                                </div>
                            </div>

                            <div className="mt-16 text-center">
                                <h2 className="text-3xl font-bold text-gray-700 mb-8">Our Team</h2>
                                <div className="flex flex-wrap justify-center gap-8">
                                    {/* Placeholder for team members */}
                                    <div className="w-48 text-center">
                                        <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4"></div>
                                        <h3 className="font-bold text-lg">Team Member</h3>
                                        <p className="text-indigo-600">Position</p>
                                    </div>
                                    <div className="w-48 text-center">
                                        <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4"></div>
                                        <h3 className="font-bold text-lg">Team Member</h3>
                                        <p className="text-indigo-600">Position</p>
                                    </div>
                                    <div className="w-48 text-center">
                                        <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 mb-4"></div>
                                        <h3 className="font-bold text-lg">Team Member</h3>
                                        <p className="text-indigo-600">Position</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </Layout>
    );
}