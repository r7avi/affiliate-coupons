// src/app/page.js
"use client"; // Add this line to mark the component as a client component

import React, { useEffect, useState } from 'react';

const Home = () => {
    const [coupons, setCoupons] = useState([]);
    const [categories, setCategories] = useState(['Electronics', 'Fashion', 'Home & Garden']);
    const [selectedCategory, setSelectedCategory] = useState('Electronics');
    const [revealedCoupons, setRevealedCoupons] = useState({}); // State to track revealed coupons

    useEffect(() => {
        const fetchCoupons = async () => {
            const response = await fetch('http://localhost:5000/api/coupons');
            const data = await response.json();
            setCoupons(data);
        };

        fetchCoupons();
    }, []);

    const filteredCoupons = coupons.filter(coupon => coupon.category === selectedCategory);

    const toggleCouponVisibility = (id) => {
        setRevealedCoupons(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle the visibility for the clicked coupon
        }));
    };

    return (
        <div>
            <header>
                <h1>Welcome to Our Coupon Site</h1>
                <nav>
                    <ul className="category-list">
                        {categories.map(category => (
                            <li key={category} className={`category-item ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>
                                {category}
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <main>
                <section className="banner">
                    <h2>Special Offers</h2>
                    <p>Check out our latest deals!</p>
                </section>

                <section className="coupons-area">
                    <h2>Coupons for {selectedCategory}</h2>
                    <ul className="coupons-list">
                        {filteredCoupons.map(coupon => (
                            <li key={coupon._id} className="coupon-item" onClick={() => toggleCouponVisibility(coupon._id)}>
                                <div className="coupon-header">
                                    <span className="coupon-brand">{coupon.brand}</span>
                                    <span className="toggle-details">{revealedCoupons[coupon._id] ? '▲' : '▼'}</span>
                                </div>
                                {revealedCoupons[coupon._id] ? (
                                    <div className="coupon-details">
                                        Code: <strong>{coupon.code}</strong> (Expires on: {new Date(coupon.expirationDate).toLocaleDateString()})
                                    </div>
                                ) : (
                                    <div className="coupon-reveal">
                                        <span className="click-to-reveal">Click to Reveal Coupon Code</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer>
                <p>&copy; 2023 My Coupon Site. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;