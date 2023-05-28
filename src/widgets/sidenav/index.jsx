import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Bars3Icon,
    ViewColumnsIcon,
    UserGroupIcon,
    MapIcon,
    ChatBubbleBottomCenterTextIcon,
    CogIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import { Navigate } from 'react-router-dom';

// грубое нарушение архитектуры
import { UserPanel } from '@/widgets/user-panel';

import logoSvg from '@/assets/logo.svg';

const navItems = [
    { name: 'Задачи', path: '/tasks', role: ['worker', 'admin'], icon: <ViewColumnsIcon className="w-8 h-8" /> },
    { name: 'Команды', path: '/teams', role: ['worker', 'admin'], icon: <UserGroupIcon className="w-8 h-8" /> },
    { name: 'Дорожная карта', path: '/roadmap', role: ['client', 'worker', 'admin'], icon: <MapIcon className="w-8 h-8" /> },
    { name: 'Сообщество', path: '/community', role: ['client', 'worker', 'admin'], icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8" /> },
    // { name: 'Администрирование', path: '/admin', role: ['admin'], icon: <CogIcon className="w-8 h-8" /> },
];

export const SideNav = () => {
    const activePath = window.location.pathname;
    const { user } = useSelector((state) => state.session);

    const [open, setOpen] = useState(false);

    const [openUserPanel, setOpenUserPanel] = useState(false);

    const navItemsFiltered = navItems.filter((item) => item.role.includes(user?.role));

    return (
        <div className="h-screen flex justify-between flex-col p-3 w-min bg-gray-50 text-gray-800">
            <div className="space-y-2">

                {!user && <Navigate to="/login" />}

                {/* Управление меню */}
                <div className="flex min-w-max items-center justify-between">
                    <button
                        className="p-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-gray-500 hover:from-cyan-400 hover:to-blue-400 hover:text-white rounded-lg transition-all duration-300 ease-in-out"
                        onClick={() => setOpen(true)}
                        hidden={open}
                    >
                        <Bars3Icon className="w-8 h-8" />
                    </button>
                    <Link
                        to="/"
                        className="flex min-w-fit gap-2 items-center -m-1.5 p-1.5"
                    >
                        <img
                            className="h-8 w-auto"
                            src={logoSvg}
                            alt=""
                            hidden={!open}
                        />
                        <span
                            className="text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
                            hidden={!open}   
                        >
                            Programodo
                        </span>
                    </Link>
                    <button
                        className="p-2 text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
                        onClick={() => setOpen(false)}
                        hidden={!open}
                    >
                        <XMarkIcon className="w-8 h-8" />
                    </button>
                </div>

                {/* Навигация */}
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        {navItemsFiltered.map((item, index) => (
                            <li key={index} className="rounded-sm">
                                <Link
                                    to={item.path}
                                    {...(activePath === item.path ?
                                        { className: 'flex gap-3 items-center text-sm text-indigo-500 p-2 rounded-sm bg-gray-100' } :
                                        { className: 'flex gap-3 items-center text-sm text-gray-500 hover:text-gray-700 animate transition-all duration-300 ease-in-out p-2 rounded-sm hover:bg-gray-100' }
                                    )}
                                >
                                    {item.icon}
                                    <span
                                        className="truncate"
                                        hidden={!open}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Нижняя панель профиля */}
            <div className="flex min-w-max items-center p-2 space-x-4 justify-self-end">
                <img
                    src="https://source.unsplash.com/100x100/?portrait"
                    className={open ? 'h-12 w-12 rounded-lg' : 'h-8 w-8 rounded-lg'}
                    alt=""
                />
                <div hidden={!open}>
                    <h2 className="text-lg font-semibold">{user?.login}</h2>
                    <span className="flex items-center space-x-1">
                        <button rel="noopener noreferrer" className="text-xs hover:underline text-gray-600" onClick={() => setOpenUserPanel(true)}>
                            Профиль
                        </button>
                    </span>
                </div>
            </div>

            <UserPanel open={openUserPanel} setOpen={setOpenUserPanel} />
        </div>
    );
}
