import React, { useEffect, useState } from "react";
import MovieCard from "../../../Components/Common/MovieCard";
import TabMovies from "../../../Components/Common/TabMovies";

const MoviesClient = () => {
  const [phimDangChieu, setPhimDangChieu] = useState([]);
  const [phimSapChieu, setPhimSapChieu] = useState([]);
  const [xuatChieuDB, setXuatChieuDB] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/moviesShowing").then((res) => res.json()),
      fetch("http://localhost:3000/moviesUpcoming").then((res) => res.json()),
      fetch("http://localhost:3000/moviesSpecial").then((res) => res.json()),
    ])
      .then(([moviesShowing, moviesUpcoming, moviesSpecial]) => {
        setPhimDangChieu(moviesShowing);
        setPhimSapChieu(moviesUpcoming);
        setXuatChieuDB(moviesSpecial);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch dữ liệu:", error);
      });
  }, []);

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
