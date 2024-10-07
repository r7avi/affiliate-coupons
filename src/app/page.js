// src/app/page.js
"use client"; // Add this line to mark the component as a client component

import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ImageSlider from './components/Home/slider';
import CouponSlider from './components/CouponSlider/couponslider';
import PopularBrandCoupons from './components/PopularCoupons/popularCoupons';

const Home = () => {
    const [coupons, setCoupons] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Mobile & Tablets'); // Default to Fashion

    useEffect(() => {
        const fetchCoupons = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/coupons`);
            const data = await response.json();
            setCoupons(data);
        };

        fetchCoupons();
    }, []);

    return (
        <div>
            <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            
            <main>
                <ImageSlider />
                <PopularBrandCoupons  />
                <CouponSlider selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />


            </main>
            <Footer /> {/* Ensure Footer is included here */}
        </div>
    );
};

export default Home;
