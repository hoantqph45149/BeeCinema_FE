import React, { useEffect, useState } from "react";
import MovieCard from "../../../Components/Common/MovieCard";
import TabMovies from "../../../Components/Common/TabMovies";
import { useFetch } from "../../../Hooks/useCRUD";
import { useBrancheContext } from "../../../Contexts/branche/useBrancheContext";
import api from "../../../apis/axios";

const MoviesClient = () => {
  const { cinema } = useBrancheContext();
  const [phimDangChieu, setPhimDangChieu] = useState([]);
  const [phimSapChieu, setPhimSapChieu] = useState([]);
  const [xuatChieuDB, setXuatChieuDB] = useState([]);

  useEffect(() => {
    if (cinema?.id) {
      const fetchData = async () => {
        try {
          const { data } = await api.get(`/movies/tab?cinema_id=${cinema.id}`);

          if (!data) {
            return;
          }

          setPhimDangChieu(
            data.moviesShowing
              ? [...data.moviesShowing].sort(
                  (a, b) => b.showtimes_count - a.showtimes_count
                )
              : []
          );
          setPhimSapChieu(
            data.moviesUpcoming
              ? [...data.moviesUpcoming].sort(
                  (a, b) => b.showtimes_count - a.showtimes_count
                )
              : []
          );
          setXuatChieuDB(
            data.moviesSpecial
              ? [...data.moviesSpecial].sort(
                  (a, b) => b.showtimes_count - a.showtimes_count
                )
              : []
          );
        } catch (error) {
          console.error("Lỗi khi fetch dữ liệu:", error);
        }
      };

      fetchData();
    }
  }, [cinema]);

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
