import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Dialog, Popover } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import { LogoutButton } from '@/features/auth/logout'
import logoSvg from '@/assets/logo.svg'


export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user } = useSelector((state) => state.session);

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Programodo</span>
                        <img className="h-8 w-auto" src={logoSvg} alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
                    {/* Админ */}
                    {user?.hashpassword === "admin" && (
                        <Link
                            to="/admin"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Панель администратора
                        </Link>
                    )}
                    {/* Сотрудник */}
                    {user?.salary && (
                        <>
                            <Link
                                to="/tasks"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Задачи
                            </Link>
                            {["P", "S"].includes(user?.post[0]) && (
                                <Link
                                    to="/teams"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Команда
                                </Link>
                            )}
                            {user?.post[0] === "P" && (
                                <Link
                                    to="/projects"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Проекты
                                </Link>
                            )}
                            {user?.post === "PDM" && (
                                <Link
                                    to="/products"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Продукты
                                </Link>
                            )}
                        </>
                    )}
                    {/* Клиент */}
                    {!user?.fio && (
                        <>
                            <Link to="/products" className="text-sm font-semibold leading-6 text-gray-900">
                                Продукты
                            </Link>
                            <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                                Компания
                            </Link>
                            <Link to="/profile" className="text-sm font-semibold leading-6 text-gray-900">
                                Мой профиль
                            </Link>
                        </>
                    )}
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <LogoutButton />
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only"></span>
                            <img
                                className="h-8 w-auto"
                                src={logoSvg}
                                alt=""
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            {/* Админ */}
                            {user.role && (
                                <div className="py-6 space-y-6">
                                    <Link
                                        to="/admin"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Панель администратора
                                    </Link>
                                </div>
                            )}
                            {/* Сотрудник */}
                            {user.fio && (
                                <div className="py-6 space-y-6">
                                    <Link
                                        to="/tasks"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Задачи
                                    </Link>
                                    <Link
                                        to="/teams"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Команда
                                    </Link>
                                </div>
                            )}
                            {/* Пользователь */}
                            {user.login && (
                                <div className="space-y-2 py-6">
                                    <Link
                                        to="/products"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Продукты
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Компания
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Мой профиль
                                    </Link>
                                </div>
                            )}
                            <div className="py-6">
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}