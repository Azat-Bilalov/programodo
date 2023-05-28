import { useState } from 'react'

import { workerModel } from '../model'

const WORKER_TABLE_COLUMNS = [
    {
        key: 'fio',
        title: 'ФИО',
    },
    {
        key: 'email',
        title: 'Почта',
    },
    {
        key: 'post',
        title: 'Должность',
    },
    {
        key: 'contacts',
        title: 'Контакты',
    },
];

const WORKER_POSTS = {
    'JDV': 'Разработчик',
    'SDV': 'Старший разработчик',
    'JTS': 'Тестировщик',
    'STS': 'Старший тестировщик',
    'JDS': 'Дизайнер',
    'SDS': 'Старший дизайнер',
    'PJM': 'Менеджер проекта',
    'PDM': 'Менеджер продукта',
    'CEO': 'Администратор',
}

export const WorkerTable = ({ workerIds = [], onWorkerClick, selectedWorker }) => {
    const { data: workers, isLoading } = workerModel.useGetWorkersQuery();

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    {WORKER_TABLE_COLUMNS.map(column => (
                                        <th scope="col" className="px-6 py-4" key={column.key}>
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {workers
                                    && workers
                                        .filter(worker => workerIds.includes(worker.id))
                                        .map(worker => (
                                            <tr
                                                key={worker.id}
                                                className={
                                                    "border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                                    + (selectedWorker?.id === worker.id ? " bg-indigo-100 dark:bg-indigo-700" : "")
                                                }
                                                onClick={() => onWorkerClick(worker)}
                                            >
                                                <td className="px-6 py-4">{worker.fio}</td>
                                                <td className="px-6 py-4">{worker.email}</td>
                                                <td className="px-6 py-4">{WORKER_POSTS[worker.post]}</td>
                                                <td className="px-6 py-4">{worker.contacts}</td>
                                            </tr>
                                        ))}
                                {isLoading && (
                                    <tr>
                                        <td colSpan={WORKER_TABLE_COLUMNS.length} className="h-full">
                                            <div className="animate-pulse bg-gray-500"></div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {workerIds.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 bg-gray-100">
                                <p className="text-gray-500 dark:text-gray-400">Нет данных</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}