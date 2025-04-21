import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const AnimationPlay = () => {
  return (
    <div className="w-[70px] h-[70px] relative flex items-center justify-center">
      {/* Vòng tròn phát sáng */}
      <div className="absolute w-full h-full bg-[#e1e1e199] rounded-full animate-ping"></div>

      {/* Hình ảnh play video */}

      <div className="relative  w-[80%] h-[80%] rounded-full">
        <FaPlayCircle className="w-full h-full text-white" />
      </div>
    </div>
  );
};

export default AnimationPlay;
