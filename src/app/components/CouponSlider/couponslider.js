import React, { useState, useEffect } from "react";
import { FaCopy, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const CouponSlider = ({ selectedCategory, setSelectedCategory }) => {
  const [revealedCoupons, setRevealedCoupons] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Limit to 3 items per category for better visibility

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/regularcoupons`);
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const toggleCouponVisibility = (couponId) => {
    setRevealedCoupons((prev) => ({
      ...prev,
      [couponId]: !prev[couponId],
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Coupon code copied to clipboard!");
    });
  };

  // Calculate the coupons to display based on the current page
  const filteredCoupons = coupons.filter((coupon) => coupon.category === selectedCategory);
  const displayedCoupons = filteredCoupons.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Handler for next and previous button clicks
  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < filteredCoupons.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Sidebar for Categories */}
        <div className="md:col-span-1 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-indigo-600">Categories</h3>
          <ul className="space-y-2">
            {["Mobile & Tablets", "Fashion", "Food", "Travel"].map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-md transition duration-300 ${
                    selectedCategory === category
                      ? "bg-indigo-500 text-white"
                      : "hover:bg-indigo-100"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Coupons Area */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">
            Coupons for {selectedCategory}
          </h2>
          <div className="relative">
            {/* Previous Button */}
            {currentPage > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600 transition duration-300"
              >
                <FaArrowLeft />
              </button>
            )}

            {/* Coupons Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedCoupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <img
                    src={coupon.logo}
                    alt={coupon.brand}
                    className="w-24 h-24 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {coupon.brand}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    {coupon.title}
                  </p>
                  {!revealedCoupons[coupon._id] ? (
                    <button
                      onClick={() => toggleCouponVisibility(coupon._id)}
                      className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 flex items-center"
                    >
                      <FaEye className="mr-2" /> Reveal Code
                    </button>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-bold text-indigo-600 mb-2">
                        {coupon.code}
                      </p>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center mx-auto"
                      >
                        <FaCopy className="mr-2" /> Copy Code
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Next Button */}
            {currentPage < Math.ceil(filteredCoupons.length / itemsPerPage) - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600 transition duration-300"
              >
                <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponSlider;
