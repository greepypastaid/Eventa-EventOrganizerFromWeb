import React from 'react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Mock analytics data - would come from an API call
const analyticsData = {
    totalRegistrations: 1250,
    verifiedRegistrations: 980,
    sessionAttendance: [
        { session: 'Keynote', count: 800 },
        { session: 'Workshop A', count: 450 },
        { session: 'Workshop B', count: 500 },
    ],
};

const AnalyticsPage = ({ auth, events }) => {

    // In a real app, you would have a state for the selected event
    // and fetch its analytics data.
    const selectedEventId = events[0]?.id; 
    
    // Mock analytics data for different events
    const mockAnalyticsData = {
        1: {
            totalRegistrations: 120,
            verifiedRegistrations: 95,
            sessionAttendance: [
                { session: "Opening Keynote", count: 110 },
                { session: "React Workshop", count: 75 },
            ],
        },
        2: {
            totalRegistrations: 250,
            verifiedRegistrations: 220,
            sessionAttendance: [
                { session: "State of Vue", count: 240 },
                { session: "Pinia Deep Dive", count: 180 },
            ],
        }
    };

    const displayData = mockAnalyticsData[selectedEventId] || {
        totalRegistrations: 0,
        verifiedRegistrations: 0,
        sessionAttendance: [],
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Analytics</h2>}
        >
            <Head title="Analytics" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Analytics for: {events.find(e => e.id === selectedEventId)?.title || "Select an Event"}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-500">Total Registrations</h4>
                                    <p className="text-3xl font-bold">{displayData.totalRegistrations}</p>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-500">Verified Registrations</h4>
                                    <p className="text-3xl font-bold">{displayData.verifiedRegistrations}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-medium text-gray-900 mb-2">Session Attendance</h4>
                                <ul className="space-y-2">
                                    {displayData.sessionAttendance.map(session => (
                                        <li key={session.session} className="p-3 bg-gray-50 rounded-md flex justify-between">
                                            <span>{session.session}</span>
                                            <span className="font-semibold">{session.count} attendees</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AnalyticsPage; 