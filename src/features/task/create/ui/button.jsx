import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TaskCreateModal } from './modal';

export const TaskCreateButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="flex items-center gap-2 px-4 py-2 rounded-sm bg-green-500 hover:bg-green-600 text-gray-100"
                onClick={() => setOpen(true)}
            >
                <PlusIcon className="w-4 h-4" />
                <span>Создать задачу</span>
            </button>
            <TaskCreateModal open={open} setOpen={setOpen} />
        </>
    )
}