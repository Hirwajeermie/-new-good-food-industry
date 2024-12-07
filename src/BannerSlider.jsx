import React, { useState } from "react";

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    "https://via.placeholder.com/800x300/FF5733/FFFFFF?text=Banner+1",
    "https://via.placeholder.com/800x300/33FF57/FFFFFF?text=Banner+2",
    "https://via.placeholder.com/800x300/5733FF/FFFFFF?text=Banner+3",
    "https://via.placeholder.com/800x300/FFFF33/FFFFFF?text=Banner+4"
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="w-full h-64 sm:h-80 md:h-96">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
      >
        &#10095;
      </button>
    </div>
  );
};

export default BannerSlider;
