import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useFetch } from "../../../Hooks/useCRUD";

const Banner = () => {
  const { data } = useFetch(["bannerActive"], "/banners/active");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (data?.banner) {
      setBanners(data.banner.img_thumbnail_url);
    }
  }, [data]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Chạy auto slide mà không làm ảnh hưởng đến API
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, banners.length]);

  return (
    <div className="w-full pb-5">
      <div className="relative w-full cm:h-[528px] md:h-[342px] lg:h-[500px] xl:h-[800px] flex overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full h-full">
              <img
                src={banner}
                alt={`Slide-${index}`}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {banners.length > 1 && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
