import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

export default function CheckInPage({ auth, events = [] }) {
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [attendee, setAttendee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [autoResetTimeout, setAutoResetTimeout] = useState(null);
    
    // Auto-reset the check-in form after success
    useEffect(() => {
        if (attendee) {
            // Clear any existing timeout
            if (autoResetTimeout) {
                clearTimeout(autoResetTimeout);
            }
            
            // Set new timeout to auto-reset after 2 seconds
            const timeout = setTimeout(() => {
                handleReset();
            }, 2000);
            
            setAutoResetTimeout(timeout);
        }
        
        // Clean up timeout on component unmount
        return () => {
            if (autoResetTimeout) {
                clearTimeout(autoResetTimeout);
            }
        };
    }, [attendee]);
    
    const handleScan = (result, error) => {
        if (!!result) {
            setScanResult(result.text);
            verifyTicket(result.text);
        }

        if (!!error) {
            // This can get noisy, so we'll log it but not show a persistent UI error
            console.info(error);
        }
    };
    
    const verifyTicket = async (ticketCode) => {
        if (!selectedEvent) {
            setScanError("Please select an event before scanning.");
            return;
        }
        
        setLoading(true);
        setScanError(null);
        setAttendee(null);

        try {
            const response = await axios.post(route('admin.check-in.verify'), {
                ticketCode: ticketCode,
                eventId: selectedEvent,
            });

            setAttendee(response.data.attendee);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setScanError(error.response.data.message);
                if (error.response.status === 409) { // Already checked-in
                    setAttendee(error.response.data.attendee);
                }
            } else {
                setScanError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    // Handle manual check-in
    const handleManualCheckIn = (e) => {
        e.preventDefault();
        const ticketCode = e.target.ticketCode.value;
        if (ticketCode) {
            setScanResult(ticketCode);
            verifyTicket(ticketCode);
        }
    };
    
    // Reset the check-in process
    const handleReset = () => {
        setScanResult(null);
        setScanError(null);
        setAttendee(null);
    };

    // Countdown timer for auto-reset
    const AutoResetCountdown = ({ seconds }) => {
        const [countdown, setCountdown] = useState(seconds);
        
        useEffect(() => {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            }
        }, [countdown]);
        
        return (
            <div className="flex items-center">
                <div className="flex items-center justify-center bg-green-100 rounded-full w-6 h-6 mr-2">
                    <span className="text-sm font-medium text-green-800">{countdown}</span>
                </div>
                <span className="text-sm text-gray-600">Auto-scanning next attendee in {countdown} {countdown === 1 ? 'second' : 'seconds'}</span>
            </div>
        );
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={null}
            headerClassName="hidden"
        >
            <Head title="QR Check-In" />

            <div className="py-12 pt-40">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select Event for Check-In</h3>
                            <p className="text-gray-600 mb-4">First, choose the event. The scanner will be enabled once an event is selected.</p>
                            
                            <select
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select an event</option>
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>
                                        {event.title} ({new Date(event.date).toLocaleDateString()})
                                    </option>
                                ))}
                            </select>
                            
                            {!selectedEvent && (
                                <p className="text-amber-600 text-sm mt-2">Please select an event to activate the scanner.</p>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* QR Scanner */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Scan QR Code</h3>
                                
                                {selectedEvent && !attendee && (
                                    <div className="overflow-hidden rounded-lg">
                                        <QrReader
                                            onResult={handleScan}
                                            constraints={{ facingMode: 'environment' }}
                                            containerStyle={{ width: '100%' }}
                                            videoStyle={{ width: '100%' }}
                                        />
                                    </div>
                                )}

                                {!selectedEvent && (
                                    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-md text-gray-500">
                                        <p>Select an event to start scanning.</p>
                                    </div>
                                )}
                                
                                {/* Manual entry form */}
                                <div className="mt-6">
                                    <h4 className="text-md font-medium text-gray-900 mb-2">Or Enter Ticket Code Manually</h4>
                                    <form onSubmit={handleManualCheckIn} className="flex">
                                        <input
                                            type="text"
                                            name="ticketCode"
                                            placeholder="Enter ticket code"
                                            className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            disabled={!selectedEvent || loading}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 disabled:bg-indigo-300"
                                            disabled={!selectedEvent || loading}
                                        >
                                            Verify
                                        </button>
                                    </form>
                                </div>
                            </div>
                            
                            {/* Check-in Results */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Check-in Status</h3>
                                
                                {loading ? (
                                    <div className="flex justify-center items-center h-48">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                                    </div>
                                ) : scanError && !attendee ? ( // Only show error if there's no attendee data
                                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">Check-in Failed</h3>
                                                <p className="text-sm text-red-700 mt-1">{scanError}</p>
                                                <button 
                                                    onClick={handleReset}
                                                    className="mt-3 text-sm font-medium text-red-600 hover:text-red-500"
                                                >
                                                    Try Again
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : attendee ? (
                                    <div className={`${scanError ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'} border rounded-md p-4`}>
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                {scanError ? (
                                                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 100-2 1 1 0 000 2zm-1-3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className={`text-sm font-medium ${scanError ? 'text-yellow-800' : 'text-green-800'}`}>
                                                    {scanError ? 'Already Checked-In' : 'Check-in Successful'}
                                                </h3>
                                                {scanError && <p className="text-sm text-yellow-700 mt-1">{scanError}</p>}
                                                <div className="mt-4 border-t border-gray-200 pt-4">
                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        <div>
                                                            <p className="text-gray-500">Name</p>
                                                            <p className="font-medium">{attendee.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Email</p>
                                                            <p className="font-medium">{attendee.email}</p>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <p className="text-gray-500">Ticket Code</p>
                                                            <p className="font-mono text-xs">{attendee.ticketCode}</p>
                                                        </div>
                                                        {attendee.checked_in_at && (
                                                            <div className="col-span-2">
                                                                <p className="text-gray-500">Checked-in At</p>
                                                                <p className="font-medium">{new Date(attendee.checked_in_at).toLocaleString()}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-3">
                                                    <AutoResetCountdown seconds={2} />
                                                    <p className="text-sm text-gray-500 mt-1">Scanner will automatically reset...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                        <p>Scan a QR code to check in an attendee</p>
                                        {!selectedEvent && (
                                            <p className="text-amber-600 text-sm mt-2">Please select an event first</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 