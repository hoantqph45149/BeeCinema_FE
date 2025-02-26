import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { GiCarSeat } from "react-icons/gi";
import { MdDiscount, MdOutlineMeetingRoom } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";

import SeatInfo from "./SeatInfo";
import SeatLegend from "./SeatLegend";
import SeatTable from "./SeatTable";

import Button from "../../../Components/Common/Button";
import { showAlert } from "../../../Components/Common/showAlert";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import echo from "../../../pusher/echo";
import { replateName } from "../../../utils/ReplateName";
import { handleSeatSelection } from "./SeatSelectionLogic";

const ChooseSeat = () => {
  const nav = useNavigate();
  const { slug } = useParams();
  const { authUser } = useAuthContext();
  const { data: showtimeData } = useFetch(
    ["choose-seat", slug],
    `/choose-seat/${slug}`
  );
  const { create: chooseSeat } = useCRUD(["chooseSeats"]);
  const countdownDuration = 10 * 60;
  const [timeLeft, setTimeLeft] = useState(countdownDuration);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [movie, setMovie] = useState({});
  const [seatsByRow, setSeatsByRow] = useState([]);
  const [matrixSeat, setMatrixSeat] = useState({});

  useEffect(() => {
    if (showtimeData) {
      setMovie(showtimeData.showtime.movie);
      setSeatsByRow(showtimeData.seatMap);
      setMatrixSeat(showtimeData.matrixSeat);

      const filteredSeats = showtimeData.seatMap
        .flatMap((row) => row.seats)
        .filter(
          (seat) =>
            seat.pivot?.user_id === authUser?.user.id &&
            seat.pivot?.status === "hold"
        );

      setSelectedSeats(filteredSeats);
    }
  }, [showtimeData]);

  useEffect(() => {
    const channel = echo.channel(`showtime.${showtimeData?.showtime?.id}`);

    channel.listen(".seatStatusChange", (data) => {
      setSeatsByRow((prevSeatsByRow) => {
        return prevSeatsByRow.map((row) => ({
          ...row,
          seats: row.seats.map((seat) =>
            seat.id === data.seatId
              ? {
                  ...seat,
                  pivot: {
                    ...seat.pivot,
                    status: data.status,
                    user_id: data.userId,
                  },
                }
              : seat
          ),
        }));
      });
    });

    return () => {
      channel.stopListening(".SeatStatusChange");
      echo.leaveChannel(`showtime.${showtimeData?.showtime?.id}`);
    };
  }, [showtimeData?.showtime?.id]);

  useEffect(() => {
    const totalAmount = selectedSeats.reduce((amount, s) => {
      return amount + Number(s.pivot.price);
    }, 0);
    setTotalAmount(totalAmount);
  }, [selectedSeats]);

  useEffect(() => {
    const storedData = localStorage.getItem("countdownData");
    const now = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)

    if (storedData) {
      const { slug: storedSlug, endTime } = JSON.parse(storedData);

      if (storedSlug === slug) {
        // Slug trùng khớp → tiếp tục đếm ngược
        const remainingTime = endTime - now;
        setTimeLeft(remainingTime > 0 ? remainingTime : 0);
        return;
      }
    }

    // Slug không khớp hoặc chưa có dữ liệu → tạo mới
    const newEndTime = now + countdownDuration;
    localStorage.setItem(
      "countdownData",
      JSON.stringify({ slug: slug, endTime: newEndTime })
    );
    setTimeLeft(countdownDuration);
  }, [slug]);

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("countdownData");
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
      showAlert("", "Hết thời gian chọn ghế", "warning");
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const toggleSeatSelection = (selectSeat) => {
    const currentSeatCount = selectedSeats.reduce((total, seat) => {
      return total + (seat.type_seat_id === 3 ? 2 : 1);
    }, 0);

    const isSelected = selectedSeats.some((s) => s.id === selectSeat.id);
    const seatValue = selectSeat.type_seat_id === 3 ? 2 : 1;

    if (!isSelected && currentSeatCount + seatValue > 8) {
      showAlert("", "Bạn chỉ được chọn tối đa 8 ghế", "warning");
      return;
    }

    setSelectedSeats((prevSelectedSeats) =>
      isSelected
        ? prevSelectedSeats.filter((s) => s.id !== selectSeat.id)
        : [
            ...prevSelectedSeats,
            {
              ...selectSeat,
              pivot: {
                ...selectSeat.pivot,
                status: "hold",
                user_id: authUser?.user.id,
              },
            },
          ]
    );

    setSeatsByRow((prevSeatsByRow) => {
      const updatedSeatsByRow = prevSeatsByRow.map((row) => ({
        ...row,
        seats: row.seats.map((seat) =>
          seat.id === selectSeat.id
            ? {
                ...seat,
                pivot: {
                  ...seat.pivot,
                  status:
                    seat.pivot?.status === "available" ? "hold" : "available",
                  user_id:
                    seat.pivot?.status === "available"
                      ? authUser?.user.id
                      : null,
                },
              }
            : seat
        ),
      }));
      return updatedSeatsByRow;
    });

    chooseSeat.mutate({
      url: "/update-seat",
      data: {
        seat_id: selectSeat.id,
        showtime_id: selectSeat?.pivot?.showtime_id,
        action: selectSeat.pivot?.status === "available" ? "hold" : "release",
      },
      shouldShowLoadingAlert: false,
      shouldShowAlert: false,
    });
  };

  const handleCheckOut = () => {
    if (selectedSeats.length === 0) {
      showAlert("", "Vui lòng chọn ghế", "warning");
      return;
    }
    const isValid = handleSeatSelection(seatsByRow, authUser?.user.id);

    if (isValid) {
      nav(`/checkout/${slug}`, { selectedSeats });
    }
  };
  return (
    <div className="container my-10">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 xl:gap-20 min-h-10">
        <div className="flex-1">
          <div className="flex flex-col gap-5">
            <SeatLegend />
            <SeatTable
              seatsByRow={seatsByRow}
              toggleSeatSelection={toggleSeatSelection}
              matrix={matrixSeat}
            />
            <SeatInfo totalAmount={totalAmount} />
          </div>
        </div>
        <div className="w-full md:w-[38%] lg:w-1/3 flex flex-col gap-5 ">
          <div className="bg-primary rounded-lg shadow-lg overflow-hidden">
            <div className="bg-accent text-sm lg:text-base text-primary text-center py-2 font-semibold">
              Thông tin phim
            </div>
            <div>
              <div className="flex justify-between py-5 gap-2">
                <img
                  src={movie.img_thumbnail}
                  alt={movie.name}
                  className="w-36 mb-4"
                />
                <div className="flex-1 flex flex-col gap-3 font-lato">
                  <h2 className="lg:text-lg font-semibold text-accent">
                    {movie.name}
                  </h2>
                  <p className="text-secondary text-xs lg:text-sm font-semibold">
                    {showtimeData?.showtime?.format}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2 px-4 text-sm lg:text-base">
                <div className="flex justify-between items-center ">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <MdDiscount />
                    </span>
                    <span className="text-secondary">Thể loại</span>
                  </span>
                  <span className="text-accent font-semibold">
                    {movie.category}
                  </span>
                </div>
                <div className="flex justify-between items-center ">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <FaRegClock />
                    </span>
                    <span className="text-scondary">Thời lượng</span>
                  </span>
                  <span className="text-accent font-semibold">
                    {movie.duration} phút
                  </span>
                </div>
              </div>
              <hr className="my-4 border-secondary border-dashed" />
              <div className="space-y-2 px-4 text-sm lg:text-base">
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <SiHomeassistantcommunitystore />
                    </span>
                    <span className="text-secondary">Rạp chiếu</span>
                  </span>
                  <span className="text-accent font-semibold">
                    {showtimeData?.showtime?.room?.cinema?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <FaCalendarAlt />
                    </span>
                    <span className="text-secondary">Ngày chiếu</span>
                  </span>
                  <span className="text-accent font-semibold">
                    {showtimeData?.showtime?.date}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <FaRegClock />
                    </span>
                    <span className="text-secondary">Giờ chiếu</span>
                  </span>
                  <span className="text-accent font-semibold">
                    {dayjs(showtimeData?.showtime?.start_time).format("HH:mm")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <MdOutlineMeetingRoom />
                    </span>
                    <span className="text-secondary">Phòng chiếu</span>
                  </span>
                  <span className="text-accent font-semibold">
                    {showtimeData?.showtime?.room?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-10">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <GiCarSeat />
                    </span>
                    <span className="text-secondary">Ghế</span>
                  </span>
                  <span className="text-accent font-semibold flex flex-wrap gap-2">
                    {selectedSeats.map((seat) =>
                      seat.type_seat_id === 3 ? (
                        <span key={seat.id}>{replateName(seat.name)}</span>
                      ) : (
                        <span key={seat.id}>{seat.name}</span>
                      )
                    )}
                  </span>
                </div>
              </div>
              <div className="text-center py-5">
                <Button onClick={handleCheckOut} className="w-[100px]">
                  Tiếp Tục
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-primary rounded-lg w-full shadow-lg py-5">
            <div className=" text-accent text-center py-5 font-semibold">
              Thời gian còn lại
            </div>
            <div className="flex justify-center items-center">
              <div className="text-3xl font-semibold text-accent">
                {" "}
                {formatTime(timeLeft)}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSeat;
