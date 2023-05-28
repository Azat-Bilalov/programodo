import { useEffect, useState } from 'react';

import { teamModel } from '@/entities/team';
import { projectModel } from '@/entities/project';

export const TeamCreateModal = ({ open, setOpen }) => {
    const { data: projects } = projectModel.useGetProjectsQuery();

    const [addTeam, { error, isLoading, isSuccess }] = teamModel.useAddTeamMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        addTeam({
            name: data.get('name'),
            direction: data.get('direction'),
            project: data.get('project'),
        });
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
        }
    }, [isSuccess]);

    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={e => e.target === e.currentTarget && setOpen(false)}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-gray-100 text-gray-900 w-full max-w-md">
                <h2 className="text-xl font-semibold text-center">Создание команды</h2>
                <form
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Название</label>
                        <input
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="name"
                            type="text"
                            placeholder='Название команды'
                            min={3}
                            max={32}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Направление</label>
                        <select
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="direction"
                        >
                            <option value="DV">Разработка</option>
                            <option value="DS">Дизайн</option>
                            <option value="TS">Тестирование</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="project">Проект</label>
                        <select
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="project"
                        >
                            {projects?.map(project => (
                                <option key={project.id} value={project.id}>{project.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-6 py-2 rounded-sm shadow-sm bg-gray-300 hover:bg-gray-400 text-gray-900"
                            onClick={() => setOpen(false)}
                        >
                            Отмена
                        </button>
                        <button
                            className="px-6 py-2 rounded-sm shadow-sm bg-indigo-500 hover:bg-indigo-600 text-gray-100"
                            type="submit"
                        >
                            Создать
                        </button>
                    </div>
                </form>

                {error && <div className="text-red-500 text-center">{error.data.error}</div>}
            </div>
        </div>
    )
}
