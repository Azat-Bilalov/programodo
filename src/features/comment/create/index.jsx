import { productModel } from "@/entities/product"
import { useSelector } from "react-redux";

export const CommentForm = ({ productId }) => {
    const [createProductComment, { isLoading, error }] = productModel.useCreateProductCommentMutation();
    const user = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        createProductComment({
            product: productId,
            client: user.id,
            text: data.get('text'),
        });

        e.target.reset();
    }

    return (
        <div className="flex flex-col justify-center w-full mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <label htmlFor="text">Текст</label>
                <textarea
                    className="px-4 py-2 rounded-sm text-gray-900 bg-gray-200"
                    name="text"
                    type="text"
                    placeholder='Текст комментария'
                    required
                />

                <button
                    className="px-4 py-2 rounded-sm text-gray-900 bg-gray-100 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    type="submit"
                    disabled={isLoading}
                >
                    Отправить
                </button>

                {error && <p className="text-red-500">{error.data.error}</p>}
            </form>
        </div>

    )
}