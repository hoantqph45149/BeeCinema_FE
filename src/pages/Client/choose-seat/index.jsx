import { replateName } from "../../../utils/ReplateName";
import DialogCus from "../../../Components/Common/Dialog";

import React, { useEffect, useState } from "react";

import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { GiCarSeat } from "react-icons/gi";
import { MdDiscount, MdOutlineMeetingRoom } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";

import SeatInfo from "./SeatInfo";
import SeatLegend from "./SeatLegend";
import { handleSeatSelection } from "./SeatSelectionLogic";
import SeatTable from "./SeatTable";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../Hooks/useCRUD";
import dayjs from "dayjs";

const ChooseSeat = () => {
  const { slug } = useParams();
  const { data: showtimeData } = useFetch(
    ["showtime", slug],
    `/showtimes/slug/${slug}`
  );
  console.log(showtimeData);
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
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
    }
  }, [showtimeData]);
  console.log(movie);
  const toggleSeatSelection = (seat) => {
    handleSeatSelection(
      seat,
      selectedSeats,
      setSelectedSeats,
      seatsByRow,
      setDialog
    );
  };

  useEffect(() => {
    const totalAmount = selectedSeats.reduce((amount, s) => {
      return (
        amount +
        (s.type_seat_id === 3 ? 160000 : s.type_seat_id === 2 ? 80000 : 50000)
      );
    }, 0);

    setTotalAmount(totalAmount);
  }, [selectedSeats]);

  return (
    <div className="container my-10">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 xl:gap-20 min-h-10">
        <div className="flex-1">
          <div className="flex flex-col gap-5">
            <SeatLegend />
            <SeatTable
              seatsByRow={seatsByRow}
              selectedSeats={selectedSeats}
              toggleSeatSelection={toggleSeatSelection}
              matrix={matrixSeat}
            />
            <SeatInfo totalAmount={totalAmount} />
          </div>
        </div>
        <div className="w-full md:w-[38%] lg:w-1/3 flex flex-col gap-5 ">
          <div className="bg-primary rounded-lg shadow-lg overflow-hidden">
            <div className="bg-accent text-primary text-center py-2 font-semibold">
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
                  <h2 className="text-lg font-semibold text-accent">
                    {movie.name}
                  </h2>
                  <p className="text-secondary text-sm">
                    {showtimeData?.showtime?.format}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2 px-4">
                <div className="flex justify-between items-center">
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
                <div className="flex justify-between items-center">
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
              <div className="space-y-2 px-4">
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
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <span className="text-accent">
                      <GiCarSeat />
                    </span>
                    <span className="text-secondary">Ghế Ngồi</span>
                  </span>
                  <span className="text-accent font-semibold flex gap-2">
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
                <button className="relative px-4 bg-gradient-to-r from-[#0a64a7] via-[#258dcf] to-[#3db1f3] bg-[length:200%_auto] text-white font-bold py-2 rounded-md hover:opacity-90 transition">
                  Tiếp Tục
                </button>
              </div>
            </div>
          </div>
          <div className="bg-primary rounded-lg w-full shadow-lg py-5">
            <div className=" text-accent text-center py-5 font-semibold">
              Thời gian còn lại
            </div>
            <div className="flex justify-center items-center">
              <div className="text-3xl font-semibold text-accent">09:59</div>
            </div>
          </div>
        </div>
      </div>

      <DialogCus
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
      >
        {dialog.message}
      </DialogCus>
    </div>
  );
};

export default ChooseSeat;
