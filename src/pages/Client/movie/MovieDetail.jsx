import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../Hooks/useCRUD";
import MovieCard from "../../../Components/Common/MovieCard";
import Button from "../../../Components/Common/Button";

import TabShowtime from "../../../Components/Common/TabShowtime";

const MovieDetail = () => {
  const { id } = useParams();
  const { data } = useFetch(["movies"], `/movies/${id}`);
  const [movie, setMovie] = useState({});
  const [openModalShowtimes, setOpenModalShowtimes] = useState(false);
  useEffect(() => {
    if (data) {
      setMovie(data.movie);
    }
  }, [data]);
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
    </div>
  );
};

export default MovieDetail;
