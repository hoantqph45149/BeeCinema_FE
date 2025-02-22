import React, { useEffect, useState } from "react";
import MovieCard from "../../../Components/Common/MovieCard";
import TabMovies from "../../../Components/Common/TabMovies";
import { useFetch } from "../../../Hooks/useCRUD";

const MoviesClient = () => {
  const { data: movies } = useFetch(["movies"], "/moviesClientHome");
  const [phimDangChieu, setPhimDangChieu] = useState([]);
  const [phimSapChieu, setPhimSapChieu] = useState([]);
  const [xuatChieuDB, setXuatChieuDB] = useState([]);

  useEffect(() => {
    if (movies) {
      setPhimDangChieu(
        movies.moviesShowing
          ? [...movies.moviesShowing].sort(
              (a, b) => b.showtimes_count - a.showtimes_count
            )
          : []
      );
      setPhimSapChieu(
        movies.moviesUpcoming
          ? [...movies.moviesUpcoming].sort(
              (a, b) => b.showtimes_count - a.showtimes_count
            )
          : []
      );
      setXuatChieuDB(
        movies.moviesSpecial
          ? [...movies.moviesSpecial].sort(
              (a, b) => b.showtimes_count - a.showtimes_count
            )
          : []
      );
    }
  }, [movies]);

  const movieTabs = [
    {
      label: "PHIM SẮP CHIẾU",
      content: (
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {phimSapChieu?.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "PHIM ĐANG CHIẾU",
      content: (
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {phimDangChieu?.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "SUẤT CHIẾU ĐẶC BIỆT",
      content: (
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {xuatChieuDB?.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="my-10">
        <TabMovies
          tabs={movieTabs}
          defaultTab="PHIM ĐANG CHIẾU"
          onTabChange={(tab) => {
            console.log("Tab changed!", tab);
          }}
        />
      </div>
    </>
  );
};

export default MoviesClient;
