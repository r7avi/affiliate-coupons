import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaBell } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

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

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Categories", href: "#" },
    { name: "Deals", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const dummyAlerts = [
    { id: 1, text: "New coupon available for Electronics!", link: "#" },
    { id: 2, text: "Limited time offer on Fashion items!", link: "#" },
    { id: 3, text: "Don't miss out on our Food deals!", link: "#" },
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

        <div className={`flex items-center ${isMobile ? "justify-center w-full" : ""}`}>
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
            alt="Coupon Code Logo"
            className="h-10 w-auto ml-14"
          />
          <h1 className="ml-2 text-xl font-bold text-indigo-600">CouponHub</h1>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-4">
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
        )}

        <div className="flex items-center space-x-4" style={{ marginRight: '5%' }}>
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
            {dummyAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {dummyAlerts.length}
              </span>
            )}
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

      {isMobile && isMenuOpen && (
        <div className="md:hidden">
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

      {isSearchOpen && (
        <div className="bg-gray-100 py-4">
          <div className="container mx-auto px-4">
            <input
              type="text"
              placeholder="Search for coupons..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {showAlerts && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
          <div className="py-2">
            {dummyAlerts.map((alert) => (
              <a
                key={alert.id}
                href={alert.link}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {alert.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
