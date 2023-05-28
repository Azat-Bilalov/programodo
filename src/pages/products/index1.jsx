import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Header, ProductCard, SideNav } from '@/widgets';
import { SlideOver } from '@/shared/ui/slide-over';

// import { taskApi } from '@/entities/task';

export const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [commentsSlide, setCommentsSlide] = useState(false);
    const [commentsData, setCommentsData] = useState({});

    const user = useSelector(state => state.session.user);

    // const { data, error, loading } = taskApi.useGetTasksQuery();

    useEffect(() => {
        const fetchComments = async (id) => {
            let response = await fetch('/api/comments/' + id);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        };

        const fetchProducts = async () => {
            let response = await fetch('/api/products/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let products = await response.json();

            let comments = await Promise.all(products.map(product => (
                fetchComments(product.id)
                    .catch(error => {
                        console.error('Error fetching comments:', error);
                    })
            )));

            response = await fetch('/api/clients/' + user.id + '/products');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let myProducts = await response.json();

            products.forEach((product, index) => {
                if (!user.role) {
                    product.myProduct = myProducts.map(myProduct => myProduct.id).includes(product.id);
                } else {
                    product.myProduct = [];
                }
                product.comments = comments[index];
            });
            setProducts(products);
        };

        fetchProducts()
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="flex direction-row">
            <SideNav />
            <main className="overflow-y-auto h-screen" onClick={() => alert('test')}>
                <SlideOver open={commentsSlide} setOpen={setCommentsSlide}>
                    {JSON.stringify(commentsData)}

                    {commentsData}
                </SlideOver>
                {/* <Header /> */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 m-3">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            version={product.version}
                            gitRepo={product.gitrepository}
                            license={product.license}
                            date={product.created_at}
                            comments={product.comments}
                            myProduct={product.myProduct}
                            setCommentsSlide={setCommentsSlide}
                            setCommentsData={setCommentsData}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};