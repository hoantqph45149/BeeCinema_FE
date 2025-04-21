import dayjs from "dayjs";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
import api from "../../apis/axios";
import { useBrancheContext } from "../../Contexts/branche/UseBrancheContext";

const TabShowtime = ({ idMovie }) => {
  const { cinema } = useBrancheContext();
  const [activeTab, setActiveTab] = useState("");
  const [data, setData] = useState([]);
  const [showtimes, setShowtime] = useState([]);
  useEffect(() => {
    if (cinema?.id) {
      const fetchData = async () => {
        try {
          const { data } = await api.get(
            `/showtimemovie?cinema_id=${cinema.id}&movie_id=${idMovie}`
          );
          if (!data.showtimes || data.showtimes.length === 0) {
            setData([]);
            setActiveTab(null);
            setMovieShowtimes(null);
            return;
          }

          setData(data.showtimes);
          setActiveTab(data.showtimes[0].day_id);
          const findShowtime = data.showtimes.find(
            (item) => item.day_id === data.showtimes[0].day_id
          );
          setShowtime(findShowtime.showtimes);
        } catch (error) {
          console.error("Lỗi khi fetch dữ liệu:", error);
        }
      };

      fetchData();
    }
  }, []);

  const handleTabClick = (dateId) => {
    setActiveTab(dateId);
    const findShowtime = data.find((item) => item.day_id === dateId);
    setShowtime(findShowtime.showtimes);
  };

  return (
    <div
      className={`w-full min-h-80 ${
        data.length > 0 ? "block" : "flex flex-col"
      } `}
    >
      <h3 className="text-lg md:text-xl text-center font-bold py-4">
        {" "}
        Rạp chiếu{" "}
        <strong className="text-accent"> Beecinema {cinema?.name}</strong>
      </h3>
      {data.length > 0 ? (
        <>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 border-b">
            {data.map((item) => (
              <li
                key={item.day_id}
                className={`text-center px-6 py-2 text-lg font-extrabold transition-colors cursor-pointer ${
                  activeTab === item.day_id
                    ? "text-accent border-b-2 border-accent"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabClick(item.day_id)}
              >
                {item.date_label}
              </li>
            ))}
          </ul>

          <div className="mt-5">
            {Object.keys(showtimes).map((key) => (
              <div className="mb-5" key={key}>
                <h2 className="text-lg font-bold">{key}</h2>
                <ul className="pt-3 grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                  {showtimes[key].map((item, index) => (
                    <li
                      key={item.id}
                      className="p-2 bg-gray-200 rounded-sm cursor-pointer text-center font-semibold transition-all   hover:text-accent duration-300 hover:bg-gray-300"
                    >
                      <Link to={`/choose-seat/${item.slug}`}>
                        {" "}
                        {dayjs(item.start_time).format("HH:mm")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="container py-24">
          {" "}
          <Loading />
        </div>
      )}
    </div>
  );
};

export default TabShowtime;
