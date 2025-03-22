import React, { useEffect, useState } from "react";
import MovieCard from "../../../Components/Common/MovieCard";
import TabMovies from "../../../Components/Common/TabMovies";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import Banner from "./Banner";

import { useBrancheContext } from "../../../Contexts/branche/UseBrancheContext";
import api from "../../../apis/axios";
import VerifiedEmail from "../../Auth/verified-email";
import Modal from "../../../Components/Common/Modal";

const Home = () => {
  const { cinema } = useBrancheContext();
  const { authUser } = useAuthContext();

  const [phimDangChieu, setPhimDangChieu] = useState([]);
  const [phimSapChieu, setPhimSapChieu] = useState([]);
  const [xuatChieuDB, setXuatChieuDB] = useState([]);
  const [openModalVeryfiedEmail, setOpenModalVeryfiedEmail] = useState(false);

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

  useEffect(() => {
    if (authUser && authUser?.email_verified_at === null) {
      setOpenModalVeryfiedEmail(true);
    }
  }, [authUser]);

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
      {openModalVeryfiedEmail && (
        <Modal
          isOpen={true}
          onClose={() => setOpenModalVeryfiedEmail(false)}
          title="Xác thực Email"
          isFooter={false}
        >
          <VerifiedEmail />
        </Modal>
      )}
      <div className="hidden md:block">
        <Banner />
      </div>

      <div className="my-10">
        <TabMovies
          tabs={movieTabs}
          defaultTab="PHIM ĐANG CHIẾU"
          onTabChange={(tab) => {
            // console.log("Tab changed!", tab);
          }}
        />
      </div>
    </>
  );
};

export default Home;
