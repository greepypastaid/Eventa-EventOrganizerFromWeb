import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import LoginForm from '@/Pages/Auth/Partials/LoginForm';
import RegisterForm from '@/Pages/Auth/Partials/RegisterForm';
import MainNavbar from '@/Components/Navigation/MainNavbar';

export default function GuestLayout({ children, canResetPassword }) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        // Event listeners for opening modals from anywhere in the app
        const loginListener = () => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
        };
        
        const registerListener = () => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
        };
        
        document.addEventListener('open-login-modal', loginListener);
        document.addEventListener('open-register-modal', registerListener);
        
        return () => {
            document.removeEventListener('open-login-modal', loginListener);
            document.removeEventListener('open-register-modal', registerListener);
        };
    }, []);

    const openLoginModal = (e) => {
        if (e) e.preventDefault();
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    const openRegisterModal = (e) => {
        if (e) e.preventDefault();
        setShowLoginModal(false);
        setShowRegisterModal(true);
    };

    const closeModal = () => {
        setShowLoginModal(false);
        setShowRegisterModal(false);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Navigation Bar */}
            <MainNavbar auth={null} />

            {/* Main Content */}
            <main>{children}</main>

            {/* Modals */}
            <Modal show={showLoginModal} onClose={closeModal} maxWidth="sm">
                <LoginForm canResetPassword={canResetPassword} onClose={closeModal} />
            </Modal>

            <Modal show={showRegisterModal} onClose={closeModal} maxWidth="sm">
                <RegisterForm onClose={closeModal} />
            </Modal>
        </div>
    );
}
