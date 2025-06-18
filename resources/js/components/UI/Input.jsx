import React, { forwardRef } from 'react';

const TextInput = forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const baseClasses = 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm';
    
    return (
        <input
            type={type}
            className={`${baseClasses} ${className}`}
            ref={ref}
            {...props}
        />
    );
});

function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ${className}`}>
            {value ? value : children}
        </label>
    );
}

function InputError({ message, className = '' }) {
    return message ? (
        <p className={`text-sm text-red-600 ${className}`}>{message}</p>
    ) : null;
}

function Textarea({ className = '', ...props }) {
    return (
        <textarea
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
            {...props}
        />
    );
}

export { TextInput, InputLabel, InputError, Textarea }; 