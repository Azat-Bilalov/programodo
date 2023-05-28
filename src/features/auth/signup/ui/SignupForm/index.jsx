import { useDispatch, useSelector } from 'react-redux';
import { sessionApi } from '@/entities/session';
import { useCallback, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        await sessionApi.signup(data)(dispatch);
    }, [dispatch, session]);

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {session.isLoggedIn &&
                <Navigate to="/community" />
            }
            <div>
                <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
                    ФИО
                </label>
                <div className="mt-2">
                    <input
                        id="fio"
                        name="fio"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="login" className="block text-sm font-medium leading-6 text-gray-900">
                    Логин
                </label>
                <div className="mt-2">
                    <input
                        id="login"
                        name="login"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Почта
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Пароль
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            {/* вывод ошибки */}
            <div>
                <div className="flex justify-center">
                    <p className="text-red-600 font-medium">{session.error}</p>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Регистрация
                    {session.loading &&
                        <div className="w-4 h-4 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
                    }
                </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
                Есть аккаунт?{' '}
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Войти
                </Link>
            </p>
        </form>
    );
};