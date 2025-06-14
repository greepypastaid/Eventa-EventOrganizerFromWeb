import GuestLayout from '@/Layouts/GuestLayout';
import LoginForm from './Partials/LoginForm';

export default function Login({ status, canResetPassword }) {
    return (
        <GuestLayout>
            {/* The actual form is now a modal in the layout, 
                but we can render it here as a fallback or for direct navigation. */}
            <h2 className="text-center font-bold text-gray-700">Please click the "Login" button to open the login form.</h2>
            {/* Fallback direct render, though modal is primary */}
            {/* <LoginForm status={status} canResetPassword={canResetPassword} /> */}
        </GuestLayout>
    );
}
