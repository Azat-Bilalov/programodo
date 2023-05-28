import { dateToFormat } from '@/shared/lib/date';

const PRODUCT_TABLE_COLUMNS = [
    {
        key: 'name',
        title: 'Название',
    },
    {
        key: 'version',
        title: 'Версия',
    },
    {
        key: 'created_at',
        title: 'Запущена',
    },
];


export const ProductTable = ({ products = [], selectedProduct, onProductClick }) => {

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    {PRODUCT_TABLE_COLUMNS.map(column => (
                                        <th scope="col" className="px-6 py-4" key={column.key}>
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {products
                                    && products.map(product => (
                                        <tr
                                            key={product.id}
                                            className={
                                                "border-b transition duration-300 ease-in-out hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                                + (selectedProduct?.id === product.id ? ' bg-green-200 dark:bg-green-600' : '')
                                            }
                                            onClick={() => onProductClick(product)}
                                        >
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4">{product.version}</td>
                                            <td className="px-6 py-4">{dateToFormat(product.created_at, 'DD.MM.YYYY')}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-8 py-10">
                                <p className="text-gray-500 dark:text-gray-400">Нет данных</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
