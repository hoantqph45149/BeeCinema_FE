import { useState, useEffect } from "react";

const images = [
  "/images/posters/poster1.jpg",
  "/images/posters/poster2.jpg",
  "/images/posters/poster3.jpg",
  "/images/posters/poster4.jpg",
  "/images/posters/poster5.jpg",
  "/images/posters/poster6.jpg",
];

const AuthSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" min-w-full h-full relative">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`h-full w-full object-cover rounded-3xl absolute transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          alt={`Slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default AuthSlideshow;
