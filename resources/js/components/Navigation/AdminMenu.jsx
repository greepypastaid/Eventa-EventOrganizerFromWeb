import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function AdminMenu({ isScrolled, needsDarkerText }) {
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
    
    return (
        <div className="relative">
            <button 
                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                className={`flex items-center ${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}
            >
                Admin Panel
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {isAdminMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-3xl shadow-lg py-2 z-10">
                    <AdminMenuItem href={route('dashboard')} onClick={() => setIsAdminMenuOpen(false)}>
                        Dashboard
                    </AdminMenuItem>
                    <AdminMenuItem href={route('admin.events.index')} onClick={() => setIsAdminMenuOpen(false)}>
                        Manage Events
                    </AdminMenuItem>
                    <AdminMenuItem href={route('admin.events.create')} onClick={() => setIsAdminMenuOpen(false)}>
                        Create Event
                    </AdminMenuItem>
                    <AdminMenuItem href={route('registrations')} onClick={() => setIsAdminMenuOpen(false)}>
                        Registrations
                    </AdminMenuItem>
                    <AdminMenuItem href={route('check-in')} onClick={() => setIsAdminMenuOpen(false)}>
                        QR Check-in
                    </AdminMenuItem>
                    <AdminMenuItem href={route('analytics')} onClick={() => setIsAdminMenuOpen(false)}>
                        Analytics
                    </AdminMenuItem>
                </div>
            )}
        </div>
    );
}

function AdminMenuItem({ href, onClick, children }) {
    return (
        <Link 
            href={href} 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onClick}
        >
            {children}
        </Link>
    );
} 