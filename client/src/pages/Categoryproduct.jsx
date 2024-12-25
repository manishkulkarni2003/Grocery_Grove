import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import "../styles/CategoryProduct.css"

const CategoryProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) getProductByCategory();
    }, [params?.slug]);

    const getProductByCategory = async () => {
        try {
            const { data } = await axios.get(
                `https://grocery-grove.onrender.com/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategories(data?.category);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <div className="category-products-container">
                <div className="container">
                    <div className="category-header">
                        <h2 className="category-title">
                            Category - {categories?.name}
                        </h2>
                        <p className="results-count">
                            {products?.length} results found
                        </p>
                    </div>

                    <div className="products-grid">
                        {products?.map((p, index) => (
                            <div 
                                className="product-card" 
                                key={p._id}
                                style={{ 
                                    animationDelay: `${index * 0.1}s` 
                                }}
                            >
                                <img 
                                    className="product-image" 
                                    src={p.image} 
                                    alt={p.name} 
                                />
                                <div className="product-content">
                                    <h5 className="product-name">{p.name}</h5>
                                    <p className="product-description">
                                        {p.description.substring(0, 45)}...
                                    </p>
                                    <p className="product-price">₹{p.price}</p>
                                    <div className="product-buttons">
                                        <button
                                            className="details-button"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button
                                            className="cart-button"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    'cart',
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success('Item Added To Cart');
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;