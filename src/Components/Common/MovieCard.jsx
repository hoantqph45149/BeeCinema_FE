import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "./Modal";
import Button from "./Button";
import TabShowtime from "./TabShowtime";
import AnimationPlay from "./AnimationPlay";

const MovieCard = ({ movie, showInfo = true }) => {
  const [openModalTrailer, setOpenModalTrailer] = useState(false);
  const [openModalShowtimes, setOpenModalShowtimes] = useState(false);
  const [idMovie, setIdMovie] = useState(null);
  return (
    <>
      <Modal
        isOpen={openModalShowtimes}
        onClose={() => setOpenModalShowtimes(false)}
        onSubmit={() => alert("Submitted!")}
        title={`Lịch chiếu - Phim: ${movie?.name}`}
        isFooter={false}
      >
        <TabShowtime idMovie={idMovie} />
      </Modal>
      <Modal
        isOpen={openModalTrailer}
        onClose={() => setOpenModalTrailer(false)}
        onSubmit={() => alert("Submitted!")}
        title={`Trailer - ${movie?.name}`}
        isFooter={false}
      >
        <iframe
          className="w-full md:w-[800px]"
          height="400"
          src={`https://www.youtube.com/embed/${movie?.trailer_url}?rel=0&showinfo=0&autoplay=1`}
          allow="autoplay; encrypted-media"
          title="Video"
        ></iframe>
      </Modal>
      <div className="max-w-full rounded-xl overflow-hidden  bg-white">
        {/* Movie Poster */}
        <div className="relative group ">
          <img
            src={movie?.img_thumbnail}
            alt={movie?.name}
            className="w-full rounded-xl"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity rounded-xl"></div>

          <div
            onClick={() => setOpenModalTrailer(true)()}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <AnimationPlay />
          </div>

          {/* Age Rating */}
          {movie?.rating == "T13" ? (
            <div className="absolute top-2 left-2">
              <img src="/images/T13.png" alt="T13" />
            </div>
          ) : movie?.rating == "T16" ? (
            <div className="absolute top-2 left-2">
              <img src="/images/T16.png" alt="T16" />
            </div>
          ) : movie?.rating == "T18" ? (
            <div className="absolute top-2 left-2">
              <img src="/images/T18.png" alt="T18" />
            </div>
          ) : movie?.rating == "P" ? (
            <div className="absolute top-2 left-2">
              <img src="/images/p.png" alt="T18" />
            </div>
          ) : (
            <></>
          )}

          {/* Hot Badge */}
          {movie?.is_hot && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md rotate-12">
              HOT
            </span>
          )}
        </div>

        {/* Movie Info */}
        {showInfo && (
          <>
            <div>
              <Link
                to={`/movies/${movie?.id}/detail`}
                className="text-lg font-bold text-accent truncate py-2 font-oswald w-full block max-w-full hover:underline"
              >
                {movie?.name}
              </Link>

              <p className="text-sm py-1 font-lato">
                <span className="font-bold">Thể loại:</span> {movie?.category}
              </p>
              <p className="text-sm font-lato">
                <span className="font-bold">Thời lượng:</span> {movie?.duration}{" "}
                phút
              </p>
            </div>

            {/* Buy Ticket Button */}
            {movie?.showtimes_count > 0 && (
              <div className="py-4">
                <Button
                  showIcon={true}
                  onClick={() => {
                    setIdMovie(movie?.id);
                    setOpenModalShowtimes(true);
                  }}
                >
                  MUA VÉ
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MovieCard;
