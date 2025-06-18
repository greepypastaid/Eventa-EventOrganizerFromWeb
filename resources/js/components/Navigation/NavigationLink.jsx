import { Link } from '@inertiajs/react';

export default function NavigationLink({ href, active, isScrolled, needsDarkerText, children }) {
    return (
        <Link 
            href={href} 
            className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors ${active ? 'font-semibold' : ''}`}
        >
            {children}
        </Link>
    );
} 