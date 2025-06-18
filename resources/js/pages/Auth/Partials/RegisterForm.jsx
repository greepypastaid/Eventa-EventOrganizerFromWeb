import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function RegisterForm({ onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="p-8">
            <Head title="Register" />

            <div className="text-center mb-6">
                <div className="inline-block p-3 bg-indigo-100 rounded-full">
                    <UserPlus className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    Welcome, <span className="text-indigo-600">Eventure!</span>
                </h2>
                <p className="text-sm text-gray-500">Sign up to Eventa for better experience!</p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label className="flex items-center">
                        <Checkbox name="terms" checked={data.terms} onChange={(e) => setData('terms', e.target.checked)} />
                        <span className="ms-2 text-sm text-gray-600">I Accept about <Link href="#" className="underline">Privacy & Policy</Link></span>
                    </label>
                    <InputError message={errors.terms} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-6 space-x-2">
                     <button 
                        type="button" 
                        onClick={onClose}
                        className="w-full px-4 py-2 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                     >
                        Cancel
                    </button>
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Sign up
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
} 