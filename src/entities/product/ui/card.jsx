// https://source.unsplash.com/random/400x400/?informatic

export const ProductCard = ({ product }) => {

    return (
        <div className="flex flex-col w-full h-full rounded-lg shadow-lg overflow-hidden bg-white hover:bg-sky-100 transition duration-300 ease-in-out">
            <p>
                <img
                    className="w-full h-48 object-cover"
                    src={`https://source.unsplash.com/random/400x400/?${product.name}`}
                    alt={product.name}
                />
            </p>
            <div className="flex flex-col gap-2 p-4">
                <h2 className="text-xl text-gray-800 font-semibold text-center">{product.name}</h2>
                <p className="text-gray-900">{product.description}</p>
                <p className="text-gray-500 font-semibold">{product.version}</p>
            </div>
        </div>
    )
}