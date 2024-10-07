import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import { MdError } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularBrandCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/popularcoupons` // Updated to use environment variable
      );
      setCoupons(response.data.slice(0, 10)); // Only load 10 popular coupons
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch coupons. Please try again.");
      setLoading(false);
    }
  };

  const handleCouponClick = (coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleClosePopup = () => {
    setSelectedCoupon(null);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Coupon code copied to clipboard!");
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? coupons.length - 4 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === coupons.length - 4 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <MdError className="text-red-500 text-5xl mb-3" />
        <p className="text-lg text-gray-800 mb-3">{error}</p>
        <button
          onClick={fetchCoupons}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Popular Brand Coupons</h2>
      <div className="relative">
        <div className="flex overflow-hidden">
          {coupons.slice(currentIndex, currentIndex + 4).map((coupon) => (
            <motion.div
              key={coupon._id}
              className="w-1/4 px-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
                <div className="p-4">
                  <img
                    src={coupon.logo}
                    alt={`${coupon.brand} logo`}
                    className="w-16 h-16 mx-auto mb-3 object-contain"
                  />
                  <h3 className="text-lg font-semibold text-center mb-2">{coupon.brand}</h3>
                  <p className="text-sm text-gray-600 text-center mb-3">{coupon.title}</p>
                  <button
                    onClick={() => handleCouponClick(coupon)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                    aria-label={`Reveal coupon code for ${coupon.brand}`}
                  >
                    Reveal Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none"
          aria-label="Previous coupons"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none"
          aria-label="Next coupons"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>

      <AnimatePresence>
        {selectedCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-3">{selectedCoupon.brand}</h3>
              <p className="text-sm text-gray-600 mb-3">{selectedCoupon.title}</p>
              <div className="flex items-center justify-between bg-gray-100 rounded p-2 mb-3">
                <span className="font-mono text-base">{selectedCoupon.code}</span>
                <button
                  onClick={() => handleCopyCode(selectedCoupon.code)}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none"
                  aria-label="Copy coupon code"
                >
                  <FiCopy size={20} />
                </button>
              </div>
              <button
                onClick={handleClosePopup}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopularBrandCoupons;
