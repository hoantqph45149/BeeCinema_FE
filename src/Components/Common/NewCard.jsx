import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ image, title, description, link }) => {
  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Hình ảnh bài viết */}
        <div className="w-full aspect-[16/9]">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={title}
            loading="lazy" // Tối ưu hiệu suất
          />
        </div>

        {/* Nội dung bài viết */}
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {description}
          </p>

          {/* Nút xem chi tiết */}
          <Link
            to={link}
            className="text-blue-600 font-semibold mt-3 inline-block transition-colors duration-300 hover:text-blue-800"
          >
            Đọc thêm →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
