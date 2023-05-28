import { useState } from 'react';

import { teamModel } from '../model'
import { dateToFormat } from '@/shared/lib/date';

const TEAM_TABLE_COLUMNS = [
    {
        key: 'name',
        title: 'Название',
    },
    {
        key: 'direction',
        title: 'Направление',
    },
    {
        key: 'created_at',
        title: 'Запущена',
    },
];

const TEAM_DIRECTIONS = {
    'DV': 'Разработка',
    'DS': 'Дизайн',
    'TS': 'Тестирование',
}

export const TeamTable = ({ teamIds = [], onTeamClick, selectedTeam }) => {
    const { data: teams, isLoading } = teamModel.useGetTeamsQuery();

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    {TEAM_TABLE_COLUMNS.map(column => (
                                        <th scope="col" className="px-6 py-4" key={column.key}>
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {teams
                                    && teams
                                        .filter(team => teamIds.includes(team.id))
                                        .map(team => (
                                            <tr
                                                key={team.id}
                                                className={
                                                    "border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                                    + (selectedTeam?.id === team.id ? ' bg-green-200 dark:bg-green-600' : '')
                                                }
                                                onClick={() => onTeamClick(team)}
                                            >
                                                <td className="px-6 py-4">{team.name}</td>
                                                <td className="px-6 py-4">{TEAM_DIRECTIONS[team.direction]}</td>
                                                <td className="px-6 py-4">{dateToFormat(team.created_at, 'DD.MM.YYYY')}</td>
                                            </tr>
                                        ))
                                }
                                {isLoading && (
                                    <tr>
                                        <td colSpan={TEAM_TABLE_COLUMNS.length} className="height-full">
                                            <div className="animate-pulse bg-gray-500"></div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {teamIds.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full py-10">
                                <p className="text-gray-500 dark:text-gray-400">Нет данных</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
