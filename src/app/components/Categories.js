import React, { useState } from 'react';
import './Categories.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons for reveal/hide

const Categories = ({ selectedCategory, coupons }) => {
    const filteredCoupons = coupons.filter(coupon => coupon.category === selectedCategory);
    const [revealedCoupons, setRevealedCoupons] = useState({}); // State to track revealed coupons

    const toggleCouponVisibility = (id) => {
        setRevealedCoupons(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle the visibility for the clicked coupon
        }));
    };

    return (
        <section className="coupons-area">
            <h2>Coupons for {selectedCategory}</h2>
            <ul className="coupons-list">
                {filteredCoupons.length > 0 ? (
                    filteredCoupons.map(coupon => (
                        <li key={coupon._id} className="coupon-item" onClick={() => toggleCouponVisibility(coupon._id)}>
                            <div className="coupon-header">
                                <span className="coupon-brand">{coupon.brand}</span>
                                <span className="toggle-details">
                                    {revealedCoupons[coupon._id] ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                                </span>
                            </div>
                            {!revealedCoupons[coupon._id] ? (
                                <div className="coupon-reveal">
                                    <span className="click-to-reveal">Click to Reveal Code</span>
                                </div>
                            ) : (
                                <div className="coupon-details">
                                    Code: <strong>{coupon.code}</strong> (Expires on: {new Date(coupon.expirationDate).toLocaleDateString()})
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No coupons available for this category.</p>
                )}
            </ul>
        </section>
    );
};

export default Categories;