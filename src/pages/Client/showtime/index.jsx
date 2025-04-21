import React, { useEffect, useState } from "react";
import Loading from "../../../Components/Common/Loading";
import MovieShowtimes from "../../../Components/Common/MovieShowtime";
import { useBrancheContext } from "../../../Contexts/branche/UseBrancheContext";
import { useFetch } from "../../../Hooks/useCRUD";

const ShowtimeClient = () => {
  const { cinema } = useBrancheContext();
  const { data: showtimes, isLoading } = useFetch(
    ["showtimes", cinema?.id],
    `/showtimespage?cinema_id=${cinema.id}`,
    {
      enabled: !!cinema?.id,
    }
  );
  const [activeTab, setActiveTab] = useState("");
  const [data, setData] = useState([]);
  const [movieShowtimes, setMovieShowtimes] = useState([]);
  const handleTabClick = (dateId) => {
    setActiveTab(dateId);
    const findShowtime = data.find((item) => item.date === dateId);
    setMovieShowtimes(findShowtime);
  };
  useEffect(() => {
    if (showtimes) {
      const res = showtimes.dates[0];

      if (!res.showtimes || res.showtimes.length === 0) {
        setData([]);
        setActiveTab(null);
        setMovieShowtimes(null);
      }

      setData(res.showtimes);
      setActiveTab(res.showtimes[0]?.date || null);

      const findShowtime = res.showtimes.find(
        (item) => item.date === res.showtimes[0]?.date
      );
      setMovieShowtimes(findShowtime || null);
    }
  }, [showtimes, cinema?.id]);

  return (
    <>
      {isLoading ? (
        <div className="container my-40">
          <Loading />
        </div>
      ) : (
        <>
          {data?.length === 0 && !isLoading ? (
            <div className="container my-40">
              <h3 className="text-center text-secondary text-xl font-semibold">
                Không có xuất chiếu nào ở rạp{" "}
                <strong className="text-accent">{`Beecinema ${cinema?.name}`}</strong>{" "}
                chiếu
              </h3>
            </div>
          ) : (
            <div className="container my-10 font-oswald">
              <ul className="grid grid-cols-3 sm:grid-cols-7 border-b">
                {data.map((item) => (
                  <li
                    key={item.date}
                    className={`text-center px-2 lg:px-6 py-2 sm:text-sm lg:text-base xl:text-xl font-extrabold transition-colors cursor-pointer ${
                      activeTab === item.date
                        ? "text-accent border-b-2 border-accent"
                        : "text-secondary border-b-2 border-transparent"
                    }`}
                    onClick={() => handleTabClick(item.date)}
                  >
                    {item.day_label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {movieShowtimes?.movies?.map((item, index) => (
            <MovieShowtimes
              key={item.id}
              movieShowtimes={item}
              className={
                index === movieShowtimes.movies.length - 1 ? "border-b-0" : ""
              }
            />
          ))}
        </>
      )}
    </>
  );
};

export default ShowtimeClient;
