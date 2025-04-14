import React, { useEffect, useState } from "react";
import Loading from "../../../Components/Common/Loading";
import MovieCard from "../../../Components/Common/MovieCard";
import TabMovies from "../../../Components/Common/TabMovies";
import { useBrancheContext } from "../../../Contexts/branche/UseBrancheContext";
import { useFetch } from "./../../../Hooks/useCRUD";

const MoviesClient = () => {
  const { cinema } = useBrancheContext();
  const [phimDangChieu, setPhimDangChieu] = useState([]);
  const [phimSapChieu, setPhimSapChieu] = useState([]);
  const [xuatChieuDB, setXuatChieuDB] = useState([]);

  const { data, isLoading } = useFetch(
    ["movies-tab", cinema?.id],
    `/movies/tab?cinema_id=${cinema?.id}`,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      enabled: !!cinema?.id,
    }
  );

  useEffect(() => {
    if (data && !isLoading) {
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
    }
  }, [data]);

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
        {isLoading ? (
          <div className="h-[400px]">
            <Loading />
          </div>
        ) : (
          <TabMovies
            tabs={movieTabs}
            defaultTab="PHIM ĐANG CHIẾU"
            onTabChange={(tab) => {
              // console.log("Tab changed!", tab);
            }}
          />
        )}
      </div>
    </>
  );
};

export default MoviesClient;
