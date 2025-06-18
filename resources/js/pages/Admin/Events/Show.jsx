import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format, parseISO } from 'date-fns';

// Format time function to handle ISO time strings
const formatTime = (timeString) => {
    if (!timeString) return 'Waktu tidak tersedia';
    
    try {
        // Handle ISO format time strings
        if (timeString.includes('T')) {
            const date = parseISO(timeString);
            return format(date, 'HH:mm');
        }
        
        // Handle simple time strings
        return timeString;
    } catch (error) {
        console.error("Error formatting time:", error);
        return 'Waktu tidak tersedia';
    }
};

export default function Show({ auth, event }) {
    // Format the time for display
    const formattedTime = formatTime(event.time);
    
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<div className="h-16 bg-transparent"></div>}  
            headerClassName="bg-transparent shadow-none" 
        >
            <Head title={`Event: ${event.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">{event.title}</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.events.index')}
                                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                                    >
                                        Kembali ke Events
                                    </Link>
                                    <Link
                                        href={route('admin.events.edit', event.id)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Edit Event
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Event Image */}
                            {event.photo_url && (
                                <div className="mb-6">
                                    <img 
                                        src={event.photo_url} 
                                        alt={event.title} 
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Event Details */}
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h2 className="text-lg font-medium">Deskripsi Event</h2>
                                        <div className="mt-2 text-gray-700 whitespace-pre-line">
                                            {event.description}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-lg font-medium">Detail Event</h2>
                                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Penyelenggara</div>
                                                <div>{event.organizer}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Tanggal</div>
                                                <div>{event.date && format(new Date(event.date), 'd MMMM yyyy')}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Waktu</div>
                                                <div>{formattedTime}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Lokasi</div>
                                                <div>{event.location}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Harga Tiket</div>
                                                <div>Rp{new Intl.NumberFormat('id-ID').format(event.ticket_price)}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Tipe Event</div>
                                                <div>{event.event_type === 'concert' ? 'Konser' : 'Regular Event'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-lg font-medium">Warna Tema</h2>
                                        <div className="mt-2 flex space-x-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Warna Primer</div>
                                                <div className="flex items-center mt-1">
                                                    <div 
                                                        className="h-6 w-6 rounded-md mr-2 border" 
                                                        style={{ backgroundColor: event.primary_color }}
                                                    ></div>
                                                    <div>{event.primary_color}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Warna Sekunder</div>
                                                <div className="flex items-center mt-1">
                                                    <div 
                                                        className="h-6 w-6 rounded-md mr-2 border" 
                                                        style={{ backgroundColor: event.secondary_color }}
                                                    ></div>
                                                    <div>{event.secondary_color}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Sidebar */}
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium mb-2">Display Settings</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Hero Event</span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${event.is_hero ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {event.is_hero ? 'Yes' : 'No'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Event Type</span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${event.event_type === 'concert' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {event.event_type === 'concert' ? 'Concert' : 'Regular'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium mb-2">Quick Actions</h3>
                                        <div className="space-y-2">
                                            <Link 
                                                href={route('events.registrations', event.id)} 
                                                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                            >
                                                View Registrations
                                            </Link>
                                            <Link 
                                                href={route('events.detail', event.id)} 
                                                className="block w-full text-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                                                target="_blank"
                                            >
                                                View Public Page
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {event.logo_url && (
                                        <div>
                                            <h3 className="font-medium mb-2">Event Logo</h3>
                                            <img 
                                                src={event.logo_url} 
                                                alt="Event Logo" 
                                                className="w-full object-contain rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 