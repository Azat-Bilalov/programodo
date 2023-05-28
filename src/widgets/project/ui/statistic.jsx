import { projectModel } from "@/entities/project"
import { Progress } from "@/shared/ui"

const TASK_STATUSES = [
    { id: 'OP', name: 'Открытые' },
    { id: 'PR', name: 'В процессе' },
    { id: 'RE', name: 'На проверке' },
    { id: 'CL', name: 'Закрытые' },
]

export const ProjectStatistic = ({ project }) => {
    const { data: tasks } = projectModel.useGetProjectTasksQuery(project?.id, {
        skip: !project,
        pollingInterval: 3000 // костыль
    });

    const { data: teams } = projectModel.useGetProjectTeamsQuery(project?.id, {
        skip: !project
    });

    return (
        <div className="">
            {!project &&
                <div className="flex justify-center items-center bg-gray-100 text-gray-700 h-10">
                    Выберите проект
                </div>
            }

            {project &&
                <div className="flex flex-col gap-2 mb-5 bg-gray-100 rounded-lg p-2">
                    <table className="table-auto w-full">
                        <tbody>
                            <tr>
                                <td className="text-gray-400">Название</td>
                                <td className="text-gray-800">{project.name}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-400">Описание</td>
                                <td className="text-gray-800">{project.description}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-400">Версия</td>
                                <td className="text-gray-800">{project.version}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-400">Репозиторий</td>
                                <td className="text-gray-800">
                                    <a
                                        className="text-indigo-400 hover:text-indigo-500"
                                        href={project.gitrepository}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Репозиторий
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            {project && tasks &&
                TASK_STATUSES.map(status => (
                    tasks.filter(task => task.status === status.id).length > 0 &&
                    <div key={status.id}>
                        <span className="text-gray-400">{status.name}</span>
                        <Progress
                            value={tasks.filter(task => task.status === status.id).length}
                            max={tasks.length}
                        />
                    </div>
                ))
            }

            {project && teams &&
                <ul className="flex flex-col gap-2 justify-center items-center bg-gray-100 rounded-lg p-2">
                    {teams.map(team =>
                        <li key={team.id}>
                            <span className="text-indigo-400 font-bold bg-indigo-100 rounded-lg px-2 py-1">{team.name}</span>
                        </li>
                    )}
                </ul>
            }

            {project && tasks && tasks.length > 0 &&
                teams && teams.length > 0 &&
                <div className="flex p-2 justify-center"> 
                {/* переписать ссылку */}
                    <a 
                        href={"http://localhost:3000/api/reports/projects/" + project.id} 
                    >
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg">
                            Сформировать отчет
                        </button>
                    </a>
                </div>
            }
        </div>

    );
}