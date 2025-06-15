import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function AnalyticsPage({ auth, events = [], dailyRegistrations = [] }) {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Events data comes from props
    
    // Mock analytics data - would come from GraphQL query
    const mockAnalyticsData = {
        1: {
            totalRegistrations: 250,
            totalAttendees: 198,
            attendanceRate: 79.2,
            sessionData: [
                { session: "Opening Keynote", registered: 250, attended: 187, rate: 74.8 },
                { session: "Future of AI Panel", registered: 250, attended: 203, rate: 81.2 },
                { session: "Networking Lunch", registered: 250, attended: 231, rate: 92.4 },
                { session: "Web Development Workshop", registered: 250, attended: 178, rate: 71.2 },
                { session: "Closing Remarks", registered: 250, attended: 192, rate: 76.8 }
            ]
        },
        2: {
            totalRegistrations: 180,
            totalAttendees: 168,
            attendanceRate: 93.3,
            sessionData: [
                { session: "Opening Act", registered: 180, attended: 154, rate: 85.6 },
                { session: "Main Performance", registered: 180, attended: 176, rate: 97.8 },
                { session: "Jam Session", registered: 180, attended: 145, rate: 80.6 }
            ]
        },
        3: {
            totalRegistrations: 120,
            totalAttendees: 92,
            attendanceRate: 76.7,
            sessionData: [
                { session: "Welcome and Introduction", registered: 120, attended: 88, rate: 73.3 },
                { session: "Fintech Startup Pitches", registered: 120, attended: 94, rate: 78.3 },
                { session: "Health Tech Startup Pitches", registered: 120, attended: 86, rate: 71.7 },
                { session: "Investor Feedback Session", registered: 120, attended: 102, rate: 85.0 },
                { session: "Networking", registered: 120, attended: 78, rate: 65.0 }
            ]
        }
    };
    
    // Load analytics data when event is selected
    useEffect(() => {
        if (selectedEvent) {
            setLoading(true);
            setAnalyticsData(null);
            
            axios.get(route('analytics.event', { id: selectedEvent }))
                .then(response => {
                    setAnalyticsData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching analytics data:", error);
                    // Optionally, set an error state here to show in the UI
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setAnalyticsData(null);
        }
    }, [selectedEvent]);
    
    // Helper function to determine color based on attendance rate
    const getRateColor = (rate) => {
        if (rate >= 85) return 'bg-green-100 text-green-800';
        if (rate >= 70) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Analytics</h2>}
        >
            <Head title="Analytics" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Event</h3>
                            <p className="text-gray-600 mb-4">Choose an event to view attendance analytics:</p>
                            
                            <select
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select an event</option>
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>
                                        {event.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : analyticsData ? (
                            <div>
                                {/* Overview Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-indigo-50 rounded-lg p-6">
                                        <div className="text-4xl font-bold text-indigo-600">{analyticsData.totalRegistrations}</div>
                                        <div className="text-gray-500 mt-1">Total Registrations</div>
                                    </div>
                                    <div className="bg-indigo-50 rounded-lg p-6">
                                        <div className="text-4xl font-bold text-indigo-600">{analyticsData.totalAttendees}</div>
                                        <div className="text-gray-500 mt-1">Total Attendees</div>
                                    </div>
                                    <div className="bg-indigo-50 rounded-lg p-6">
                                        <div className="text-4xl font-bold text-indigo-600">{analyticsData.attendanceRate}%</div>
                                        <div className="text-gray-500 mt-1">Overall Attendance Rate</div>
                                    </div>
                                </div>
                                
                                {/* Session Attendance Chart */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Session Attendance</h3>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <div className="space-y-4">
                                            {analyticsData.sessionData.map((session, index) => (
                                                <div key={index} className="relative">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm font-medium text-gray-700">{session.session}</span>
                                                        <span className="text-sm font-medium text-gray-700">{session.rate}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                                        <div 
                                                            className={`h-4 rounded-full ${getRateColor(session.rate)}`} 
                                                            style={{ width: `${session.rate}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                        <span>{session.attended} attended</span>
                                                        <span>{session.registered} registered</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Detailed Attendance Table */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Attendance Data</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attended</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {analyticsData.sessionData.map((session, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">{session.session}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{session.registered}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{session.attended}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRateColor(session.rate)}`}>
                                                                {session.rate}%
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                {/* Export Options */}
                                <div className="mt-8 flex justify-end">
                                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 mr-3">
                                        Export CSV
                                    </button>
                                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                        Generate Report
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p>Select an event to view analytics</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 