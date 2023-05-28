import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {
    BuildingStorefrontIcon,
    UserGroupIcon,
    RectangleStackIcon,
    CakeIcon,
    BriefcaseIcon,
    HandRaisedIcon,
    ChatBubbleLeftIcon,
    TrashIcon,
    PlusIcon,
    PencilSquareIcon,
    PencilIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline'

import { SideNav } from '@/widgets'

const categories = [
    {
        id: 'workers',
        title: 'Работники',
        avatar: <BuildingStorefrontIcon className='h-5 w-5' />,
    },
    {
        id: 'clients',
        title: 'Клиенты',
        avatar: <UserGroupIcon className='h-5 w-5' />,
    },
    {
        id: 'tasks',
        title: 'Задачи',
        avatar: <RectangleStackIcon className='h-5 w-5' />,
    },
    {
        id: 'products',
        title: 'Продукты',
        avatar: <CakeIcon className='h-5 w-5' />,
    },
    {
        id: 'projects',
        title: 'Проекты',
        avatar: <BriefcaseIcon className='h-5 w-5' />,
    },
    {
        id: 'teams',
        title: 'Команды',
        avatar: <HandRaisedIcon className='h-5 w-5' />,
    },
    {
        id: 'comments',
        title: 'Комментарии',
        avatar: <ChatBubbleLeftIcon className='h-5 w-5' />,
    }
]

export const AdminPage = () => {
    const [selected, setSelected] = useState(categories[0]);
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [readonly, setReadonly] = useState(true);

    useEffect(() => {
        fetch('api/' + selected.id)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    if (item.hashpassword) {
                        item.password = '********';
                        delete item.hashpassword;
                    }
                    if (item.created_at) {
                        item.created_at = new Date(item.created_at).toLocaleString();
                    }
                    return item;
                });
                setData(data);
                if (data.length > 0) {
                    setHeaders(Object.keys(data[0]));
                } else {
                    setHeaders([]);
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }, [selected]);

    const handleTrash = (id) => {
        fetch('api/' + selected.id + '/' + id, {
            method: 'DELETE'
        });
        setData(data.filter(item => item.id !== id));
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const inputs = e.target.closest('tr').childNodes;

        const fields = {};
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i].childNodes[0];
            if (input && input.tagName === 'INPUT') {
                fields[input.name] = input.value;
            }
        }

        // если одно из полей пустое, то алертим
        if (Object.values(fields).includes('')) {
            alert('Заполните все поля');
            return;
        }

        fetch('api/' + selected.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
            .then(response => response.json())
            .then(fields => {
                if (fields.error) {
                    alert(fields.error);
                    return;
                }

                if (fields.hashpassword) {
                    fields.password = '********';
                    delete fields.hashpassword;
                }
                if (fields.created_at) {
                    fields.created_at = new Date(fields.created_at).toLocaleString();
                }

                setData([...data, fields]);

                // очищаем поля
                for (let i = 0; i < inputs.length; i++) {
                    const input = inputs[i].childNodes[0];
                    if (input && input.tagName === 'INPUT') {
                        input.value = '';
                    }
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const inputs = e.target.closest('tr').childNodes;

        const fields = {};
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i].childNodes[0];
            if (input && input.tagName === 'INPUT') {
                fields[input.name] = input.value;
            }
        }

        // если одно из полей пустое, то алертим
        if (Object.values(fields).includes('')) {
            alert('Заполните все поля');
            return;
        }

        fetch('api/' + selected.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })
            .then(response => response.json())
            .then(fields => {
                if (fields.error) {
                    alert(fields.error);
                    return;
                }

                if (fields.hashpassword) {
                    fields.password = '********';
                    delete fields.hashpassword;
                }
                if (fields.created_at) {
                    fields.created_at = new Date(fields.created_at).toLocaleString();
                }

                setData(data.map(item => item.id === fields.id ? fields : item));
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }

    const sortData = (header) => {
        setData([...data.sort((a, b) => {
            if (a[header] < b[header]) {
                return -1;
            }
            if (a[header] > b[header]) {
                return 1;
            }
            return 0;
        })]);
    }

    return (
        <>
            <div className="flex flex-row">
                <SideNav />
                <main className="w-full overflow-y-auto gap-5 h-screen p-3">
                    <div className="m-2 flex items-center justify-between">
                        <Listbox className="w-1/3" value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                        <span className="flex items-center">
                                            {selected.avatar}
                                            <span className="ml-3 block truncate">{selected.title}</span>
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {categories.map((category) => (
                                                <Listbox.Option
                                                    key={category.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={category}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                {category.avatar}
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {category.title}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            )}
                        </Listbox>
                        <button
                            className="bg-transparent hover:bg-gray-200"
                            onClick={() => setReadonly(!readonly)}
                        >
                            {readonly ?
                                <BookOpenIcon className="h-5 w-5" /> :
                                <PencilSquareIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    <div className='m-2'>
                        {data.length > 0 ?
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-500">
                                                    <tr>
                                                        {headers.map((header) => (
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-4"
                                                                onClick={() => sortData(header)}
                                                            >
                                                                {header}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row) => (
                                                        <tr
                                                            key={"row" + row.id}
                                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                            {Object.values(row).map((value, i) => (
                                                                <td key={i} className="px-6 py-4">
                                                                    {readonly ? value :
                                                                        <input
                                                                            name={headers[i]}
                                                                            className='border border-gray-300 rounded-md'
                                                                            type="text"
                                                                            defaultValue={value}
                                                                            placeholder={headers[i]}
                                                                            disabled={['created_at', 'updated_at', 'id'].includes(headers[i])}
                                                                        />}
                                                                </td>
                                                            ))}
                                                            <td>
                                                                {readonly ?
                                                                    <button
                                                                        onClick={() => handleTrash(row.id)}
                                                                        className='bg-transparent'
                                                                    >
                                                                        <TrashIcon className='h-5 w-5 text-red-500' />
                                                                    </button> :
                                                                    <button
                                                                        onClick={handleEdit}
                                                                        className='bg-transparent'
                                                                    >
                                                                        <PencilIcon className='h-5 w-5 text-blue-500' />
                                                                    </button>}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {/* поля для ввода новых данных */}
                                                    {!readonly && <tr
                                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                        {headers.map((header, i) => (
                                                            <td key={i} className="px-6 py-4">
                                                                <input
                                                                    name={header}
                                                                    className='border border-gray-300 rounded-md'
                                                                    type="text"
                                                                    placeholder={header}
                                                                    disabled={['created_at', 'updated_at', 'id'].includes(header)}
                                                                />
                                                            </td>
                                                        ))}
                                                        <td>
                                                            <button
                                                                onClick={handleAdd}
                                                                className='bg-transparent'
                                                            >
                                                                <PlusIcon className='h-5 w-5 text-green-500' />
                                                            </button>
                                                        </td>
                                                    </tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='flex justify-center items-center h-96'>
                                <div className='text-2xl text-gray-400'>Нет данных</div>
                            </div>
                        }
                    </div>
                </main>
            </div>
        </>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
