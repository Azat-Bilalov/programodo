import { useDroppable } from "@dnd-kit/core";

const NAMES = {
    'OP': 'Ожидает выполнения',
    'PR': 'Выполняются',
    'RE': 'Ожидает проверки',
    'CL': 'Завершены',
}

export const TaskListWidget = ({ status, children }) => {
    const name = NAMES[status];

    const { isOver, setNodeRef } = useDroppable({
        id: `task-list-${status}`,
    });
    const className = 'flex flex-col gap-2 p-2 w-full h-fill bg-gray-200 text-gray-700'
        + (isOver ? ' bg-green-200 text-gray-900' : '');

    return (
        <div
            className={className}
            ref={setNodeRef}
        >
            <h3 className="text-xl font-bold">{name} {children.length}</h3>
            <hr className="border-gray-400 mb-2" />
            {children}
        </div>
    )
}
