import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const TabShowtime = ({ idMovie }) => {
  console.log(idMovie);
  const [activeTab, setActiveTab] = useState("");
  const [data, setdata] = useState([]);
  const [showtimes, setShowtime] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/showtimes")
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          setdata(res);
          setActiveTab(res[0].day_id);
          const findShowtime = res.find(
            (item) => item.day_id === res[0].day_id
          );
          setShowtime(findShowtime.showtimes);
        }
      })
      .catch((err) => console.error("Error fetching showtimes:", err));
  }, []);

  // Object.keys(showtimes).map((key) => {
  //   console.log(key, showtimes[key]);
  // });

  const handleTabClick = (dateId) => {
    setActiveTab(dateId);
    const findShowtime = data.find((item) => item.day_id === dateId);
    setShowtime(findShowtime.showtimes);
  };

  return (
    <div className="w-full min-h-80">
      {/* Thanh Tabs */}
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

      {/* Nội dung hiển thị */}

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
                  {dayjs(item.start_time).format("HH:mm")}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabShowtime;
