import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Lock } from 'lucide-react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function LoginForm({ status, canResetPassword, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                if (onClose) {
                    onClose();
                }
            },
        });
    };

    return (
        <div className="p-8">
            <Head title="Log in" />
            <div className="text-center mb-6">
                <div className="inline-block p-3 bg-indigo-100 rounded-full">
                    <Lock className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    Welcome back, <span className="text-indigo-600">Eventure!</span>
                </h2>
                <p className="text-sm text-gray-500">Book the upcoming in a second!</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email or username" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Keep me logged in</span>
                    </label>
                    
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-indigo-600 hover:text-indigo-800 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot Password
                        </Link>
                    )}
                </div>


                <div className="flex items-center justify-end mt-6 space-x-2">
                     <button 
                        type="button" 
                        onClick={onClose}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                     >
                        Cancel
                    </button>
                    <PrimaryButton className="w-full justify-center" disabled={processing}>
                        Login
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
} 