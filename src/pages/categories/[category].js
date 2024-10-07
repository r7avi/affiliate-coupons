import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaClipboard, FaSpinner, FaSearch, FaFilter, FaCalendarAlt, FaPercent, FaHome, FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from 'next/router';
import '../../app/globals.css'; // Adjust path if needed

const AffiliateCoupons = () => {
  const router = useRouter();
  const { category } = router.query;

  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [displayedCoupons, setDisplayedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (category) {
      fetchCoupons(category);
    }
  }, [category]);

  const fetchCoupons = async (category) => {
    try {
      const response = await axios.get(
        "https://affiliate-coupons.onrender.com/api/regularcoupons"
      );

      // Filter by category if provided
      const updatedCoupons = response.data.map(coupon => ({
        ...coupon,
        discount: Math.floor(Math.random() * 5 + 1) * 10 // Random discount between 10% and 50%
      })).filter(coupon => category === "All" || coupon.category === category);

      setCoupons(updatedCoupons);
      setFilteredCoupons(updatedCoupons);
      setDisplayedCoupons(updatedCoupons.slice(0, 5));
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch coupons. Please try again later.");
      setLoading(false);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard!");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterCoupons(e.target.value, selectedDiscount, selectedBrand);
  };

  const handleDiscountFilter = (discount) => {
    setSelectedDiscount(discount);
    filterCoupons(searchTerm, discount, selectedBrand);
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
    filterCoupons(searchTerm, selectedDiscount, brand);
  };

  const filterCoupons = useCallback((search, discount, brand) => {
    let filtered = coupons;
    if (search) {
      filtered = filtered.filter(
        (coupon) =>
          coupon.brand.toLowerCase().includes(search.toLowerCase()) ||
          coupon.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (discount !== "All") {
      filtered = filtered.filter((coupon) => coupon.discount === parseInt(discount));
    }
    if (brand !== "All") {
      filtered = filtered.filter((coupon) => coupon.brand === brand);
    }
    setFilteredCoupons(filtered);
    setDisplayedCoupons(filtered.slice(0, 5));
    setHasMore(filtered.length > 5);
  }, [coupons]);

  const loadMoreCoupons = () => {
    const currentLength = displayedCoupons.length;
    const nextCoupons = filteredCoupons.slice(currentLength, currentLength + 5);
    setDisplayedCoupons([...displayedCoupons, ...nextCoupons]);
    setHasMore(currentLength + 5 < filteredCoupons.length);
  };

  const revealCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCoupon(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  const discounts = ["All", ...new Set(coupons.map((coupon) => coupon.discount))];
  const brands = ["All", ...new Set(coupons.map((coupon) => coupon.brand))];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Filter Coupons</h2>
        <div className="mb-4">
          <FaPercent className="inline-block mr-2" />
          <span className="font-semibold">Discounts</span>
        </div>
        <ul>
          {discounts.map((discount) => (
            <li
              key={discount}
              className={`cursor-pointer py-2 ${
                selectedDiscount === discount ? "text-blue-500 font-semibold" : ""
              }`}
              onClick={() => handleDiscountFilter(discount)}
            >
              {discount === "All" ? "All" : `${discount}%`}
            </li>
          ))}
        </ul>
        <div className="mt-6 mb-4">
          <FaFilter className="inline-block mr-2" />
          <span className="font-semibold">Brands</span>
        </div>
        <ul>
          {brands.map((brand) => (
            <li
              key={brand}
              className={`cursor-pointer py-2 ${
                selectedBrand === brand ? "text-blue-500 font-semibold" : ""
              }`}
              onClick={() => handleBrandFilter(brand)}
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-4">
          <a href="/" className="hover:text-gray-900">
            <FaHome className="mr-2 inline-block" />
            Home
          </a>
          <FaChevronRight className="mx-2" />

          <span className="text-gray-900">{category}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8 text-center">{category} Coupons</h1>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search coupons..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Coupons List */}
        <InfiniteScroll
          dataLength={displayedCoupons.length}
          next={loadMoreCoupons}
          hasMore={hasMore}
          loader={<h4 className="text-center my-4">Loading...</h4>}
        >
          <div className="space-y-4">
            {displayedCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <img
                    src={coupon.logo}
                    alt={`${coupon.brand} logo`}
                    className="w-16 h-16 object-contain mr-6"
                  />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{coupon.brand}</h2>
                    <p className="text-gray-600">{coupon.title}</p>
                    <span className="text-sm text-gray-500 mt-2 flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      Expires: {new Date(coupon.expirationDate).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-blue-600 block mt-1">
                      Category: {coupon.category}
                    </span>
                    <span className="text-sm text-green-600 block mt-1">
                      Discount: {coupon.discount}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => revealCoupon(coupon)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Reveal Coupon
                </button>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {/* Popup */}
      {showPopup && selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">{selectedCoupon.brand}</h2>
            <p className="mb-4">{selectedCoupon.title}</p>
            <div className="flex items-center justify-between mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded text-lg">
                {selectedCoupon.code}
              </code>
              <button
                onClick={() => copyToClipboard(selectedCoupon.code)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
              >
                <FaClipboard className="mr-2" />
                Copy
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Expires: {new Date(selectedCoupon.expirationDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-green-600 mb-4">
              Discount: {selectedCoupon.discount}%
            </p>
            <button
              onClick={closePopup}
              className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AffiliateCoupons;
