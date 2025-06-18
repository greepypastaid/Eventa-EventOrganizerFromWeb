import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }) {
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
        sessions: []
    });
    
    const [photoPreview, setPhotoPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [sessionFormVisible, setSessionFormVisible] = useState(false);
    const [currentSession, setCurrentSession] = useState({
        name: '',
        description: '',
        speaker: '',
        start_time: '',
        end_time: '',
        capacity: '',
        is_full_day: false
    });
    
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
    
    const handleSessionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentSession({
            ...currentSession,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    
    const addSession = () => {
        // Validate session data
        if (!currentSession.name || !currentSession.start_time || !currentSession.end_time) {
            alert('Mohon isi semua field yang wajib diisi');
            return;
        }
        
        // Add the session to the event data
        setData('sessions', [...data.sessions, { ...currentSession, id: Date.now() }]);
        
        // Reset the session form
        setCurrentSession({
            name: '',
            description: '',
            speaker: '',
            start_time: '',
            end_time: '',
            capacity: '',
            is_full_day: false
        });
        
        // Hide the session form
        setSessionFormVisible(false);
    };
    
    const removeSession = (sessionId) => {
        setData('sessions', data.sessions.filter(session => session.id !== sessionId));
    };
    
    const submit = (e) => {
        e.preventDefault();
        post(route('admin.events.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };
    
    return (
        <AuthenticatedLayout
            auth={auth}
            header={null}
            headerClassName="hidden"
        >
            <Head title="Buat Event Baru" />

            <div className="py-12 pt-32">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Buat Event Baru</h2>
                            </div>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Basic Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Informasi Dasar</h3>
                                        
                                        <div>
                                            <InputLabel htmlFor="title" value="Judul Event" />
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
                                            <InputLabel htmlFor="organizer" value="Penyelenggara" />
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
                                            <InputLabel htmlFor="description" value="Deskripsi" />
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
                                        <h3 className="text-lg font-medium">Tanggal, Waktu & Lokasi</h3>
                                        
                                        <div>
                                            <InputLabel htmlFor="date" value="Tanggal Event" />
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
                                            <InputLabel htmlFor="time" value="Waktu Event" />
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
                                            <InputLabel htmlFor="location" value="Lokasi" />
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
                                            <InputLabel htmlFor="ticket_price" value="Harga Tiket (Rp)" />
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
                                        <h3 className="text-lg font-medium">Media & Tampilan</h3>
                                        
                                        <div>
                                            <InputLabel htmlFor="photo" value="Foto Event" />
                                            <input
                                                id="photo"
                                                type="file"
                                                name="photo"
                                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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
                                            <InputLabel htmlFor="logo" value="Logo Event (Opsional)" />
                                            <input
                                                id="logo"
                                                type="file"
                                                name="logo"
                                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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
                                            <InputLabel htmlFor="primary_color" value="Warna Primer" />
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
                                            <InputLabel htmlFor="secondary_color" value="Warna Sekunder" />
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
                                        <h3 className="text-lg font-medium">Opsi Tampilan</h3>
                                        
                                        <div>
                                            <InputLabel htmlFor="event_type" value="Tipe Event" />
                                            <select
                                                id="event_type"
                                                name="event_type"
                                                value={data.event_type}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                onChange={(e) => setData('event_type', e.target.value)}
                                                required
                                            >
                                                <option value="regular">Regular Event</option>
                                                <option value="concert">Konser</option>
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
                                                Tampilkan sebagai Hero Event di Homepage
                                            </label>
                                            <InputError message={errors.is_hero} className="mt-2" />
                                        </div>
                                        
                                        {data.is_hero && (
                                            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                                <p className="text-sm text-yellow-700">
                                                    Catatan: Hanya satu event yang dapat ditampilkan sebagai Hero. Menjadikan event ini sebagai Hero akan menghapus event lain dari bagian Hero.
                                                </p>
                                            </div>
                                        )}
                                        
                                        <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: data.primary_color + '20' }}>
                                            <h4 className="font-bold text-lg mb-2" style={{ color: data.primary_color }}>Preview Tema</h4>
                                            <div className="bg-white p-3 rounded-md">
                                                <p className="text-sm" style={{ color: data.primary_color }}>Area konten</p>
                                            </div>
                                            <button 
                                                type="button"
                                                className="mt-3 px-4 py-2 rounded-md text-white font-semibold"
                                                style={{ backgroundColor: data.secondary_color }}
                                            >
                                                Contoh Tombol
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Event Sessions */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h3 className="text-lg font-medium mb-4">Sesi Event</h3>
                                    
                                    {/* List of added sessions */}
                                    {data.sessions.length > 0 ? (
                                        <div className="mb-6 space-y-4">
                                            <h4 className="text-md font-medium text-gray-700">Sesi yang Ditambahkan:</h4>
                                            <div className="space-y-3">
                                                {data.sessions.map((session) => (
                                                    <div key={session.id} className="flex items-start justify-between bg-gray-50 p-4 rounded-md border border-gray-200">
                                                        <div>
                                                            <h5 className="font-medium">{session.name}</h5>
                                                            <p className="text-sm text-gray-600">
                                                                {new Date(session.start_time).toLocaleString()} - {new Date(session.end_time).toLocaleString()}
                                                            </p>
                                                            {session.speaker && (
                                                                <p className="text-sm text-gray-600">Pembicara: {session.speaker}</p>
                                                            )}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSession(session.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 mb-4">Belum ada sesi yang ditambahkan. Tambahkan sesi untuk memungkinkan peserta memilih bagian acara yang ingin mereka hadiri.</p>
                                    )}
                                    
                                    {/* Add Session Button */}
                                    {!sessionFormVisible ? (
                                        <button
                                            type="button"
                                            onClick={() => setSessionFormVisible(true)}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Tambah Sesi
                                        </button>
                                    ) : (
                                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                            <h4 className="text-md font-medium mb-4">Tambah Sesi Baru</h4>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <InputLabel htmlFor="session_name" value="Nama Sesi *" />
                                                    <TextInput
                                                        id="session_name"
                                                        type="text"
                                                        name="name"
                                                        value={currentSession.name}
                                                        className="mt-1 block w-full"
                                                        onChange={handleSessionChange}
                                                        required
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <InputLabel htmlFor="session_speaker" value="Pembicara (Opsional)" />
                                                    <TextInput
                                                        id="session_speaker"
                                                        type="text"
                                                        name="speaker"
                                                        value={currentSession.speaker}
                                                        className="mt-1 block w-full"
                                                        onChange={handleSessionChange}
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <InputLabel htmlFor="session_start" value="Waktu Mulai *" />
                                                    <TextInput
                                                        id="session_start"
                                                        type="datetime-local"
                                                        name="start_time"
                                                        value={currentSession.start_time}
                                                        className="mt-1 block w-full"
                                                        onChange={handleSessionChange}
                                                        required
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <InputLabel htmlFor="session_end" value="Waktu Selesai *" />
                                                    <TextInput
                                                        id="session_end"
                                                        type="datetime-local"
                                                        name="end_time"
                                                        value={currentSession.end_time}
                                                        className="mt-1 block w-full"
                                                        onChange={handleSessionChange}
                                                        required
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <InputLabel htmlFor="session_capacity" value="Kapasitas (Opsional)" />
                                                    <TextInput
                                                        id="session_capacity"
                                                        type="number"
                                                        name="capacity"
                                                        value={currentSession.capacity}
                                                        className="mt-1 block w-full"
                                                        onChange={handleSessionChange}
                                                        min="1"
                                                    />
                                                </div>
                                                
                                                <div className="flex items-center mt-6">
                                                    <Checkbox
                                                        id="session_full_day"
                                                        name="is_full_day"
                                                        checked={currentSession.is_full_day}
                                                        onChange={handleSessionChange}
                                                    />
                                                    <label htmlFor="session_full_day" className="ml-2 text-sm text-gray-600">
                                                        Ini adalah sesi sehari penuh
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            <div className="mb-4">
                                                <InputLabel htmlFor="session_description" value="Deskripsi (Opsional)" />
                                                <Textarea
                                                    id="session_description"
                                                    name="description"
                                                    value={currentSession.description}
                                                    className="mt-1 block w-full"
                                                    onChange={handleSessionChange}
                                                    rows={3}
                                                />
                                            </div>
                                            
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setSessionFormVisible(false)}
                                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                                                >
                                                    Batal
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={addSession}
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    Tambah Sesi
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Buat Event
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