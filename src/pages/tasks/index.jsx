import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { taskModel } from "@/entities/task";
import { TaskEditModal } from '@/features/task/edit';
import { TaskCreateButton } from '@/features/task/create';
import { SortSelect } from '@/features/task/sort';
import { TaskCardWidget, TaskListWidget } from "@/widgets/task";
import { SideNav } from "@/widgets";
import { projectModel } from "@/entities/project";

export const TasksPage = () => {
    const { data: tasks, errorTasks, isLoadingTasks, isFetchingTasks } = taskModel.useGetTasksQuery();
    const [updateTask, { error: updateErrorTask }] = taskModel.useUpdateTaskMutation();

    const { data: projects, errorProjects, isLoadingProjects, isFetchingProjects } = projectModel.useGetProjectsQuery();

    const [openEditModal, setOpenEditModal] = useState(false);
    const [taskId, setTaskId] = useState(null);

    const [sort, setSort] = useState((a, b) => a > b);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        const id = +active.id.split('-')[1]; // ID задачи
        const task = tasks.find(task => task.id === id); // Задача
        const status = over && over.id.split('-')[2]; // Статус доски

        if (over && task.status !== status) {
            updateTask({ ...task, status });
        } else {
            setTaskId(id);
            setOpenEditModal(true);
        }
    }

    return (
        <>
            <div className="flex direction-row">
                <SideNav />
                <main className="w-full overflow-y-auto h-screen p-5">
                    {/* <SortSelect sort={sort} setSort={setSort} /> */}
                    <TaskCreateButton />
                    <div className="flex gap-5">
                        <DndContext onDragEnd={handleDragEnd}>
                            {
                                projects && tasks &&
                                ['OP', 'PR', 'RE', 'CL'].map(status => (
                                    <TaskListWidget key={status} status={status} >
                                        {tasks && tasks.filter(task => task.status === status).map(task =>
                                            <TaskCardWidget id={task.id} key={task.id} taskId={task.id} projectId={task.project} />
                                        )}
                                    </TaskListWidget>
                                ))
                            }
                        </DndContext>
                    </div>
                </main>
            </div>

            {open && (
                <TaskEditModal
                    taskId={taskId}
                    open={openEditModal}
                    setOpen={setOpenEditModal}
                />
            )}
        </>
    )
}
