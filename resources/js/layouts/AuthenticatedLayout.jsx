import { usePage } from '@inertiajs/react';
import MainNavbar from '@/Components/MainNavbar';

export default function AuthenticatedLayout({ header, children }) {
    const auth = usePage().props.auth;

    return (
        <div className="min-h-screen">
            {/* Main Navigation Bar */}
            <MainNavbar auth={auth} />

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
