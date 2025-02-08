import React from "react";
import { FaRegClock } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieShowtimes = ({ movieShowtimes, className = "" }) => {
  const { showtimes, ...movie } = movieShowtimes;

  return (
    <div className="container">
      <div
        className={`flex flex-col sm:flex-row gap-6 items-center md:items-start border-b border-[#D9D9D9] py-10 ${className}`}
      >
        <div className="relative w-60 md:w-64 rounded-lg overflow-hidden shadow-lg">
          <MovieCard movie={movie} showInfo={false} />
        </div>

        {/* Thông tin phim */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-accent">{movie.name}</h2>
          <div className="text-gray-500 flex justify-center md:justify-start items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <MdDiscount className="text-accent" />
              <span>{movie.category}</span>
            </div>{" "}
            <div className="flex items-center gap-1">
              <FaRegClock className="text-accent" />
              <span> {movie.duration} phút</span>
            </div>
          </div>

          {/* Suất chiếu */}
          {Object.keys(showtimes).map((key) => (
            <div className="py-3 lg:py-5" key={key}>
              <h2 className="text-lg font-bold">{key}</h2>
              <ul className="pt-3 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                {showtimes[key].map((item, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-200 rounded-sm text-center font-semibold transition-all hover:text-sky-500 duration-300 hover:bg-gray-300"
                  >
                    <Link to={"/#"}>{item.start_time}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieShowtimes;
