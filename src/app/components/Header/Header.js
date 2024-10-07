import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaSearch, FaBell } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from 'next/link';
import axios from 'axios';
import CouponPopup from '../CouponPopup/CouponPopup'; // Ensure this import is correct

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoupons, setFilteredCoupons] = useState([]); // Store filtered coupons
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const searchRef = useRef(null); // Create a ref for the search bar

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleAlerts = () => setShowAlerts(!showAlerts);

  // Fetch coupons based on the search term
  const fetchCoupons = async (term) => {
    if (term.length === 0) {
      setFilteredCoupons([]); // Clear results if search term is empty
      return;
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/regularcoupons`);
      const coupons = response.data.filter(coupon =>
        coupon.brand.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 3); // Limit to 3 results
      setFilteredCoupons(coupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchCoupons(term); // Fetch coupons based on the search term
  };

  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon);
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Categories", href: "#" },
    { name: "Deals", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  
  const categories = ['Mobile & Tablets', 'Fashion', 'Food', 'Travel', 'E-commerce'];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}

        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
            alt="Coupon Code Logo"
            className="h-10 w-auto ml-2"
          />
          <h1 className="ml-2 text-xl font-bold text-indigo-600">CouponHub</h1>
        </div>

        <nav className={`hidden md:flex items-center space-x-4`}>
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <a
                href={link.href}
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                aria-label={link.name}
              >
                {link.name}
              </a>
              {link.name === "Categories" && (
                <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg">
                  {categories.map((category) => (
                    <Link key={category} href={`/categories/${encodeURIComponent(category)}`} passHref>
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {category}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Toggle search"
          >
            <FaSearch size={20} />
          </button>
          <button
            onClick={toggleAlerts}
            className="text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
            aria-label="Toggle alerts"
          >
            <FaBell size={20} />
          </button>
          <a
            href="#"
            className="text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Shopping cart"
          >
            <AiOutlineShoppingCart size={24} />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-500 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                aria-label={link.name}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      {isSearchOpen && (
        <div ref={searchRef} className="bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <input
              type="text"
              placeholder="Search for coupons by brand..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {filteredCoupons.length > 0 && (
              <div className="mt-2 flex space-x-4 overflow-x-auto">
                {filteredCoupons.map(coupon => (
                  <div key={coupon._id} className="flex flex-col items-center p-2 border rounded-md cursor-pointer" onClick={() => handleCouponClick(coupon)}>
                    <img src={coupon.logo} alt={coupon.brand} className="w-24 h-30 mb-2" />
                    <h3 className="font-semibold">{coupon.title}</h3>
                    <p>{coupon.brand}</p>
                    <p>Discount: {coupon.discount}%</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedCoupon && (
        <CouponPopup coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
      )}
    </header>
  );
};

export default Header;
