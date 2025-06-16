import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import CreateEventModal from './Admin/Events/CreateEventModal';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';

// Ticket component that can be printed
const PrintableTicket = ({ registration, event, onClose }) => {
    // Use the actual registration code from the backend
    const ticketCode = registration?.registration_code || `EVT-INVALID`;
    const attendeeName = registration?.custom_fields?.name || registration?.user?.name || 'N/A';
    
    const handlePrint = () => {
        // First capture the SVG QR code
        const qrCodeSvg = document.querySelector(`#qrcode-${registration.id} svg`);
        let qrCodeContent = '';
        
        if (qrCodeSvg) {
            // Directly use the outerHTML of the SVG element
            // This is more reliable than converting to a base64 image
            qrCodeContent = qrCodeSvg.outerHTML;
        } else {
            qrCodeContent = '<p>QR Code not available</p>';
        }
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Event Ticket - ${event.title}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                            background-color: #f3f4f6;
                        }
                        .ticket {
                            max-width: 900px;
                            margin: 0 auto;
                            border: 2px solid #6366f1;
                            border-radius: 12px;
                            overflow: hidden;
                            display: flex;
                            flex-direction: row;
                            background: white;
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                            position: relative;
                            height: 450px;
                        }
                        .ticket-header {
                            background: #7c3aed;
                            color: white;
                            padding: 15px;
                            text-align: center;
                            width: 35%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            border-right: 2px dashed #ffffff50;
                        }
                        .ticket-header h1 {
                            font-size: 22px;
                            margin: 0 0 8px 0;
                            font-weight: bold;
                        }
                        .ticket-header p {
                            font-size: 14px;
                            margin: 0 0 12px 0;
                            opacity: 0.9;
                        }
                        .ticket-venue {
                            background: rgba(255, 255, 255, 0.15);
                            padding: 10px;
                            border-radius: 8px;
                            margin-bottom: 12px;
                        }
                        .ticket-venue p {
                            margin: 2px 0;
                            font-size: 13px;
                            opacity: 0.9;
                        }
                        .ticket-identity {
                            background: rgba(255, 255, 255, 0.15);
                            padding: 12px;
                            border-radius: 8px;
                        }
                        .ticket-identity p {
                            margin: 2px 0;
                            font-size: 13px;
                        }
                        .ticket-body {
                            padding: 15px;
                            width: 65%;
                            background: white;
                            display: flex;
                            flex-direction: column;
                        }
                        .ticket-qr {
                            text-align: center;
                            margin: 10px 0;
                            padding: 10px;
                            background: #f8fafc;
                            border-radius: 8px;
                            flex-grow: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .ticket-qr svg {
                            width: 300px !important;
                            height: 300px !important;
                            padding: 12px;
                            background: white;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                        }
                        .ticket-footer {
                            position: absolute;
                            bottom: 10px;
                            right: 15px;
                            background: #f8fafc;
                            padding: 6px 12px;
                            font-size: 12px;
                            color: #4b5563;
                            border-radius: 6px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                        }
                        @media print {
                            body {
                                background: white;
                                padding: 0;
                                margin: 0;
                            }
                            .ticket {
                                box-shadow: none;
                                border: 2px solid #6366f1;
                                height: 450px;
                                page-break-inside: avoid;
                            }
                            .no-print {
                                display: none;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="no-print" style="text-align: center; margin-bottom: 20px;">
                        <button onclick="window.print();" style="padding: 10px 20px; background-color: #6366f1; color: white; border: none; border-radius: 4px; cursor: pointer;">Print Ticket</button>
                    </div>
                    <div class="ticket">
                        <div class="ticket-header">
                            <h1>${event.title}</h1>
                            <p>${format(new Date(event.date), 'eeee, d MMMM yyyy')} at ${event.time || '00:00'}</p>
                            <div class="ticket-venue">
                                <p><strong>Location:</strong> ${event.location}</p>
                                <p><strong>Organizer:</strong> ${event.organizer}</p>
                            </div>
                            <div class="ticket-identity">
                                <p><strong>Attendee:</strong> ${attendeeName}</p>
                                <p><strong>Ticket ID:</strong> ${ticketCode}</p>
                            </div>
                        </div>
                        <div class="ticket-body">
                            <div class="ticket-qr">
                                ${qrCodeContent}
                            </div>
                        </div>
                        <div class="ticket-footer">
                            Please present this ticket at the event entrance for check-in
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Your Ticket</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-indigo-700">{event ? event.title : 'Event'}</h4>
                        <p className="text-sm text-gray-600">
                            {event && event.date 
                                ? `${format(new Date(event.date), 'eeee, d MMMM yyyy')} at ${event.time || '00:00'}`
                                : 'Date not available'
                            }
                        </p>
                        <p className="text-sm text-gray-600">{event ? event.location : 'Location not available'}</p>
                    </div>
                    
                    <div className="flex justify-center my-6">
                        <div id={`qrcode-${registration.id}`}>
                            <QRCodeSVG 
                                value={ticketCode} 
                                size={180}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                    </div>
                    
                    <div className="text-center text-sm text-gray-500 mb-6">
                        <p>Please present this QR code at the event entrance</p>
                    </div>
                    
                    <button
                        onClick={handlePrint}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                        Print Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Dashboard({ auth, stats, recentEvents, userRegistrations, upcomingEvents }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    
    // Check if user is admin
    const isAdmin = auth?.user?.role === 'admin';

    // Debug: Log what data we're receiving
    console.log('Dashboard props:', { auth, stats, recentEvents, userRegistrations, upcomingEvents });

    // Prepare user registrations if not admin
    const userEvents = userRegistrations || [];
    const userUpcomingEvents = upcomingEvents || [];

    return (
        <AuthenticatedLayout 
            auth={auth}
            header={null}
            headerClassName="hidden"
        >
            <Head title="Dashboard" />

            <div className="py-12 pt-32">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isAdmin ? (
                        <>
                            {/* Admin Dashboard Content */}
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-4xl font-bold text-indigo-600">{stats.totalEvents}</div>
                            <div className="text-gray-500 mt-1">Total Events</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-4xl font-bold text-indigo-600">{stats.totalRegistrations}</div>
                            <div className="text-gray-500 mt-1">Total Registrations</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-4xl font-bold text-indigo-600">{stats.upcomingEvents}</div>
                            <div className="text-gray-500 mt-1">Upcoming Events</div>
                        </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Link
                                href={route('admin.events.create')}
                                className="bg-indigo-600 text-white p-4 rounded-lg text-center hover:bg-indigo-700 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Create New Event
                            </Link>
                            <Link href={route('registrations')} className="bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center hover:bg-indigo-200 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Manage Registrations
                            </Link>
                            <Link href={route('check-in')} className="bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center hover:bg-indigo-200 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                QR Check-in
                            </Link>
                            <Link href={route('analytics')} className="bg-indigo-100 text-indigo-700 p-4 rounded-lg text-center hover:bg-indigo-200 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                View Analytics
                            </Link>
                        </div>
                    </div>
                    
                    {/* Recent Events */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Recent Events</h3>
                            <Link href={route('admin.events.index')} className="text-sm text-indigo-600 hover:text-indigo-900">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrations</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentEvents.length > 0 ? (
                                        recentEvents.map((event) => (
                                            <tr key={event.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {event.photo_url && (
                                                            <img 
                                                                src={event.photo_url} 
                                                                alt={event.title}
                                                                className="h-10 w-10 rounded-md object-cover mr-3"
                                                            />
                                                        )}
                                                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{event.date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{event.registrations_count || 0}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link href={route('admin.events.show', event.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">View</Link>
                                                    <Link href={route('admin.events.edit', event.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                                    <Link href={route('events.registrations', { id: event.id })} className="text-indigo-600 hover:text-indigo-900">Registrations</Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                No events found. Create your first event!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                        </>
                    ) : (
                        <>
                            {/* User Dashboard Content */}
                            {/* User Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                    <div className="text-4xl font-bold text-indigo-600">{userEvents.length}</div>
                                    <div className="text-gray-500 mt-1">My Registrations</div>
                                </div>
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                    <div className="flex items-center justify-center h-full">
                                        <Link 
                                            href={route('events')} 
                                            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
                                        >
                                            Browse All Events
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                            {/* My Registered Events */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">My Registered Events</h3>
                                
                                {userEvents.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {userEvents.map((registration) => (
                                            <div key={registration.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                                {registration.event && registration.event.photo_url && (
                                                    <div className="h-40 overflow-hidden">
                                                        <img 
                                                            src={registration.event.photo_url} 
                                                            alt={registration.event.title} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <h4 className="font-bold text-lg mb-2">{registration.event ? registration.event.title : 'Event'}</h4>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {registration.event ? format(new Date(registration.event.date), 'eeee, d MMMM yyyy') : 'Date not available'}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-4">{registration.event ? registration.event.location : 'Location not available'}</p>
                                                    
                                                    <div className="flex justify-between items-center">
                                                        {registration.event && (
                                                            <Link 
                                                                href={route('events.detail', registration.event.id)} 
                                                                className="text-indigo-600 hover:text-indigo-800 text-sm"
                                                            >
                                                                View Event
                                                            </Link>
                                                        )}
                                                        {registration.ticket_id ? (
                                                            <button
                                                                onClick={() => setSelectedTicket(registration)}
                                                                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                                                            >
                                                                View Ticket
                                                            </button>
                                                        ) : (
                                                            <div className="text-yellow-600 text-sm flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Pending Approval
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>You haven't registered for any events yet.</p>
                                        <Link 
                                            href={route('events')} 
                                            className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
                                        >
                                            Browse Events
                                        </Link>
                                    </div>
                                )}
                            </div>
                            

                        </>
                    )}
                </div>
            </div>
            
            {/* Create Event Modal for Admin */}
            {isAdmin && (
            <CreateEventModal 
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />
            )}
            
            {/* Ticket Modal */}
            {selectedTicket && (
                <PrintableTicket
                    registration={selectedTicket}
                    event={selectedTicket.event}
                    onClose={() => setSelectedTicket(null)}
                />
            )}
        </AuthenticatedLayout>
    );
}
