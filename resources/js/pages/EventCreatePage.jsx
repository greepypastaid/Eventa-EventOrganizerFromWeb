import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function EventCreatePage({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        date: '',
        location: '',
        logo_url: '',
        primary_color: '#4f46e5', // Default indigo color
        secondary_color: '#818cf8'
    });
    
    const [sessions, setSessions] = useState([
        { title: '', speaker: '', startTime: '', endTime: '', date: '' }
    ]);
    
    const handleSessionChange = (index, field, value) => {
        const updatedSessions = [...sessions];
        updatedSessions[index][field] = value;
        setSessions(updatedSessions);
    };
    
    const addSession = () => {
        setSessions([...sessions, { title: '', speaker: '', startTime: '', endTime: '', date: '' }]);
    };
    
    const removeSession = (index) => {
        const updatedSessions = [...sessions];
        updatedSessions.splice(index, 1);
        setSessions(updatedSessions);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // In a real app, this would use GraphQL mutation
        console.log("Event data:", data);
        console.log("Sessions:", sessions);
        
        // Simulate success and redirect
        alert("Event created successfully!");
        // In production, would redirect to the event page
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Event</h2>}
        >
            <Head title="Create Event" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Event Basic Information */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Event Information</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="title" value="Event Title" />
                                        <TextInput
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="date" value="Event Date" />
                                        <TextInput
                                            id="date"
                                            type="datetime-local"
                                            name="date"
                                            value={data.date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.date} className="mt-2" />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="location" value="Event Location" />
                                        <TextInput
                                            id="location"
                                            type="text"
                                            name="location"
                                            value={data.location}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('location', e.target.value)}
                                        />
                                        <InputError message={errors.location} className="mt-2" />
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="logo_url" value="Logo URL (Optional)" />
                                        <TextInput
                                            id="logo_url"
                                            type="text"
                                            name="logo_url"
                                            value={data.logo_url}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('logo_url', e.target.value)}
                                        />
                                        <InputError message={errors.logo_url} className="mt-2" />
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Event Description" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    ></textarea>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="primary_color" value="Primary Color" />
                                        <div className="mt-1 flex items-center">
                                            <input
                                                id="primary_color"
                                                type="color"
                                                name="primary_color"
                                                value={data.primary_color}
                                                onChange={(e) => setData('primary_color', e.target.value)}
                                                className="h-10 w-10 rounded-md border-gray-300"
                                            />
                                            <TextInput
                                                type="text"
                                                value={data.primary_color}
                                                onChange={(e) => setData('primary_color', e.target.value)}
                                                className="ml-2 block w-full"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="secondary_color" value="Secondary Color" />
                                        <div className="mt-1 flex items-center">
                                            <input
                                                id="secondary_color"
                                                type="color"
                                                name="secondary_color"
                                                value={data.secondary_color}
                                                onChange={(e) => setData('secondary_color', e.target.value)}
                                                className="h-10 w-10 rounded-md border-gray-300"
                                            />
                                            <TextInput
                                                type="text"
                                                value={data.secondary_color}
                                                onChange={(e) => setData('secondary_color', e.target.value)}
                                                className="ml-2 block w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Event Sessions */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Event Sessions</h3>
                                    <button
                                        type="button"
                                        onClick={addSession}
                                        className="inline-flex items-center px-3 py-1 bg-indigo-100 border border-transparent rounded-md font-semibold text-xs text-indigo-700 tracking-widest hover:bg-indigo-200 focus:bg-indigo-200 active:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        + Add Session
                                    </button>
                                </div>
                                
                                {sessions.map((session, index) => (
                                    <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-gray-700">Session #{index + 1}</h4>
                                            {sessions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSession(index)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor={`session-title-${index}`} value="Session Title" />
                                                <TextInput
                                                    id={`session-title-${index}`}
                                                    type="text"
                                                    value={session.title}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            
                                            <div>
                                                <InputLabel htmlFor={`session-speaker-${index}`} value="Speaker (Optional)" />
                                                <TextInput
                                                    id={`session-speaker-${index}`}
                                                    type="text"
                                                    value={session.speaker}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => handleSessionChange(index, 'speaker', e.target.value)}
                                                />
                                            </div>
                                            
                                            <div>
                                                <InputLabel htmlFor={`session-date-${index}`} value="Session Date" />
                                                <TextInput
                                                    id={`session-date-${index}`}
                                                    type="date"
                                                    value={session.date}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => handleSessionChange(index, 'date', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <InputLabel htmlFor={`session-start-${index}`} value="Start Time" />
                                                    <TextInput
                                                        id={`session-start-${index}`}
                                                        type="time"
                                                        value={session.startTime}
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <InputLabel htmlFor={`session-end-${index}`} value="End Time" />
                                                    <TextInput
                                                        id={`session-end-${index}`}
                                                        type="time"
                                                        value={session.endTime}
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => handleSessionChange(index, 'endTime', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Registration Form Fields */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Form Fields</h3>
                                <p className="text-gray-600 mb-4">The following fields will be included in your registration form:</p>
                                
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Full Name (required)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Email Address (required)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Phone Number (required)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Organization (optional)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Dietary Restrictions (optional)</span>
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Special Requests (optional)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-end mt-6">
                                <SecondaryButton className="mr-3">
                                    Save as Draft
                                </SecondaryButton>
                                <PrimaryButton type="submit" disabled={processing}>
                                    Create Event
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 