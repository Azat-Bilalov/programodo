import { useParams } from "react-router-dom";
import { SideNav } from "@/widgets";
import { productModel } from "@/entities/product";
import { Link } from "react-router-dom";
import { dateToFormat } from "@/shared/lib/date";
import { CommentForm } from "@/features/comment/create";
import { useSelector } from "react-redux";

export const ProductPage = () => {
    const { id } = useParams();

    const user = useSelector(state => state.session.user);
    const { data: product, errorProducts, isLoadingProducts, isFetchingProducts } = productModel.useGetProductQuery(id);
    const { data: comments, errorComments, isLoadingComments, isFetchingComments } = productModel.useGetProductCommentsQuery(id, {
        skip: !product
    });
    const { data: clients, errorClients, isLoadingClients, isFetchingClients } = productModel.useGetProductClientsQuery(id, {
        skip: !product
    });

    const [addClient] = productModel.useAddClientMutation();

    return (
        <div className="flex flex-row">
            <SideNav />
            <main className="w-full overflow-y-auto gap-5 h-screen p-3">
                {product && (
                    <section>
                        <div className="bg-violet-400">
                            <Link to="/community">
                                <button
                                    className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50"
                                >
                                    Вернуться
                                </button>
                            </Link>
                            <div className="container flex flex-col items-center px-4 py-10 pb-20 mx-auto text-center lg:pb-56 md:py-20 md:px-10 lg:px-32 text-gray-900">
                                <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-900">{product.name}</h1>
                                <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-900">{product.description}</p>
                                <div className="flex flex-wrap justify-center">
                                    {user && user.role === "client" &&
                                        (clients && clients.some(client => client.id === user.id) ? (
                                            <p className="px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-400 text-gray-50">
                                                Вы уже пользуетесь этим продуктом
                                            </p>
                                        ) : (
                                            <button
                                                type="button"
                                                className="px-8 py-3 m-2 text-lg font-semibold rounded bg-violet-400 text-gray-50"
                                                onClick={() => addClient({ id: product.id, client: user.id })}
                                            >
                                                Попробовать
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <img
                            className="w-5/6 mx-auto mb-12 -mt-20 rounded-lg shadow-md lg:-mt-40 bg-gray-300"
                            src={`https://source.unsplash.com/random/480x320/?${product.name}`}
                            alt=""
                        />
                    </section>
                )}

                {comments && (
                    <section className="flex flex-col gap-3">
                        {comments.map(comment => (
                            <div
                                className="flex flex-col w-full max-w-lg p-3 mx-auto divide-y rounded-md divide-gray-700 bg-gray-200 text-gray-900"
                                key={comment.id}
                            >
                                <div className="flex justify-between p-4">
                                    <div className="flex space-x-4">
                                        <h4 className="font-bold">{comment.client.login}</h4>
                                    </div>
                                    <div className="flex items-center space-x-2 text-yellow-500">
                                        <span className="text-sm text-gray-600">
                                            {dateToFormat(comment.created_at, 'DD.MM.YYYY HH:mm')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 space-y-2 text-sm text-gray-600">
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}

                        {user && user.role === "client" &&
                            <CommentForm productId={id} />
                        }
                    </section>
                )}
            </main>
        </div>
    )
} 