import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Exclusive Discounts",
      description: "Get up to 50% off on selected items",
      cta: "Shop Now"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Summer Sale",
      description: "Refresh your wardrobe with our summer collection",
      cta: "Explore"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "New Arrivals",
      description: "Check out our latest products",
      cta: "View Collection"
    }
  ];

  const smallBanners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Flash Sale",
      description: "24-hour deals"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Clearance",
      description: "Up to 70% off"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prevSlide) =>
          prevSlide === banners.length - 1 ? 0 : prevSlide + 1
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, banners.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? banners.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === banners.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handlePrevSlide();
    } else if (e.key === "ArrowRight") {
      handleNextSlide();
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.focus();
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div
          className="w-full lg:w-3/4 relative overflow-hidden rounded-lg shadow-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={sliderRef}
          tabIndex="0"
          onKeyDown={handleKeyDown}
          aria-label="Banner Slider"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="w-full flex-shrink-0 relative"
                aria-hidden={currentSlide !== banner.id - 1}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
                  <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
                  <p className="text-xl mb-6">{banner.description}</p>
                  <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors duration-300">
                    {banner.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
            onClick={handlePrevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-black text-2xl" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
            onClick={handleNextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight className="text-black text-2xl" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          {smallBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[190px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                <p className="text-lg">{banner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;