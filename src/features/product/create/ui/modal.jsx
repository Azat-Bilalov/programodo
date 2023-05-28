import { useEffect, useState } from 'react';

import { productModel } from '@/entities/product';

export const ProductCreateModal = ({ open, setOpen }) => {

    const [createProduct, { error, isSuccess }] = productModel.useCreateProductMutation();

    const handleSubmit = (e) => {
        console.log('submit');
        e.preventDefault();

        const data = new FormData(e.target);

        createProduct({
            name: data.get('name'),
            description: data.get('description'),
            version: data.get('version'),
            gitRepository: data.get('gitRepository'),
            license: data.get('license'),
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
        >
            <div className="flex flex-col gap-2 p-6 rounded-md shadow-md bg-gray-100 text-gray-900 w-full max-w-md">
                <h2 className="text-xl font-semibold text-center">Создание продукта</h2>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Название</label>
                        <input
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="name"
                            type="text"
                            placeholder='Название продукта'
                            minLength={3}
                            maxLength={30}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description">Описание</label>
                        <textarea
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="description"
                            type="text"
                            placeholder='Описание продукта'
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="version">Версия</label>
                        <input
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="version"
                            type="text"
                            placeholder='Версия продукта'
                            maxLength={10}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="gitRepository">Git репозиторий</label>
                        <input
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="gitRepository"
                            type="text"
                            placeholder="Git репозиторий"
                            minLength={3}
                            maxLenght={50}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="license">Лицензия</label>
                        <input
                            className="px-4 py-2 rounded-sm text-gray-900"
                            name="license"
                            type="text"
                            placeholder="Лицензия"
                            maxLenght={20}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 rounded-md bg-gray-300 text-gray-900 hover:bg-gray-400 transition duration-300 delay-150 ease-in-out"
                            onClick={() => setOpen(false)}
                        >
                            Отмена
                        </button>
                        <button
                            className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-gray-100 transition duration-300 delay-150 ease-in-out"
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
