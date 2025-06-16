import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function RegistrationsPage({ auth, events = [], registrations: initialRegistrations = [] }) {
    const [selectedEvent, setSelectedEvent] = useState('');
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRegistrations, setSelectedRegistrations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Initialize and update registrations whenever the prop changes
    useEffect(() => {
        setRegistrations(Array.isArray(initialRegistrations) ? initialRegistrations : []);
    }, [initialRegistrations]);
    
    // Load registrations when event is selected
    useEffect(() => {
        // Filter registrations when an event is selected
        if (selectedEvent) {
            setLoading(true);
            setSelectedRegistrations([]);
            
            const filteredRegs = registrations.filter(reg => reg.event_id === parseInt(selectedEvent));
            setRegistrations(filteredRegs);
            setLoading(false);
        } else if (registrations.length > 0) {
            // Show all registrations when no event is selected
            setRegistrations(registrations);
        }
    }, [selectedEvent, registrations]);
    
    // Handle checkbox selection
    const handleSelectRegistration = (id) => {
        if (selectedRegistrations.includes(id)) {
            setSelectedRegistrations(selectedRegistrations.filter(regId => regId !== id));
        } else {
            setSelectedRegistrations([...selectedRegistrations, id]);
        }
    };
    
    // Handle select all checkbox
    const handleSelectAll = () => {
        if (selectedRegistrations.length === registrations.length) {
            setSelectedRegistrations([]);
        } else {
            setSelectedRegistrations(registrations.map(reg => reg.id));
        }
    };
    
    // Send tickets to selected registrations
    const sendTickets = () => {
        if (selectedRegistrations.length === 0) {
            alert("Please select at least one registration");
            return;
        }
        
        // In a real app, this would be a GraphQL mutation
        alert(`Tickets sent to ${selectedRegistrations.length} attendees!`);
        
        // Update local state to reflect tickets sent
        setRegistrations(registrations.map(reg => 
            selectedRegistrations.includes(reg.id) 
                ? { ...reg, ticket_sent: true } 
                : reg
        ));
        
        setSelectedRegistrations([]);
    };
    
    // Verify selected registrations
    const verifyRegistrations = () => {
        if (selectedRegistrations.length === 0) {
            alert("Please select at least one registration");
            return;
        }
        
        // In a real app, this would be a GraphQL mutation
        alert(`Verified ${selectedRegistrations.length} registrations!`);
        
        // Update local state to reflect verification
        setRegistrations(registrations.map(reg => 
            selectedRegistrations.includes(reg.id) 
                ? { ...reg, verified: true } 
                : reg
        ));
        
        setSelectedRegistrations([]);
    };
    
    // Filter registrations based on search term
    const filteredRegistrations = Array.isArray(registrations) ? registrations.filter(reg => {
        const userName = reg.user?.name || '';
        const userEmail = reg.user?.email || '';
        const eventTitle = reg.event?.title || '';
        
        return userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
               userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
               eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={null}
            headerClassName="hidden"
        >
            <Head title="Registrations" />

            <div className="py-12 pt-32">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Event</h3>
                            <p className="text-gray-600 mb-4">Choose an event to manage registrations:</p>
                            
                            <select
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">All events</option>
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
                        ) : registrations.length > 0 ? (
                            <div>
                                {/* Search and Actions Bar */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
                                    <div className="w-full md:w-1/3">
                                        <label htmlFor="search" className="sr-only">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Search registrations"
                                                type="search"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={verifyRegistrations}
                                            disabled={selectedRegistrations.length === 0}
                                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${selectedRegistrations.length === 0 ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                        >
                                            Verify Selected
                                        </button>
                                        <button
                                            onClick={sendTickets}
                                            disabled={selectedRegistrations.length === 0}
                                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${selectedRegistrations.length === 0 ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'}`}
                                        >
                                            Send Tickets
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Registrations Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                            checked={selectedRegistrations.length === registrations.length && registrations.length > 0}
                                                            onChange={handleSelectAll}
                                                        />
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendee</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredRegistrations.map((registration) => (
                                                <tr key={registration.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                                checked={selectedRegistrations.includes(registration.id)}
                                                                onChange={() => handleSelectRegistration(registration.id)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{registration.user?.name || 'Unknown'}</div>
                                                        <div className="text-sm text-gray-500">{registration.user?.email || 'No email'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{registration.event?.title || 'Unknown Event'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(registration.created_at).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex flex-col space-y-1">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${registration.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                                {registration.verified ? 'Verified' : 'Pending'}
                                                            </span>
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${registration.ticket?.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                {registration.ticket?.id ? 'Ticket Created' : 'No Ticket'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                                        {!registration.verified && (
                                                            <button 
                                                                onClick={() => {
                                                                    // In a real app, this would be a GraphQL mutation
                                                                    setRegistrations(registrations.map(reg => 
                                                                        reg.id === registration.id 
                                                                            ? { ...reg, verified: true } 
                                                                            : reg
                                                                    ));
                                                                }}
                                                                className="text-green-600 hover:text-green-900 mr-3"
                                                            >
                                                                Verify
                                                            </button>
                                                        )}
                                                        {registration.verified && !registration.ticket?.id && (
                                                            <button 
                                                                onClick={() => {
                                                                    // In a real app, this would be a GraphQL mutation
                                                                    setRegistrations(registrations.map(reg => 
                                                                        reg.id === registration.id 
                                                                            ? { ...reg, ticket: { id: Math.floor(Math.random() * 1000) } } 
                                                                            : reg
                                                                    ));
                                                                }}
                                                                className="text-blue-600 hover:text-blue-900"
                                                            >
                                                                Create Ticket
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Summary */}
                                <div className="mt-6 bg-gray-50 p-4 rounded-md">
                                    <div className="flex flex-col md:flex-row md:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{filteredRegistrations.length}</span> of <span className="font-medium">{registrations.length}</span> registrations
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">{registrations.filter(r => r.verified).length}</span> verified · 
                                                <span className="font-medium ml-1">{registrations.filter(r => r.ticket?.id).length}</span> tickets created
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No registrations found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {events.length > 0 
                                        ? 'No registrations have been made yet for this event.' 
                                        : 'No events have been created yet.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 