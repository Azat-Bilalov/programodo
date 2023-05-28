import { useDroppable } from "@dnd-kit/core";

export const TaskList = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        backgroundColor: isOver ? 'green' : undefined,
    };

    return (
        <div
            className="flex flex-col gap-2 p-3 h-fill bg-gray-500"
            ref={setNodeRef}
            style={style}
        >
            {props.children}
        </div>
    )
}
