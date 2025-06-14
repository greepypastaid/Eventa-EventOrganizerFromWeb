import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CreateEventModal({ show, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        organizer: '',
        description: '',
        date: '',
        time: '',
        location: '',
        ticket_price: '',
        photo: null,
        logo: null,
        primary_color: '#6366F1', // Default indigo color
        secondary_color: '#4F46E5', // Default darker indigo
        is_hero: false,
        event_type: 'regular',
    });
    
    const [photoPreview, setPhotoPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setData('logo', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.events.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPhotoPreview(null);
                setLogoPreview(null);
                onClose();
                // You can add a success notification here
            },
        });
    };
    
    return (
        <Modal show={show} onClose={onClose} maxWidth="4xl">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Event</h2>
                
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Basic Information</h3>
                            
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
                                <InputLabel htmlFor="organizer" value="Organizer" />
                                <TextInput
                                    id="organizer"
                                    type="text"
                                    name="organizer"
                                    value={data.organizer}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('organizer', e.target.value)}
                                    required
                                />
                                <InputError message={errors.organizer} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    rows={5}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                        </div>
                        
                        {/* Date, Time, Location */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Date, Time & Location</h3>
                            
                            <div>
                                <InputLabel htmlFor="date" value="Event Date" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={data.date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="time" value="Event Time" />
                                <TextInput
                                    id="time"
                                    type="time"
                                    name="time"
                                    value={data.time}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.time} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="location" value="Location" />
                                <TextInput
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={data.location}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('location', e.target.value)}
                                    required
                                />
                                <InputError message={errors.location} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="ticket_price" value="Ticket Price" />
                                <TextInput
                                    id="ticket_price"
                                    type="number"
                                    name="ticket_price"
                                    value={data.ticket_price}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('ticket_price', e.target.value)}
                                    required
                                    min="0"
                                    step="0.01"
                                />
                                <InputError message={errors.ticket_price} className="mt-2" />
                            </div>
                        </div>
                        
                        {/* Media & Appearance */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Media & Appearance</h3>
                            
                            <div>
                                <InputLabel htmlFor="photo" value="Event Photo" />
                                <input
                                    id="photo"
                                    type="file"
                                    name="photo"
                                    className="mt-1 block w-full"
                                    onChange={handlePhotoChange}
                                    accept="image/*"
                                    required
                                />
                                <InputError message={errors.photo} className="mt-2" />
                                
                                {photoPreview && (
                                    <div className="mt-2">
                                        <img 
                                            src={photoPreview} 
                                            alt="Event preview" 
                                            className="h-40 w-full object-cover rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="logo" value="Event Logo (Optional)" />
                                <input
                                    id="logo"
                                    type="file"
                                    name="logo"
                                    className="mt-1 block w-full"
                                    onChange={handleLogoChange}
                                    accept="image/*"
                                />
                                <InputError message={errors.logo} className="mt-2" />
                                
                                {logoPreview && (
                                    <div className="mt-2">
                                        <img 
                                            src={logoPreview} 
                                            alt="Logo preview" 
                                            className="h-20 w-auto object-contain rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="primary_color" value="Primary Color" />
                                <div className="flex items-center mt-1">
                                    <input
                                        id="primary_color"
                                        type="color"
                                        name="primary_color"
                                        value={data.primary_color}
                                        className="h-10 w-10 rounded-md"
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                    />
                                    <TextInput
                                        type="text"
                                        value={data.primary_color}
                                        className="ml-2 block w-full"
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.primary_color} className="mt-2" />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="secondary_color" value="Secondary Color" />
                                <div className="flex items-center mt-1">
                                    <input
                                        id="secondary_color"
                                        type="color"
                                        name="secondary_color"
                                        value={data.secondary_color}
                                        className="h-10 w-10 rounded-md"
                                        onChange={(e) => setData('secondary_color', e.target.value)}
                                    />
                                    <TextInput
                                        type="text"
                                        value={data.secondary_color}
                                        className="ml-2 block w-full"
                                        onChange={(e) => setData('secondary_color', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.secondary_color} className="mt-2" />
                            </div>
                        </div>
                        
                        {/* Display Options */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Display Options</h3>
                            
                            <div>
                                <InputLabel htmlFor="event_type" value="Event Type" />
                                <select
                                    id="event_type"
                                    name="event_type"
                                    value={data.event_type}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    onChange={(e) => setData('event_type', e.target.value)}
                                    required
                                >
                                    <option value="regular">Regular Event</option>
                                    <option value="concert">Concert</option>
                                </select>
                                <InputError message={errors.event_type} className="mt-2" />
                            </div>
                            
                            <div className="flex items-center mt-4">
                                <Checkbox
                                    id="is_hero"
                                    name="is_hero"
                                    checked={data.is_hero}
                                    onChange={(e) => setData('is_hero', e.target.checked)}
                                />
                                <label htmlFor="is_hero" className="ml-2 text-sm text-gray-600">
                                    Display as Hero Event on Homepage
                                </label>
                                <InputError message={errors.is_hero} className="mt-2" />
                            </div>
                            
                            {data.is_hero && (
                                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <p className="text-sm text-yellow-700">
                                        Note: Only one event can be displayed as Hero. Setting this event as Hero will remove any other event from the Hero section.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2"
                        >
                            Cancel
                        </button>
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Create Event
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}