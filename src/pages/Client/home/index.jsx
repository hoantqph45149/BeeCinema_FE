import React, { useEffect, useState } from "react";
import MovieCard from "../../../Components/Common/MovieCard";
import TabMovies from "../../../Components/Common/TabMovies";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import Banner from "./Banner";
import { useBrancheContext } from "../../../Contexts/branche/UseBrancheContext";
import VerifiedEmail from "../../Auth/verified-email";
import Modal from "../../../Components/Common/Modal";
import { useFetch } from "../../../Hooks/useCRUD";
import Loading from "../../../Components/Common/Loading";

const Home = () => {
  const { cinema } = useBrancheContext();
  const { authUser } = useAuthContext();
  const [openModalVeryfiedEmail, setOpenModalVeryfiedEmail] = useState(false);
  localStorage.removeItem("order_code");
  localStorage.removeItem("payment_name");

  const { data, isLoading } = useFetch(
    cinema?.id ? ["movies-tab", cinema.id] : null,
    `/movies/tab?cinema_id=${cinema?.id}`,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      enabled: !!cinema?.id,
    }
  );

  const phimDangChieu = data?.moviesShowing
    ? [...data.moviesShowing].sort(
        (a, b) => b.showtimes_count - a.showtimes_count
      )
    : [];
  const phimSapChieu = data?.moviesUpcoming
    ? [...data.moviesUpcoming].sort(
        (a, b) => b.showtimes_count - a.showtimes_count
      )
    : [];
  const xuatChieuDB = data?.moviesSpecial
    ? [...data.moviesSpecial].sort(
        (a, b) => b.showtimes_count - a.showtimes_count
      )
    : [];

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
            {phimSapChieu.map((movie, index) => (
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
            {phimDangChieu.map((movie, index) => (
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
            {xuatChieuDB.map((movie, index) => (
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

export default Home;
