// src/app/page.js
"use client"; // Add this line to mark the component as a client component

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './components/Categories';

const Home = () => {
    const [coupons, setCoupons] = useState([]);
    const [categories] = useState(['Mobile & Tablets', 'Fashion', 'Food',
        'Travel',]);
    const [selectedCategory, setSelectedCategory] = useState('Fashion'); // Default to Fashion

    useEffect(() => {
        const fetchCoupons = async () => {
            const response = await fetch('http://localhost:5000/api/coupons');
            const data = await response.json();
            setCoupons(data);
        };

        fetchCoupons();
    }, []);

    return (
        <div>
            <Header categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <main>
                <section className="banner">
                    <h2>Special Offers</h2>
                    <p>Check out our latest deals!</p>
                </section>

                {/* Render the Categories component based on the selected category */}
                <Categories selectedCategory={selectedCategory} coupons={coupons} />
            </main>
            <Footer /> {/* Ensure Footer is included here */}
        </div>
    );
};

export default Home;