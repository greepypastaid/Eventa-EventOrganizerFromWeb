import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    const { auth } = usePage().props;

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    // Team members data
    const teamMembers = [
        {
            name: "Gangsar Reka Pambudi",
            position: "Developer",
            image: "/storage/team/Reka.jpg", 
            fallbackImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            name: "Muhammad Danny Hidayat",
            position: "Developer",
            image: "/storage/team/Dany.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            name: "Zulfa Mardlotillah",
            position: "UI/UX Designer",
            image: "/storage/team/Zulfa.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            name: "Faizal Rifky Abdillah",
            position: "Quality Analyst Tester",
            image: "/storage/team/Faizal.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80"
        },
        {
            name: "Febriant Cahyo Nugroho",
            position: "Quality Analyst Tester",
            image: "/storage/team/Briant.jpg",
            fallbackImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        }
    ];

    return (
        <Layout>
            <Head title="About Us" />

            <div className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6 sm:p-10 text-center">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                                About <span className="text-indigo-600">Eventa</span>
                            </h1>
                            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                Connecting people with unforgettable experiences since 2025
                            </p>
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6 sm:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                                <div className="space-y-4 sm:space-y-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">Our Mission</h2>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        At Eventa, our mission is to revolutionize how people discover, book, and experience events. We believe that memorable experiences bring people together, and we're dedicated to making those moments accessible to everyone.
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        We strive to create a seamless platform that connects event organizers with attendees, providing powerful tools for creators and an intuitive interface for participants.
                                    </p>
                                </div>
                                <div>
                                    <img 
                                        src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                                        alt="Our Mission" 
                                        className="rounded-lg shadow-xl w-full h-auto object-cover" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Our Platform */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6 sm:p-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6">About Our Platform</h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Event Creation</h3>
                                    <p className="text-gray-600">
                                    Create and manage events in just a few steps. Our platform is designed for users to create events quickly, easily and without technical barriers.                                    </p>
                                </div>
                                
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Ticketing</h3>
                                    <p className="text-gray-600">
                                    All QR code ticketing is done with high security standards. We protect every transaction to ensure user convenience and trust.                                    </p>
                                </div>
                                
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Advanced Analytics</h3>
                                    <p className="text-gray-600">
                                    Monitor your event performance in real-time. Our analytics features help you understand attendee trends, promotion effectiveness and data-driven decision-making.                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Vision */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6 sm:p-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                                <div>
                                    <img 
                                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                                        alt="Our Vision" 
                                        className="rounded-lg shadow-xl w-full h-auto object-cover" 
                                    />
                                </div>
                                <div className="space-y-4 sm:space-y-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">Our Vision</h2>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        We envision a world where accessing and organizing events is effortless and personalized. Eventa aims to be the global leader in event technology, connecting millions of people with experiences that matter to them.
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        By 2025, we aim to expand our platform to over 50 countries, facilitating over 10,000 events monthly and helping create meaningful connections and memories worldwide.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our Team */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 sm:p-10 text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-8">Meet Our Team</h2>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 overflow-hidden rounded-full shadow-md">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = member.fallbackImage;
                                                }}
                                            />
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                                        <p className="text-indigo-600">{member.position}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <p className="mt-12 text-gray-600 max-w-3xl mx-auto">
                                Our dedicated team brings together expertise in event management, software development, design, and customer experience. 
                                We're passionate about creating the best platform for event organizers and attendees alike.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </Layout>
    );
}