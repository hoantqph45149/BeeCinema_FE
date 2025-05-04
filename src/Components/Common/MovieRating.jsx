"use client";

import { Edit, Star, StarHalf, Trash2 } from "lucide-react"; // Thêm Trash2 để xóa
import { useEffect, useState } from "react";
import { showConfirm } from "./showAlert";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReviewDisplay from "../../pages/Client/movie/ReviewDisplay";

const MovieRating = ({
  ratingData,
  onSubmitRating,
  onUpdateRating,
  onDeleteRating,
  currentUserRating,
  hasPurchased,
  reviewMessage,
  reviews,
  ...props
}) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { totalReviews, averageRating, starCounts } = ratingData;

  useEffect(() => {
    if (currentUserRating) {
      setUserRating(currentUserRating.rating);
      setComment(currentUserRating.description || "");
    }
  }, [currentUserRating]);

  const calculatePercentage = (count) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  const renderStars = (rating) => {
    return [...Array(10)].map((_, i) => {
      const starIndex = i + 1;
      if (starIndex <= rating) {
        return <FaStar key={i} className="text-yellow-400 w-5 h-5" />;
      } else if (starIndex - 0.5 <= rating) {
        return <FaStarHalfAlt key={i} className="text-yellow-400 w-5 h-5" />;
      } else {
        return <FaRegStar key={i} className="text-gray-300 w-5 h-5" />;
      }
    });
  };

  // Handle user rating submission
  const handleSubmitRating = () => {
    if (userRating > 0) {
      if (isEditing) {
        onUpdateRating && onUpdateRating({ rating: userRating, comment });
      } else {
        onSubmitRating && onSubmitRating({ rating: userRating, comment });
      }
      setShowRatingForm(false);
      setIsEditing(false);
    }
  };

  // Handle starting the edit process
  const handleEditRating = () => {
    setIsEditing(true);
    setShowRatingForm(true);
  };

  // Handle deleting the rating
  const handleDelete = () => {
    showConfirm(
      "Xóa đánh giá",
      `Bạn có chắc muốn xóa đánh giá này không?`,
      () => {
        onDeleteRating && onDeleteRating();
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Đánh giá phim</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Average rating section */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 border rounded-lg">
          <div className="text-4xl font-bold text-gray-800">
            {averageRating.toFixed(1)}
            <span className="text-xl text-gray-500">/10</span>
          </div>
          <div className="flex my-2">{renderStars(averageRating)}</div>
          <div className="text-gray-500 text-sm">
            {totalReviews} {totalReviews === 1 ? "đánh giá" : "đánh giá"}
          </div>
        </div>

        {/* Rating distribution section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Phân bố đánh giá
          </h3>
          <div className="space-y-2">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <div className="w-8 text-sm text-gray-600">{star}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(starCounts[star])}%`,
                    }}
                  ></div>
                </div>
                <div className="w-8 text-sm text-gray-600 text-right">
                  {starCounts[star] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User rating section */}
      <div className="mt-8">
        {!hasPurchased ? (
          <></>
        ) : !showRatingForm ? (
          <div>
            {currentUserRating ? (
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Đánh giá của bạn
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditRating}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                      title="Chỉnh sửa đánh giá"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                      title="Xóa đánh giá"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                          i < currentUserRating.rating
                            ? "bg-yellow-100 text-yellow-500 shadow-md"
                            : "bg-gray-100 text-gray-300"
                        }`}
                      >
                        <FaStar className="w-4 h-4" />
                      </div>
                    ))}
                  </div>
                  <span className="font-bold">
                    {currentUserRating.rating}/10
                  </span>
                </div>
                {currentUserRating.description && (
                  <div className="bg-gray-50 p-3 rounded-md text-gray-700">
                    {currentUserRating.description}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowRatingForm(true)}
                className="px-4 py-2 bg-accent rounded text-primary font-semibold hover:bg-accent/90 transition"
              >
                Đánh giá phim này
              </button>
            )}
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {isEditing ? "Chỉnh sửa đánh giá" : "Đánh giá của bạn"}
            </h3>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  className="focus:outline-none transition-transform duration-150 transform hover:scale-125"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                >
                  <FaStar
                    className={`w-8 h-8 transition-colors duration-200 ${
                      star <= (hoverRating || userRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              className="w-full border rounded-md p-2 mb-4"
              rows="3"
              placeholder="Nhận xét của bạn (tùy chọn)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex gap-2">
              <button
                onClick={handleSubmitRating}
                className="px-4 py-2 bg-accent rounded text-primary font-semibold hover:bg-accent/90 transition"
                disabled={userRating === 0}
              >
                {isEditing ? "Cập nhật đánh giá" : "Gửi đánh giá"}
              </button>
              <button
                onClick={() => {
                  setShowRatingForm(false);
                  if (!currentUserRating) {
                    setUserRating(0);
                    setComment("");
                  } else {
                    setUserRating(currentUserRating.rating);
                    setComment(currentUserRating.description || "");
                  }
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded text-gray-700 font-semibold hover:bg-gray-300 transition"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
      {reviews && reviews.length > 0 && <ReviewDisplay reviews={reviews} />}
    </div>
  );
};

export default MovieRating;
