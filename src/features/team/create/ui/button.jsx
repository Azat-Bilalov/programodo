import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TeamCreateModal } from './modal';

export const TeamCreateButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="flex w-full justify-center items-center gap-2 px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-gray-100 transition duration-300 delay-150 ease-in-out"
                onClick={() => setOpen(true)}
            >
                <PlusIcon className="w-6 h-6" />
                <span>Создать команду</span>
            </button>
            <TeamCreateModal open={open} setOpen={setOpen} />
        </>
    )
}