import React from 'react';

export default function Button({ 
    type = 'primary', 
    className = '', 
    disabled = false, 
    children, 
    ...props 
}) {
    const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none transition ease-in-out duration-150';
    
    const typeClasses = {
        primary: 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        secondary: 'bg-white border-gray-300 text-gray-700 hover:text-gray-500 focus:border-indigo-500 active:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        danger: 'bg-red-600 border-transparent text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
    };
    
    const disabledClasses = 'opacity-25 cursor-not-allowed';
    
    const classes = `${baseClasses} ${typeClasses[type]} ${disabled ? disabledClasses : ''} ${className}`;
    
    return (
        <button
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
} 