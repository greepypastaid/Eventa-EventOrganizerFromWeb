import GuestLayout from '@/Layouts/GuestLayout';
import RegisterForm from './Partials/RegisterForm';

export default function Register() {
    return (
        <GuestLayout>
            {/* The actual form is now a modal in the layout, 
                but we can render it here as a fallback or for direct navigation. */}
            <h2 className="text-center font-bold text-gray-700">Please click the "Register" button to open the sign-up form.</h2>
            {/* Fallback direct render, though modal is primary */}
            {/* <RegisterForm /> */}
        </GuestLayout>
    );
}
