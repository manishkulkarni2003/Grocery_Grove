import React from 'react';
import Layout from '../components/Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import "../styles/CategoriesStyles.css"

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title={"All Categories"}>
            <div className="categories-container">
                <div className="container">
                    <h2 className="categories-header">Browse Our Categories</h2>
                    <div className="category-grid">
                        {categories?.map((c, index) => (
                            <div 
                                className="category-card" 
                                key={c._id}
                                style={{ 
                                    animationDelay: `${index * 0.1}s` 
                                }}
                            >
                                <Link 
                                    to={`/category/${c.slug}`} 
                                    className="category-link"
                                >
                                    {c.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Categories;