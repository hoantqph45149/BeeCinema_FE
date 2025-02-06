import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    "https://files.betacorp.vn/media/images/2025/01/25/khai-truong-xt-ts-1702-x-621-1-000242-250125-96.png",
    "https://files.betacorp.vn/media/images/2025/02/05/con-mung-con-tet-an-choi-cang-det-1702-x-621-181815-050225-25.png",
    "https://files.betacorp.vn/media/images/2025/01/23/phim-hay-tet-at-ty-1702-x-621-161220-230125-81.png",
    "https://files.betacorp.vn/media/images/2025/01/23/1702x621-4-162401-230125-84.jpg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="w-full pb-5">
      <div className="relative w-full cm:h-[528px] md:h-[342px] lg:h-[600px] flex overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full h-full">
              <img
                src={banner}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div
          onClick={prevSlide}
          className="w-10 h-10 cm:hidden shadow-md rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer z-1000 bg-white left-3 flex justify-center items-center"
        >
          <ChevronLeft size={48} strokeWidth={5} />
        </div>
        <div className="absolute bottom-3 flex justify-center items-center gap-3 w-full">
          {banners.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`bg-gray-300 cursor-pointer rounded-full transition-all duration-400 ease-in-out ${
                index === currentSlide ? "w-5 h-5" : "w-3 h-3"
              }`}
            ></span>
          ))}
        </div>
        <div
          onClick={nextSlide}
          className="w-10 h-10 cm:hidden shadow-md rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer z-1000 bg-white right-3 flex justify-center items-center"
        >
          <ChevronRight size={48} strokeWidth={5} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
