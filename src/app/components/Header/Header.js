import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaSearch, FaBell } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Link from 'next/link';
import axios from 'axios';
import CouponPopup from '../CouponPopup/CouponPopup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // State for category dropdown
  const searchRef = useRef(null);

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
  const toggleCategories = () => setIsCategoryOpen(!isCategoryOpen); // Toggle category dropdown

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

  // Updated navLinks array to include Categories
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Categories", href: "#" }, // Added Categories here
    { name: "Deals", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const categories = ['Mobile & Tablets', 'Fashion', 'Food', 'Travel', 'E-commerce'];

  return (
    <header
      className=" text-white shadow-md sticky top-0 z-50"
      style={{
        background:
          "linear-gradient(0deg, rgba(48,48,48,1) 0%, rgba(28,28,28,1) 37%)",
      }}
    >
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
          <svg
            style={{ position: "relative", left: "20" }}
            width="169"
            height="57"
            viewBox="0 0 169 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.004 41C12.036 41 10.26 40.676 8.676 40.028C7.092 39.356 5.736 38.444 4.608 37.292C3.48 36.14 2.604 34.808 1.98 33.296C1.38 31.76 1.08 30.128 1.08 28.4C1.08 26.672 1.38 25.052 1.98 23.54C2.604 22.004 3.48 20.66 4.608 19.508C5.736 18.356 7.092 17.456 8.676 16.808C10.26 16.136 12.036 15.8 14.004 15.8H17.928V20.336H14.112C12.96 20.336 11.904 20.54 10.944 20.948C9.984 21.356 9.144 21.932 8.424 22.676C7.728 23.396 7.188 24.248 6.804 25.232C6.42 26.192 6.228 27.248 6.228 28.4C6.228 29.552 6.42 30.62 6.804 31.604C7.188 32.588 7.728 33.44 8.424 34.16C9.144 34.88 9.984 35.444 10.944 35.852C11.904 36.26 12.96 36.464 14.112 36.464H17.928V41H14.004ZM32.1871 41.432C30.1471 41.432 28.3351 41.012 26.7511 40.172C25.1911 39.332 23.9551 38.144 23.0431 36.608C22.1551 35.048 21.7111 33.2 21.7111 31.064V15.8H26.8591V31.388C26.8591 32.396 27.0751 33.32 27.5071 34.16C27.9391 34.976 28.5511 35.636 29.3431 36.14C30.1591 36.644 31.1071 36.896 32.1871 36.896C33.2911 36.896 34.2391 36.644 35.0311 36.14C35.8231 35.636 36.4351 34.976 36.8671 34.16C37.2991 33.32 37.5151 32.396 37.5151 31.388V15.8H42.6631V31.064C42.6631 33.2 42.2071 35.048 41.2951 36.608C40.4071 38.144 39.1711 39.332 37.5871 40.172C36.0271 41.012 34.2271 41.432 32.1871 41.432ZM47.52 41V15.8H58.068C59.724 15.8 61.224 16.184 62.568 16.952C63.936 17.696 65.016 18.74 65.808 20.084C66.624 21.428 67.032 22.988 67.032 24.764C67.032 26.516 66.624 28.076 65.808 29.444C65.016 30.788 63.936 31.844 62.568 32.612C61.224 33.356 59.724 33.728 58.068 33.728H52.668V41H47.52ZM52.668 29.192H57.456C58.272 29.192 59.016 29.024 59.688 28.688C60.36 28.328 60.888 27.824 61.272 27.176C61.68 26.504 61.884 25.7 61.884 24.764C61.884 23.828 61.68 23.036 61.272 22.388C60.888 21.716 60.36 21.212 59.688 20.876C59.016 20.516 58.272 20.336 57.456 20.336H52.668V29.192ZM70.4419 41V15.8H80.9899C82.6459 15.8 84.1459 16.184 85.4899 16.952C86.8579 17.696 87.9379 18.74 88.7299 20.084C89.5459 21.428 89.9539 22.988 89.9539 24.764C89.9539 26.516 89.5459 28.076 88.7299 29.444C87.9379 30.788 86.8579 31.844 85.4899 32.612C84.1459 33.356 82.6459 33.728 80.9899 33.728H75.5899V41H70.4419ZM75.5899 29.192H80.3779C81.1939 29.192 81.9379 29.024 82.6099 28.688C83.2819 28.328 83.8099 27.824 84.1939 27.176C84.6019 26.504 84.8059 25.7 84.8059 24.764C84.8059 23.828 84.6019 23.036 84.1939 22.388C83.8099 21.716 83.2819 21.212 82.6099 20.876C81.9379 20.516 81.1939 20.336 80.3779 20.336H75.5899V29.192ZM105.136 41.468C103.12 41.468 101.296 41.132 99.6638 40.46C98.0558 39.764 96.6758 38.816 95.5238 37.616C94.3718 36.416 93.4838 35.024 92.8598 33.44C92.2358 31.856 91.9238 30.164 91.9238 28.364C91.9238 26.564 92.2358 24.884 92.8598 23.324C93.4838 21.74 94.3718 20.348 95.5238 19.148C96.6758 17.948 98.0558 17.012 99.6638 16.34C101.296 15.668 103.12 15.332 105.136 15.332C107.152 15.332 108.964 15.668 110.572 16.34C112.204 17.012 113.596 17.948 114.748 19.148C115.9 20.348 116.788 21.74 117.412 23.324C118.036 24.884 118.348 26.564 118.348 28.364C118.348 30.164 118.036 31.856 117.412 33.44C116.788 35.024 115.9 36.416 114.748 37.616C113.596 38.816 112.204 39.764 110.572 40.46C108.964 41.132 107.152 41.468 105.136 41.468ZM105.136 36.896C106.288 36.896 107.356 36.692 108.34 36.284C109.324 35.852 110.176 35.252 110.896 34.484C111.64 33.692 112.204 32.78 112.588 31.748C112.996 30.716 113.2 29.588 113.2 28.364C113.2 27.14 112.996 26.012 112.588 24.98C112.204 23.948 111.64 23.048 110.896 22.28C110.176 21.512 109.324 20.924 108.34 20.516C107.356 20.084 106.288 19.868 105.136 19.868C103.984 19.868 102.916 20.084 101.932 20.516C100.948 20.924 100.084 21.512 99.3398 22.28C98.6198 23.048 98.0558 23.948 97.6478 24.98C97.2638 26.012 97.0718 27.14 97.0718 28.364C97.0718 29.588 97.2638 30.716 97.6478 31.748C98.0558 32.78 98.6198 33.692 99.3398 34.484C100.084 35.252 100.948 35.852 101.932 36.284C102.916 36.692 103.984 36.896 105.136 36.896ZM138.938 41.432C137.45 41.432 136.142 41.096 135.014 40.424C133.886 39.728 133.01 38.816 132.386 37.688C131.762 36.536 131.45 35.276 131.45 33.908V22.28C131.45 21.848 131.342 21.452 131.126 21.092C130.91 20.732 130.622 20.444 130.262 20.228C129.902 20.012 129.506 19.904 129.074 19.904C128.642 19.904 128.246 20.012 127.886 20.228C127.55 20.444 127.274 20.732 127.058 21.092C126.842 21.452 126.734 21.848 126.734 22.28V41H121.586V22.892C121.586 21.5 121.898 20.24 122.522 19.112C123.146 17.984 124.022 17.084 125.15 16.412C126.278 15.716 127.586 15.368 129.074 15.368C130.586 15.368 131.906 15.716 133.034 16.412C134.162 17.084 135.038 17.984 135.662 19.112C136.286 20.24 136.598 21.5 136.598 22.892V34.52C136.598 34.952 136.706 35.348 136.922 35.708C137.138 36.068 137.414 36.356 137.75 36.572C138.11 36.788 138.506 36.896 138.938 36.896C139.37 36.896 139.766 36.788 140.126 36.572C140.486 36.356 140.774 36.068 140.99 35.708C141.206 35.348 141.314 34.952 141.314 34.52V15.8H146.462V33.908C146.462 35.276 146.15 36.536 145.526 37.688C144.902 38.816 144.026 39.728 142.898 40.424C141.77 41.096 140.45 41.432 138.938 41.432Z"
              fill="url(#paint0_linear_1_7)"
            />
            <g clip-path="url(#clip0_1_7)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M164.816 18.5812C165.852 17.9818 166.244 16.7192 165.689 15.7601L158.316 3.01296C157.761 2.0538 156.471 1.76409 155.435 2.36343L152.89 3.83574C152.752 3.91515 152.642 4.03429 152.578 4.17474C152.513 4.3152 152.497 4.46915 152.532 4.61281C152.64 5.05393 152.59 5.52653 152.392 5.95773C152.194 6.38894 151.858 6.75481 151.436 6.99895C151.014 7.24309 150.529 7.35193 150.056 7.3087C149.584 7.26548 149.15 7.07258 148.821 6.75974C148.714 6.65776 148.572 6.59487 148.418 6.5808C148.264 6.56673 148.106 6.60226 147.969 6.68191L145.424 8.15421C144.388 8.75356 143.996 10.0161 144.55 10.9753L151.924 23.7224C152.478 24.6816 153.768 24.9713 154.804 24.3719L157.345 22.9025C157.483 22.8225 157.593 22.7024 157.657 22.561C157.721 22.4196 157.736 22.2648 157.699 22.1208C157.587 21.6776 157.633 21.201 157.83 20.7656C158.028 20.3301 158.365 19.9605 158.791 19.7144C159.216 19.4684 159.705 19.3598 160.181 19.4057C160.657 19.4516 161.093 19.6494 161.421 19.9681C161.528 20.0715 161.669 20.1356 161.824 20.1506C161.978 20.1655 162.137 20.1303 162.275 20.0506L164.816 18.5812ZM160.167 13.599L150.56 11.4262C150.337 11.3825 150.099 11.4253 149.897 11.5457C149.696 11.666 149.545 11.8543 149.478 12.0707C149.411 12.287 149.433 12.5144 149.539 12.7045C149.645 12.8946 149.826 13.0325 150.045 13.0889L159.652 15.2617C159.765 15.2907 159.884 15.2973 160.002 15.281C160.121 15.2647 160.236 15.2259 160.341 15.1668C160.447 15.1078 160.54 15.0297 160.616 14.9373C160.692 14.8448 160.749 14.7398 160.784 14.6285C160.818 14.5172 160.829 14.4019 160.817 14.2894C160.804 14.1769 160.768 14.0694 160.711 13.9734C160.653 13.8774 160.575 13.7948 160.482 13.7305C160.389 13.6661 160.281 13.6214 160.167 13.599ZM154.613 18.2663C154.281 18.4583 153.892 18.5203 153.532 18.4388C153.172 18.3573 152.869 18.1389 152.692 17.8317C152.514 17.5245 152.475 17.1536 152.584 16.8006C152.693 16.4476 152.941 16.1414 153.273 15.9495C153.605 15.7575 153.994 15.6954 154.354 15.7769C154.714 15.8584 155.017 16.0768 155.194 16.384C155.372 16.6912 155.411 17.0622 155.302 17.4151C155.193 17.7681 154.945 18.0743 154.613 18.2663ZM156.938 10.7373C156.606 10.9292 156.218 10.9913 155.857 10.9098C155.497 10.8283 155.195 10.6099 155.017 10.3027C154.839 9.99546 154.801 9.62455 154.91 9.27156C155.019 8.91857 155.266 8.61241 155.598 8.42044C155.93 8.22846 156.319 8.16639 156.679 8.24789C157.04 8.32938 157.342 8.54777 157.52 8.855C157.697 9.16223 157.736 9.53313 157.627 9.88612C157.518 10.2391 157.27 10.5453 156.938 10.7373Z"
                fill="url(#paint1_linear_1_7)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1_7"
                x1="74.5"
                y1="0"
                x2="74.5"
                y2="57"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="#C4DEED" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1_7"
                x1="148.237"
                y1="17.3488"
                x2="162.002"
                y2="9.38652"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="#C4DEED" />
              </linearGradient>
              <clipPath id="clip0_1_7">
                <rect
                  width="18.7354"
                  height="20.2394"
                  fill="white"
                  transform="translate(151.05 26.5435) rotate(-120.046)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>

        <nav className={`hidden md:flex items-center space-x-6`}>
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              <a
                href={link.href}
                className="text-white-500 hover:text-neutral-400\ px-3 py-2 rounded-md text-m font-medium transition-colors duration-200"
                onClick={link.name === "Categories" ? toggleCategories : null} // Toggle dropdown on click
                aria-label={link.name}
              >
                {link.name}
              </a>
              {link.name === "Categories" &&
                isCategoryOpen && ( // Conditional rendering for dropdown
                  <div
                    className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg"
                    style={{ width: "180px" }}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/categories/${encodeURIComponent(category)}`}
                        passHref
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-800 cursor-pointer">
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
            className="text-gray-500 hover:text-white focus:outline-none"
            aria-label="Toggle search"
          >
            <FaSearch size={20} />
          </button>
          <button
            onClick={toggleAlerts}
            className="text-gray-500 hover:text-white"
            aria-label="Toggle alerts"
          >
            <FaBell size={20} />
          </button>
          <a
            href="#"
            className="text-gray-500 hover:text-white"
            aria-label="Shopping cart"
          >
            <AiOutlineShoppingCart size={24} />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 m:px-3">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                <a
                  href={link.href}
                  className="text-white-500 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={link.name === "Categories" ? toggleCategories : null} // Toggle dropdown on click
                  aria-label={link.name}
                >
                  {link.name}
                </a>
                {link.name === "Categories" &&
                  isCategoryOpen && ( // Conditional rendering for mobile dropdown
                    <div className="bg-white border border-gray-200 rounded-md shadow-lg">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/categories/${encodeURIComponent(category)}`}
                          passHref
                        >
                          <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            {category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
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
                {filteredCoupons.map((coupon) => (
                  <div
                    key={coupon._id}
                    className="flex flex-col items-center p-2 border rounded-md cursor-pointer"
                    onClick={() => handleCouponClick(coupon)}
                  >
                    <img
                      src={coupon.logo}
                      alt={coupon.brand}
                      className="w-24 h-30 mb-2"
                    />
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
        <CouponPopup
          coupon={selectedCoupon}
          onClose={() => setSelectedCoupon(null)}
        />
      )}
    </header>
  );
};

export default Header;
