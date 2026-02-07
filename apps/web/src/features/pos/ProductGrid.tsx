import React, { useEffect, useState } from 'react';
import { db } from '../../lib/db';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';

export const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<string>('All');
    const addItem = useCartStore(state => state.addItem);

    useEffect(() => {
        const loadProducts = async () => {
            const localData = await db.getProducts();
            setProducts(localData);
        };
        loadProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const filteredProducts = category === 'All'
        ? products
        : products.filter(p => p.category === category);

    return (
        <div className="product-grid-container">
            {/* Header with Store Name & Category Tabs */}
            <div className="grid-header">
                <h1 className="store-title">India Retail Store</h1>

                {/* Category Pills */}
                <div className="category-pills">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`category-pill ${category === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="products-grid">
                {filteredProducts.length === 0 ? (
                    <div className="empty-products">
                        <div className="empty-icon">📦</div>
                        <p>No products available</p>
                        <span className="text-xs text-[var(--color-text-muted)]">Products will appear here once loaded</span>
                    </div>
                ) : (
                    filteredProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            onClick={() => addItem(product)}
                            className="product-card-modern"
                            style={{ animationDelay: `${idx * 30}ms` }}
                        >
                            {/* Product Image */}
                            <div className="product-image">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} />
                                ) : (
                                    <div className="no-image">
                                        <span className="text-4xl">🛍️</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-category">{product.category}</p>
                                <div className="product-price">₹{Number(product.price).toFixed(0)}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style>{`
                .product-grid-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: #f8f9fa;
                }

                .grid-header {
                    padding: 2rem 2rem 1.5rem 2rem;
                    background: white;
                    border-bottom: 1px solid #e9ecef;
                }

                .store-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #111;
                    margin-bottom: 1.25rem;
                    letter-spacing: -0.03em;
                }

                .category-pills {
                    display: flex;
                    gap: 0.75rem;
                    overflow-x: auto;
                    padding-bottom: 0.5rem;
                }

                .category-pills::-webkit-scrollbar {
                    height: 0;
                }

                .category-pill {
                    padding: 0.625rem 1.5rem;
                    border-radius: 999px;
                    font-size: 0.9375rem;
                    font-weight: 700;
                    white-space: nowrap;
                    cursor: pointer;
                    border: 2px solid #dee2e6;
                    background: white;
                    color: #212529;
                    transition: all 0.2s;
                }

                .category-pill:hover {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                    transform: translateY(-2px);
                }

                .category-pill.active {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
                    color: white;
                    border-color: transparent;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .products-grid {
                    flex: 1;
                    padding: 1.5rem;
                    overflow-y: auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1.25rem;
                    align-content: start;
                }

                .product-card-modern {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    border: 1px solid #e9ecef;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    animation: fadeInUp 0.4s ease-out forwards;
                    opacity: 0;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .product-card-modern:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
                    border-color: var(--color-primary);
                }

                .product-image {
                    height: 160px;
                    overflow: hidden;
                    background: #f8f9fa;
                    position: relative;
                }

                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }

                .product-card-modern:hover .product-image img {
                    transform: scale(1.1);
                }

                .no-image {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }

                .product-info {
                    padding: 1.25rem;
                }

                .product-name {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #111;
                    margin-bottom: 0.375rem;
                    line-height: 1.4;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .product-category {
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: #6c757d;
                    margin-bottom: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                }

                .product-price {
                    font-size: 1.375rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    letter-spacing: -0.02em;
                }

                .empty-products {
                    grid-column: 1 / -1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 2rem;
                    text-align: center;
                    color: #495057;
                }

                .empty-icon {
                    font-size: 5rem;
                    margin-bottom: 1.5rem;
                    opacity: 0.3;
                }

                .empty-products p {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .empty-products span {
                    font-size: 0.875rem;
                }
            `}</style>
        </div>
    );
};
