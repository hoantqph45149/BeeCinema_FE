import React from "react";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { GiCarSeat } from "react-icons/gi";
import { MdDiscount, MdOutlineMeetingRoom } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { replateName } from "../../../utils/ReplateName";
import Button from "../../../Components/Common/Button";
import dayjs from "dayjs";

const MovieInfo = ({ movie, showtimeData, selectedSeats, handleCheckOut }) => {
  return (
    <>
      {" "}
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
            <Button onClick={handleCheckOut} className="!w-[100px]">
              Tiếp Tục
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
