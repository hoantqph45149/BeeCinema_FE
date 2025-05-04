import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

export default function ReviewDisplay({ reviews }) {
  const [sortBy, setSortBy] = useState("highest");

  const sortedReviews = [...reviews].sort((a, b) => {
    return sortBy === "highest" ? b.rating - a.rating : a.rating - b.rating;
  });

  const renderStars = (rating, maxRating = 10) => {
    return Array.from({ length: maxRating }).map((_, i) => {
      return i < rating ? (
        <FaStar key={i} className="text-yellow-400 w-5 h-5" />
      ) : (
        <FaRegStar key={i} className="text-gray-300 w-5 h-5" />
      );
    });
  };

  return (
    <div className="bg-white rounded-lg  p-6 my-8">
      {/* Sorting controls */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Tất cả đánh giá</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sắp xếp theo:</span>
          <select
            className="border rounded p-1 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="highest">Điểm cao nhất</option>
            <option value="lowest">Điểm thấp nhất</option>
          </select>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {sortedReviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-800">
                {review.user_name}
              </h4>
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="font-bold">{review.rating}/10</span>
              </div>
            </div>
            <p className="text-gray-700">{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
