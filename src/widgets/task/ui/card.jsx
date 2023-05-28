import { useDraggable } from '@dnd-kit/core';

import { taskModel, TaskCard } from "@/entities/task";
import { projectModel } from "@/entities/project";

export const TaskCardWidget = ({ taskId, projectId, ...args }) => {
    if (!taskId) {
        return null;
    }

    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: `task-${taskId}`,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
    } : undefined;

    const {
        task,
        isLoading: isLoadingTask,
    } = taskModel.useGetTasksQuery(undefined, {
        selectFromResult: ({ data }) => ({
            task: data?.find((task) => task.id === taskId)
        }),
    });

    const { data: project, isLoading, isFetching } = projectModel.useGetProjectsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            project: data?.find((project) => project.id === projectId)
        }),
    });

    return (
        <div
            className="rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer"
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            {...args}
        >
            {(isLoadingTask) &&
                <div className="w-full h-6 animate-pulse bg-gray-400"></div>
            }
            {task && <TaskCard task={task} />}
            <p>
                {(isLoading || isFetching) &&
                    <div className="w-full h-4 animate-pulse bg-gray-400"></div>
                }
                {project && project.name}
            </p>
        </div>
    );
};
