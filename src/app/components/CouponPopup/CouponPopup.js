import React, { useEffect, useRef } from "react";
import { FaTimes, FaCopy, FaEye } from "react-icons/fa";

const CouponPopup = ({ coupon, onClose }) => {
  const popupRef = useRef(null);
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.focus();
    }
  }, []);

  const handleCopyCode = () => {
    if (coupon) {
      navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        tabIndex={-1}
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coupon-popup-title"
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="coupon-popup-title"
            className="text-2xl font-bold text-gray-800"
          >
            Special Offer!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1 transition-colors duration-200"
            aria-label="Close popup"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        {coupon ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              Get {coupon.discount}% off your purchase with this exclusive coupon!
            </p>
            <div className="bg-gray-100 p-3 rounded-md flex items-center justify-between">
              {revealed ? (
                <span className="font-mono text-lg font-semibold text-gray-800">
                  {coupon.code}
                </span>
              ) : (
                <button
                  onClick={handleReveal}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors duration-200 flex items-center space-x-1"
                  aria-label="Reveal coupon code"
                >
                  <FaEye />
                  <span>Click to Reveal</span>
                </button>
              )}
              {revealed && (
                <button
                  onClick={handleCopyCode}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 flex items-center space-x-1"
                  aria-label="Copy coupon code"
                >
                  <FaCopy />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Expires on: {new Date(coupon.expirationDate).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Loading coupon data...</p>
        )}
      </div>
    </div>
  );
};

export default CouponPopup;
