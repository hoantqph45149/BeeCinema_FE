import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiCarSeat } from "react-icons/gi";
import { MdDiscount, MdOutlineMeetingRoom } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Button from "../../../Components/Common/Button";
import CountDown from "./CountDown";
import dayjs from "dayjs";

const InforMovie = ({ holdSeats, time, slug, showtime, onCheckout }) => {
  const nav = useNavigate();

  return (
    <>
      {" "}
      <div className="flex flex-col gap-5 ">
        <div className="bg-primary rounded-lg shadow-lg overflow-hidden">
          <div className="bg-accent text-sm lg:text-base text-primary text-center py-2 font-semibold">
            Thông tin phim
          </div>
          <div>
            <div className="flex justify-between py-5 gap-2">
              <img
                src={showtime?.movie?.img_thumbnail}
                alt={showtime?.movie?.name}
                className="w-36 mb-4"
              />
              <div className="flex-1 flex flex-col gap-3 font-lato">
                <h2 className="lg:text-lg font-semibold text-accent">
                  {showtime?.movie?.name}
                </h2>
                <p className="text-secondary text-xs lg:text-sm">
                  {showtime?.format}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2 px-4 text-sm lg:text-base">
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span className="text-accent">
                    <MdDiscount />
                  </span>
                  <span className="text-secondary">Thể loại</span>
                </span>
                <span className="text-accent font-semibold">
                  {showtime?.movie?.category}
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
                  {showtime?.movie?.duration} phút
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
                  Beta {showtime?.room?.cinema?.name}
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
                  {showtime?.date}
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
                  {" "}
                  {dayjs(showtime?.start_time).format("HH:mm")}
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
                  {showtime?.room?.name}
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
                  {holdSeats?.map((seat) => (
                    <span key={seat.id}>{seat.name}</span>
                  ))}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5">
              <Button
                onClick={() => nav(`/choose-seat/${slug}`)}
                className="w-1/2"
              >
                Quay lại
              </Button>
              <Button onClick={onCheckout} className="w-1/2">
                Tiếp Tục
              </Button>
            </div>
          </div>
        </div>
        <CountDown seats={holdSeats} time={time} />
      </div>
    </>
  );
};

export default InforMovie;
