import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';

export default function EventIndex({ auth, events }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    
    const confirmDelete = (event) => {
        setEventToDelete(event);
        setIsDeleting(true);
    };
    
    const cancelDelete = () => {
        setIsDeleting(false);
        setEventToDelete(null);
    };
    
    const deleteEvent = () => {
        router.delete(route('admin.events.destroy', eventToDelete.id), {
            onSuccess: () => {
                setIsDeleting(false);
                setEventToDelete(null);
            }
        });
    };
    
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Events</h2>}
        >
            <Head title="Manage Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">All Events</h1>
                                <Link
                                    href={route('admin.events.create')}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Create New Event
                                </Link>
                            </div>
                            
                            {events.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No events found. Create your first event!</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Organizer
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hero
                                                </th>
                                                <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map((event) => (
                                                <tr key={event.id}>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        <div className="flex items-center">
                                                            {event.photo_url && (
                                                                <img 
                                                                    src={event.photo_url} 
                                                                    alt={event.title}
                                                                    className="h-10 w-10 rounded-md object-cover mr-3"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="font-medium text-gray-900">{event.title}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {event.organizer}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {event.date && format(new Date(event.date), 'dd MMM yyyy')}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            event.event_type === 'concert' 
                                                                ? 'bg-purple-100 text-purple-800' 
                                                                : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {event.event_type === 'concert' ? 'Concert' : 'Regular'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        {event.is_hero ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                Hero
                                                            </span>
                                                        ) : 'No'}
                                                    </td>
                                                    <td className="py-4 px-4 border-b border-gray-200">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={route('admin.events.show', event.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={route('admin.events.edit', event.id)}
                                                                className="text-yellow-600 hover:text-yellow-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => confirmDelete(event)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Are you sure you want to delete the event "{eventToDelete?.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteEvent}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}