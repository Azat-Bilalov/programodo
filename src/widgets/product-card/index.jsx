import { useSelector } from "react-redux";

export const ProductCard = (props) => {
    const { id, name, description, version, gitRepo, license, date, comments, myProduct } = props;

    const user = useSelector(user => user.session.user);

    const handleGetProduct = (e) => {
        fetch("/api/clients/products/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.id }),
        }).then(response => response.json())
        .then(_ => {
            e.target.classList.add("hidden");
        });
    }

    const handleOpenComments = () => {
        props.setCommentsSlide(true);
        if (props.setActiveProduct) {
            props.setActiveProduct(id);
        }
        props.setCommentsData(
            <div className="m-3 flex flex-col gap-2">
                {comments.map(el =>
                    <div key={el.id} className="bg-slate-50 drop-shadow-md p-3 rounded-xl">
                        <div className="px-4 sm:px-0">
                            <p className="">{el.text}</p>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{new Date(el.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-slate-50 drop-shadow-md p-3 rounded-xl">
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">{name}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{new Date(date).toLocaleString()}</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Лицензия</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{license}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Версия</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{version}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Репозиторий</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <a href={gitRepo}>{gitRepo}</a>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Описание</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{description}</dd>
                    </div>
                </dl>
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handleOpenComments}
                    type="button"
                    className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Открыть комментарии
                </button>

                { myProduct ? null : <button
                    onClick={handleGetProduct}
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Попробовать
                </button> }
            </div>
        </div>
    );
}
