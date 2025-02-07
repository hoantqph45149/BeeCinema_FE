import { useState } from "react";
import AnimationPlay from "./AnimationPlay";
import Modal from "./modal";
import TabShowtime from "./TabShowtime";
import { Ticket } from "lucide-react";
import Button from "./Button";

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
        title="Lịch chiếu - Vùng Đất Câm Lặng 2"
        isFooter={false}
      >
        <TabShowtime idMovie={idMovie} />
      </Modal>
      <Modal
        isOpen={openModalTrailer}
        onClose={() => setOpenModalTrailer(false)}
        onSubmit={() => alert("Submitted!")}
        title="Trailer - Bộ tứ báo thủ"
        isFooter={false}
      >
        <iframe
          className="w-full md:w-[800px]"
          height="400"
          src="https://www.youtube.com/embed/miC9FrfpwtY?rel=0&showinfo=0&autoplay=1"
          allow="autoplay; encrypted-media"
          title="Video"
        ></iframe>
      </Modal>
      <div className="max-w-full rounded-xl overflow-hidden  bg-white">
        {/* Movie Poster */}
        <div className="relative group ">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full rounded-xl"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity rounded-xl"></div>

          {/* Play Button */}
          <div
            onClick={() => setOpenModalTrailer(true)()}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <AnimationPlay />
          </div>

          {/* Age Rating */}
          {movie.ageRating && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-md">
              {movie.ageRating}
            </span>
          )}

          {/* Hot Badge */}
          {movie.isHot && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md rotate-12">
              HOT
            </span>
          )}
        </div>

        {/* Movie Info */}
        {showInfo && (
          <>
            <div>
              <h3 className="text-lg font-bold text-accent truncate py-3 font-oswald">
                {movie.title}
              </h3>
              <p className="text-sm py-1 font-lato">
                <span className="font-bold">Thể loại:</span>{" "}
                {movie.genres.join(", ")}
              </p>
              <p className="text-sm font-lato">
                <span className="font-bold">Thời lượng:</span> {movie.duration}{" "}
                phút
              </p>
            </div>

            {/* Buy Ticket Button */}
            <div className="py-4 ">
              <Button
                showIcon={true}
                onClick={() => {
                  setIdMovie(movie.title);
                  setOpenModalShowtimes(true);
                }}
              >
                MUA VÉ
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MovieCard;
