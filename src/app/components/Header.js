import React, { useState } from 'react';
import Link from 'next/link';
import './header.css'; // Import the CSS file

const Header = ({ categories, selectedCategory, setSelectedCategory }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>My Coupon Site</h1>
            </div>
            <nav className="navbar">
                <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropdown-toggle">
                        Categories {/* Show "Categories" as the button text */}
                    </button>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            {categories.map(category => (
                                <li key={category} onClick={() => handleCategorySelect(category)}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <ul className="nav-list">
                    <li><Link href="/top-stores">Top Stores</Link></li>
                    <li><Link href="/best-offers">Best Offers</Link></li>
                    <li><Link href="/collections">Collections</Link></li>
                    <li><Link href="/AddCoupon">Add Coupon</Link></li> {/* Ensure this link is present */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;