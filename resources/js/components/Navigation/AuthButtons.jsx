import { Link } from '@inertiajs/react';
import AdminMenu from './AdminMenu';

export default function AuthButtons({ auth, isScrolled, needsDarkerText }) {
    const isAdmin = auth?.user?.role === 'admin';
    
    const openLoginModal = (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('open-login-modal'));
    };
    
    const openRegisterModal = (e) => {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('open-register-modal'));
    };
    
    if (auth?.user) {
        return (
            <div className="flex items-center space-x-4">
                {isAdmin && <AdminMenu isScrolled={isScrolled} needsDarkerText={needsDarkerText} />}
                
                {!isAdmin && (
                    <Link 
                        href={route('dashboard')} 
                        className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}
                    >
                        Dashboard
                    </Link>
                )}
                
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-3xl font-medium hover:bg-indigo-700 transition-colors"
                >
                    Log Out
                </Link>
            </div>
        );
    }
    
    return (
        <>
            <Link 
                href={route('login')} 
                onClick={openLoginModal}
                className={`${isScrolled || needsDarkerText ? 'text-gray-700 hover:text-indigo-700' : 'text-white hover:text-gray-200'} transition-colors`}
            >
                Login
            </Link>
            <Link 
                href={route('register')} 
                onClick={openRegisterModal}
                className="bg-indigo-600 text-white px-6 py-2 rounded-3xl font-medium hover:bg-indigo-700 transition-colors"
            >
                SIGN UP
            </Link>
        </>
    );
} 