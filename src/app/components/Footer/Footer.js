import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (isEmailValid) {
      // Handle subscription logic here
      console.log("Subscribed with email:", email);
      setEmail("");
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const couponCategories = [
    { name: "Fashion", subcategories: ["Clothing", "Shoes", "Accessories"] },
    { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Gadgets"] },
    { name: "Home & Living", subcategories: ["Furniture", "Decor", "Appliances"] },
    { name: "Travel", subcategories: ["Hotels", "Flights", "Vacation Packages"] },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1086&q=80"
              alt="Coupon Affiliate Logo"
              className="h-12 w-auto"
            />
            <p className="text-sm">Discover the best deals and save big with our curated coupon collection from top brands.</p>
          </div>

          {/* Coupon Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Coupon Categories</h3>
            {couponCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex items-center justify-between w-full text-left hover:text-blue-400 transition-colors duration-300"
                >
                  {category.name}
                  {expandedCategory === category.name ? (
                    <IoIosArrowUp className="text-blue-400" />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                {expandedCategory === category.name && (
                  <ul className="pl-4 space-y-1 text-sm">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory} className="hover:text-blue-400 transition-colors duration-300">
                        <a href="#">{subcategory}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={`w-full px-3 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 ${
                  isEmailValid ? "focus:ring-blue-400" : "focus:ring-red-400"
                }`}
                required
              />
              {!isEmailValid && (
                <p className="text-red-400 text-xs">Please enter a valid email address.</p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Integration */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-blue-400 transition-colors duration-300">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-sm">Share the savings with your friends!</p>
          </div>
        </div>

        {/* Affiliate Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Affiliate Disclaimer: Some links on this website are affiliate links. We may earn a commission if you make a purchase through these links, at no additional cost to you.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">&copy; 2023 Coupon Affiliate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;