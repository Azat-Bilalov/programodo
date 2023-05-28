import {useDraggable} from '@dnd-kit/core';

export const TaskCard = ({ task }) => {
    if (!task) {
        return null;
    }

    const { id, name, updated_at: updatedAt } = task;

    return (
        <>
            <p className="font-bold tracking-wide">
                <span className="text-gray-400">#{task.id}</span>
                {' '} {task.name}
            </p>
            <p className="text-sm text-gray-400">
                {updatedAt}
            </p>
        </>
    );
};
