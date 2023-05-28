import { dateToFormat } from '@/shared/lib/date';

const PROJECT_TABLE_COLUMNS = [
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'created_at',
        key: 'Запущен',
    },
];

export const ProjectTable = ({ projects = [], selectedProject, onProjectClick }) => {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    {PROJECT_TABLE_COLUMNS.map(column => (
                                        <th scope="col" className="px-6 py-4" key={column.key}>
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {projects
                                    && projects.map(project => (
                                        <tr
                                            key={project.id}
                                            className={
                                                "border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                                + (selectedProject?.id === project.id ? " bg-indigo-100 dark:bg-indigo-700" : "")
                                            }
                                            onClick={() => onProjectClick(project)}
                                        >
                                            <td className="px-6 py-4">{project.name}</td>
                                            <td className="px-6 py-4">{dateToFormat(project.created_at, 'DD.MM.YYYY')}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {projects.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-6 bg-gray-100">
                                <p className="text-gray-500 dark:text-gray-400">Нет данных</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}