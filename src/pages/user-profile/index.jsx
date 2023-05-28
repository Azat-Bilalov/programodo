import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Header } from "@/widgets";
import { ProductCard } from "@/widgets";
import { SlideOver } from '@/shared/ui/slide-over';

export const UserProfilePage = () => {
    const user = useSelector(state => state.session.user);

    const [products, setProducts] = useState([]);
    const [commentsSlide, setCommentsSlide] = useState(false);
    const [commentsData, setCommentsData] = useState({});
    const [activeProduct, setActiveProduct] = useState();

    useEffect(() => {
        const fetchComments = async (id) => {
            let response = await fetch('/api/products/' + id + '/comments/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        };

        const fetchProducts = async (id) => {
            let response = await fetch('/api/clients/' + id  + '/products/');
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

            products.forEach((product, index) => {
                product.comments = comments[index];
                product.myProduct = true;
            });
            setProducts(products);
        };

        fetchProducts(user.id)
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // добавить комментарий
    const handleAddComment = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.client = user.id;
        data.product = activeProduct;

        data.text = data.text.trim();

        let response = await fetch('/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let comment = await response.json();
        setCommentsData({ ...commentsData, comment });
    };

    return (
        <>
            <SlideOver open={commentsSlide} setOpen={setCommentsSlide}>
                {commentsData}
                <form onSubmit={handleAddComment}>
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Твой комментарий</label>
                    <textarea id="text" name="text" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    <button type="submit" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Отправить
                    </button>
                </form>
            </SlideOver>
            <Header />
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
                        setActiveProduct={setActiveProduct}
                    />
                ))}
            </div>
        </>
    )
}