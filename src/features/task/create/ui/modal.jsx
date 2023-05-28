import { useEffect, useState } from 'react';

import { Modal, ErrorAlert } from '@/shared/ui';
import { taskModel } from '@/entities/task';
import { projectModel } from '@/entities/project';

export const TaskCreateModal = ({ open, setOpen }) => {
    const { data: projects } = projectModel.useGetProjectsQuery();

    const [addTask, { error }] = taskModel.useAddTaskMutation();

    const [task, setTask] = useState({
        name: '',
        description: '',
        project: null,
    });

    useEffect(() => {
        if (projects?.length > 0) {
            setTask({ ...task, project: projects[0].id });
        }
    }, [projects]);

    // костыль вывода ошибки
    const [errorAlert, setErrorAlert] = useState(null);
    useEffect(() => {
        if (error) {
            setErrorAlert(<ErrorAlert title="Ошибка" message={error.data.error} />);
        }
    }, [error]);
    useEffect(() => {
        if (errorAlert) {
            setTimeout(() => setErrorAlert(null), 3000);
        }
    }, [errorAlert]);


    const onSubmit = () => {
        if (!task.name || task.name.length < 3) {
            setErrorAlert(<ErrorAlert title="Ошибка" message="Название задачи должно быть не менее 3 символов" />);
            return false;
        }

        addTask({
            name: task.name,
            description: task.description || undefined,
            project: task.project || null,
            status: 'OP',
        });

        setTask({
            name: '',
            description: '',
            project: (projects?.length > 0 ? projects[0].id : null)
        });
    }

    return (
        <>
            <Modal
                open={open}
                setOpen={setOpen}
                onSubmit={onSubmit}
                className="w-full max-w-2xl"
                submitTitle="Создать"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Название</label>
                    <input
                        className="px-4 py-2 rounded-sm text-gray-900"
                        id="name"
                        type="text"
                        placeholder='Название задачи'
                        value={task.name}
                        min={3}
                        onChange={e => setTask({ ...task, name: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        className="px-4 py-2 rounded-sm text-gray-900"
                        rows={5}
                        id="description"
                        placeholder='Описание задачи'
                        value={task.description}
                        onChange={e => setTask({ ...task, description: e.target.value })}
                    />
                </div>
                {projects?.length === 0
                    ? <div className="bg-gray-300 h-4 w-full animate-pulse"></div>
                    : (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="project">Проект</label>
                            <select
                                className="px-4 py-2 rounded-sm bg-white text-gray-900"
                                id="project"
                                value={task.project}
                                onChange={e => setTask({ ...task, project: +e.target.value })}
                            >
                                {projects?.map(project => (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                ))}
                            </select>
                        </div>
                    )
                }
            </Modal>
            {errorAlert}
        </>
    )
}
