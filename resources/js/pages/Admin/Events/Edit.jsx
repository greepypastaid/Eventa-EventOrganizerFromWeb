import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, event }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        title: event.title || '',
        organizer: event.organizer || '',
        description: event.description || '',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
        location: event.location || '',
        ticket_price: event.ticket_price || '',
        photo: null,
        logo: null,
        primary_color: event.primary_color || '#6366F1',
        secondary_color: event.secondary_color || '#4F46E5',
        is_hero: event.is_hero || false,
        event_type: event.event_type || 'regular',
    });
    
    const [photoPreview, setPhotoPreview] = useState(event.photo_url || null);
    const [logoPreview, setLogoPreview] = useState(event.logo_url || null);
    
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
        // Use post for multipart form data with PUT method
        post(route('admin.events.update', event.id), {
            forceFormData: true, // This is still needed with `post` to handle file uploads
        });
    };
    
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<div className="h-16 bg-transparent"></div>}
            headerClassName="bg-transparent shadow-none"
        >
            <Head title="Edit Event" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Kolom Kiri - Form Fields */}
                                    <div className="md:col-span-2 space-y-6">
                                        {/* Basic Information */}
                                        <div className="p-6 border rounded-lg shadow-md bg-gray-50">
                                            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Informasi Dasar</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <InputLabel htmlFor="title" value="Judul Event" />
                                                    <TextInput id="title" type="text" name="title" value={data.title} className="mt-1 block w-full" onChange={(e) => setData('title', e.target.value)} required />
                                                    <InputError message={errors.title} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="organizer" value="Penyelenggara" />
                                                    <TextInput id="organizer" type="text" name="organizer" value={data.organizer} className="mt-1 block w-full" onChange={(e) => setData('organizer', e.target.value)} required />
                                                    <InputError message={errors.organizer} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="description" value="Deskripsi" />
                                                    <Textarea id="description" name="description" value={data.description} className="mt-1 block w-full" onChange={(e) => setData('description', e.target.value)} required rows={5} />
                                                    <InputError message={errors.description} className="mt-2" />
                                                </div>
                                </div>
                            </div>
                            
                                        {/* Date, Time, Location & Price */}
                                        <div className="p-6 border rounded-lg shadow-md bg-gray-50">
                                            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Waktu, Tempat & Harga</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <InputLabel htmlFor="date" value="Tanggal Event" />
                                                    <TextInput id="date" type="date" name="date" value={data.date} className="mt-1 block w-full" onChange={(e) => setData('date', e.target.value)} required />
                                                    <InputError message={errors.date} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="time" value="Waktu Event" />
                                                    <TextInput id="time" type="time" name="time" value={data.time} className="mt-1 block w-full" onChange={(e) => setData('time', e.target.value)} required />
                                                    <InputError message={errors.time} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="location" value="Lokasi" />
                                                    <TextInput id="location" type="text" name="location" value={data.location} className="mt-1 block w-full" onChange={(e) => setData('location', e.target.value)} required />
                                                    <InputError message={errors.location} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="ticket_price" value="Harga Tiket (Rp)" />
                                                    <TextInput id="ticket_price" type="number" name="ticket_price" value={data.ticket_price} className="mt-1 block w-full" onChange={(e) => setData('ticket_price', e.target.value)} required min="0" />
                                                    <InputError message={errors.ticket_price} className="mt-2" />
                                                </div>
                                            </div>
                                        </div>
                                         {/* Media & Appearance */}
                                         <div className="p-6 border rounded-lg shadow-md bg-gray-50">
                                            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Media & Tampilan</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div>
                                                    <InputLabel htmlFor="primary_color" value="Warna Primer" />
                                                    <div className="flex items-center mt-1">
                                                        <input id="primary_color" type="color" name="primary_color" value={data.primary_color} className="h-10 w-10 p-1 border rounded-md" onChange={(e) => setData('primary_color', e.target.value)} />
                                                        <TextInput type="text" value={data.primary_color} className="ml-2 w-full" onChange={(e) => setData('primary_color', e.target.value)} />
                                                    </div>
                                                    <InputError message={errors.primary_color} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="secondary_color" value="Warna Sekunder" />
                                                    <div className="flex items-center mt-1">
                                                        <input id="secondary_color" type="color" name="secondary_color" value={data.secondary_color} className="h-10 w-10 p-1 border rounded-md" onChange={(e) => setData('secondary_color', e.target.value)} />
                                                        <TextInput type="text" value={data.secondary_color} className="ml-2 w-full" onChange={(e) => setData('secondary_color', e.target.value)} />
                                                    </div>
                                                    <InputError message={errors.secondary_color} className="mt-2" />
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <label className="flex items-center">
                                                    <Checkbox name="is_hero" checked={data.is_hero} onChange={(e) => setData('is_hero', e.target.checked)} />
                                                    <span className="ml-2 text-sm text-gray-600">Jadikan event ini sebagai Hero di Homepage?</span>
                                                </label>
                                            </div>
                                            <div className='mt-4'>
                                                <h4 className="text-md font-medium text-gray-700">Tipe Event</h4>
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <label className="flex items-center">
                                                        <input type="radio" name="event_type" value="regular" checked={data.event_type === 'regular'} onChange={(e) => setData('event_type', e.target.value)} className="form-radio" />
                                                        <span className="ml-2 text-sm">Regular</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="radio" name="event_type" value="concert" checked={data.event_type === 'concert'} onChange={(e) => setData('event_type', e.target.value)} className="form-radio" />
                                                        <span className="ml-2 text-sm">Konser</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kolom Kanan - File Uploads & Preview */}
                                    <div className="space-y-6">
                                        <div className="p-6 border rounded-lg shadow-md bg-gray-50">
                                            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Media Upload</h3>
                                            <div>
                                                <InputLabel htmlFor="photo" value="Foto Event" />
                                                <input id="photo" type="file" name="photo" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={handlePhotoChange} accept="image/*" />
                                                <InputError message={errors.photo} className="mt-2" />
                                                <p className="text-xs text-gray-500 mt-1">Ganti foto event jika diperlukan.</p>
                                                {photoPreview && (
                                                    <div className="mt-4 border p-2 rounded-lg">
                                                        <p className="text-sm font-medium text-center mb-2">Preview Foto</p>
                                                        <img src={photoPreview} alt="Event preview" className="h-48 w-full object-cover rounded-md" />
                                </div>
                                                )}
                                            </div>
                                            <div className="mt-6">
                                                <InputLabel htmlFor="logo" value="Logo Event (Opsional)" />
                                                <input id="logo" type="file" name="logo" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={handleLogoChange} accept="image/*" />
                                                <InputError message={errors.logo} className="mt-2" />
                                                <p className="text-xs text-gray-500 mt-1">Ganti logo event jika diperlukan.</p>
                                                {logoPreview && (
                                                    <div className="mt-4 border p-2 rounded-lg">
                                                        <p className="text-sm font-medium text-center mb-2">Preview Logo</p>
                                                        <img src={logoPreview} alt="Logo preview" className="h-24 w-auto object-contain rounded-md mx-auto" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-6 border rounded-lg shadow-md bg-gray-50">
                                             <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Theme Preview</h3>
                                             <div className="p-4 rounded-lg" style={{ backgroundColor: data.primary_color }}>
                                                 <h4 className="font-bold text-lg mb-2" style={{ color: data.secondary_color }}>Sample Header</h4>
                                            <div className="bg-white p-3 rounded-md">
                                                     <p className="text-sm" style={{ color: data.primary_color }}>Content area</p>
                                            </div>
                                            <button 
                                                     type="button"
                                                     className="mt-3 px-4 py-2 rounded-md text-white font-semibold"
                                                style={{ backgroundColor: data.secondary_color }}
                                            >
                                                Sample Button
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <div className="flex items-center justify-end space-x-4 mt-8 pt-4 border-t">
                                    <PrimaryButton disabled={processing}>
                                        Update Event
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}