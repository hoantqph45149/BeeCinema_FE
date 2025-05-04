"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../Components/Common/Button";
import Modal from "../../../Components/Common/Modal";
import MovieCard from "../../../Components/Common/MovieCard";
import MovieRating from "../../../Components/Common/MovieRating";
import TabShowtime from "../../../Components/Common/TabShowtime";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
const MovieDetail = () => {
  const { id } = useParams();
  const { data } = useFetch(["movies", id], `/movies/${id}`);
  const { data: dataReview } = useFetch(
    ["check-status-review", id],
    `/check-status-review/${id}`
  );

  const {
    create: createReview,
    patch: updateReview,
    delete: deleteReview,
  } = useCRUD(["movies"]);

  const [movie, setMovie] = useState({});
  const [openModalShowtimes, setOpenModalShowtimes] = useState(false);
  const [ratingData, setRatingData] = useState({
    totalReviews: 0,
    averageRating: 0,
    starCounts: {},
  });
  const [hasReview, setHasReview] = useState({
    hasPurchased: false,
    hasReviewed: false,
  });
  const [reviews, setReviews] = useState([]);
  const [currentUserRating, setCurrentUserRating] = useState(null);

  useEffect(() => {
    if (data) {
      setMovie(data.movie);
      setRatingData({
        totalReviews: data.totalReviews,
        averageRating: data.averageRating,
        starCounts: data.starCounts,
      });
      setReviews(data.reviews);
    }
  }, [data]);

  useEffect(() => {
    if (dataReview) {
      setHasReview({
        hasPurchased: dataReview.hasPurchased,
        hasReviewed: dataReview.hasReviewed,
      });
      if (dataReview.hasReviewed && dataReview.review) {
        setCurrentUserRating({
          id: dataReview.review.id,
          rating: dataReview.review.rating,
          description: dataReview.review.description || "",
        });
      }
    }
  }, [dataReview]);

  const handleSubmitRating = (userRating) => {
    createReview.mutate(
      {
        url: "/movie-reviews",
        data: {
          ...userRating,
          description: userRating.comment,
          movie_id: id,
        },
      },
      {
        onSuccess: (data) => {
          setCurrentUserRating(data.review);
          setHasReview({ ...hasReview, hasReviewed: true });
        },
      }
    );
  };

  const handleUpdateRating = (updatedRating) => {
    updateReview.mutate(
      {
        url: `/movie-reviews/${currentUserRating.id}`,
        data: {
          ...updatedRating,
          description: updatedRating.comment,
        },
      },
      {
        onSuccess: (data) => {
          setCurrentUserRating(data.review);
        },
      }
    );
  };

  const handleDeleteRating = () => {
    deleteReview.mutate(`/movie-reviews/${currentUserRating.id}`, {
      onSuccess: () => {
        setCurrentUserRating(null);
        setHasReview({ ...hasReview, hasReviewed: false });
      },
    });
  };

  return (
    <div className="container my-6">
      <Modal
        isOpen={openModalShowtimes}
        onClose={() => setOpenModalShowtimes(false)}
        onSubmit={() => alert("Submitted!")}
        title={`Lịch chiếu - Phim: ${movie?.name}`}
        isFooter={false}
      >
        <TabShowtime idMovie={movie?.id} />
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-1 lg:col-span-1">
          <MovieCard movie={movie} showInfo={false} />
        </div>

        <div className="md:col-span-1 lg:col-span-2">
          <h1 className="text-lg lg:text-3xl py-4 font-bold text-gray-800">
            {movie?.name}
          </h1>
          <p className="text-secondary">{movie?.description}</p>

          <div className="grid grid-cols-1 gap-4">
            <p className="text-sm">
              <strong>Đạo diễn:</strong> {movie?.director}
            </p>
            <p className="text-sm">
              <strong>Diễn viên:</strong> {movie?.cast}
            </p>
            <p className="text-sm">
              <strong>Thể loại:</strong> {movie?.category}
            </p>
            <p className="text-sm">
              <strong>Thời lượng:</strong> {movie?.duration} Phút
            </p>
            <div className="text-sm">
              <strong>Định dạng:</strong>{" "}
              <div className="flex gap-1">
                {movie?.movie_versions?.map((item) => (
                  <button
                    className="p-2 bg-accent rounded text-primary font-semibold"
                    key={item.id}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm">
              <strong>Ngày khởi chiếu:</strong> {movie?.release_date}
            </p>
            {movie?.showtimes_count > 0 && (
              <div className="py-4 max-w-[200px]">
                <Button
                  showIcon={true}
                  onClick={() => {
                    setOpenModalShowtimes(true);
                  }}
                >
                  MUA VÉ
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="my-6 flex justify-center rounded-xl overflow-hidden">
        <iframe
          className="w-full min-h-[400px] xl:h-[600px]"
          src={`https://www.youtube.com/embed/${movie?.trailer_url}?rel=0&showinfo=0`}
          allow="autoplay; encrypted-media"
          title="Video"
        ></iframe>
      </div>
      <MovieRating
        ratingData={ratingData}
        onSubmitRating={handleSubmitRating}
        onUpdateRating={handleUpdateRating}
        onDeleteRating={handleDeleteRating}
        currentUserRating={currentUserRating}
        hasPurchased={hasReview.hasPurchased}
        reviewMessage={dataReview?.message}
        reviews={reviews}
      />
    </div>
  );
};

export default MovieDetail;
