import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ProjectCreateModal } from './modal';

export const ProjectCreateButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="flex w-full justify-center items-center gap-2 px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-gray-100 transition duration-300 delay-150 ease-in-out"
                onClick={() => setOpen(true)}
            >
                <PlusIcon className="w-6 h-6" />
                <span>Создать проект</span>
            </button>
            <ProjectCreateModal open={open} setOpen={setOpen} />
        </>
    )
}