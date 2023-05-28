import { ProductCard } from "@/entities/product";
import { SideNav } from "@/widgets";
import { productModel } from "@/entities/product";
import { Link } from "react-router-dom";

export const CommunityPage = () => {
    const { data: products, errorProducts, isLoadingProducts, isFetchingProducts } = productModel.useGetProductsQuery();

    return (
        <div className="flex flex-row">
            <SideNav />
            <main className="w-full overflow-y-auto gap-5 h-screen p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products && products.map(product =>
                        <Link
                            to={`/products/${product.id}`}
                            key={product.id}
                        >
                            <ProductCard product={product} />
                        </Link>
                    )}
                </div>
            </main>
        </div>
    )
} 