import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
import { useCRUD } from "../../../Hooks/useCRUD";
import { useNavigate } from "react-router-dom";

dayjs.extend(duration);

const CountDown = ({ holdExpiresAt, selectedSeats }) => {
  const { create: chooseSeat } = useCRUD(["chooseSeats"]);
  const [timeLeft, setTimeLeft] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (!selectedSeats || selectedSeats.length === 0) {
      setTimeLeft(""); // Không hiển thị thời gian
      return;
    }

    const updateCountdown = () => {
      const now = dayjs();
      const expiresAt = dayjs(holdExpiresAt, "YYYY-MM-DD HH:mm:ss");
      const diffSeconds = expiresAt.diff(now, "seconds");

      if (diffSeconds <= 0) {
        setTimeLeft("00:00");
        nav("/");

        selectedSeats.forEach((seat) => {
          chooseSeat.mutate({
            url: "/update-seat",
            data: {
              seat_id: seat.id,
              showtime_id: seat?.pivot?.showtime_id,
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
  }, [holdExpiresAt, selectedSeats]); // Thêm `selectedSeats` vào dependency array

  return (
    <>
      {timeLeft && ( // Chỉ hiển thị khi có thời gian
        <div className="bg-primary rounded-lg w-full shadow-lg py-5">
          <div className="text-accent text-center py-5 font-semibold">
            Thời gian còn lại
          </div>
          <div className="flex justify-center items-center">
            <div className="text-3xl font-semibold text-accent">{timeLeft}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountDown;
