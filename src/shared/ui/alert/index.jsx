import { useEffect, useState } from 'react';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export const LoadingAlert = ({ message }) => {
    const [loading, setLoading] = useState(message);

    setTimeout(() => {
        setLoading(null);
    }, 2000);

    return (
        <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
            <div className="flex items-center p-6 space-x-4 rounded-md bg-gray-300 text-gray-700 dark:bg-gray-900 dark:text-gray-100">
                <div className="flex items-center self-stretch justify-center">
                    <div className="w-4 h-4 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
                </div>
                <span>{loading}</span>
            </div>
        </div>
    );
}

export const ErrorAlert = ({ message }) => {
    const [show, setShow] = useState(message);

    useEffect(() => {
        setTimeout(() => {
            setShow(null);
        }, 2000);

        console.log('show', show);

        return () => clearTimeout();
    }, []);

    return (
        <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
            <div className="flex items-center p-6 space-x-4 rounded-md bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100">
                <ExclamationCircleIcon className="w-6 h-6" aria-hidden="true" />
                <span>{message}</span>
            </div>
        </div>
    );
}

export const SuccessAlert = ({ message }) => {
    const [success, setSuccess] = useState(message);

    setTimeout(() => {
        setSuccess(null);
    }, 2000);

    return (
        <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4" hidden={!message}>
            <div className="flex items-center p-6 space-x-4 rounded-md bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100">
                <ExclamationCircleIcon className="w-6 h-6" aria-hidden="true" />
                <span>{success}</span>
            </div>
        </div>
    );
}
