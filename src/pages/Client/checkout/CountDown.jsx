import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCRUD } from "../../../Hooks/useCRUD";
import dayjs from "dayjs";

const CountDown = ({ time, seats }) => {
  const { create: chooseSeat } = useCRUD(["chooseSeats"]);
  const [timeLeft, setTimeLeft] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs();
      const expiresAt = dayjs(time, "YYYY-MM-DD HH:mm:ss");
      const diffSeconds = expiresAt.diff(now, "seconds");

      if (diffSeconds <= 0) {
        setTimeLeft("00:00");
        nav("/");
        seats.forEach((seat) => {
          chooseSeat.mutate({
            url: "/update-seat",
            data: {
              seat_id: seat?.seat_id,
              showtime_id: seat?.showtime_id,
              action: "release",
            },
            shouldShowLoadingAlert: false,
            shouldShowAlert: false,
          });
        });
        return;
      }

      const durationObj = dayjs.duration(diffSeconds, "seconds");
      setTimeLeft(durationObj.format("mm:ss"));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <>
      <div className="bg-primary rounded-lg w-full shadow-lg py-5">
        <div className=" text-accent text-center py-5 font-semibold">
          Thời gian còn lại
        </div>
        <div className="flex justify-center items-center">
          <div className="text-3xl font-semibold text-accent">{timeLeft}</div>
        </div>
      </div>
    </>
  );
};

export default CountDown;
