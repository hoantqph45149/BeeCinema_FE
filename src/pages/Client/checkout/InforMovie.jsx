import React from "react";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { GiCarSeat } from "react-icons/gi";
import { MdDiscount, MdOutlineMeetingRoom } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import Button from "../../../Components/Common/Button";

const InforMovie = () => {
  return (
    <>
      {" "}
      <div className="flex flex-col gap-5 ">
        <div className="bg-primary rounded-lg shadow-lg overflow-hidden">
          <div className="bg-accent text-primary text-center py-2 font-semibold">
            Thông tin phim
          </div>
          <div>
            <div className="flex justify-between py-5 gap-2">
              <img
                src={
                  "https://files.betacorp.vn/media/images/2025/01/09/beta-400x633-134909-090125-38.png"
                }
                alt={"movie.name"}
                className="w-36 mb-4"
              />
              <div className="flex-1 flex flex-col gap-3 font-lato">
                <h2 className="text-lg font-semibold text-accent">
                  Captain America: Thế Giới Mới
                </h2>
                <p className="text-secondary text-sm">2D Phụ đề</p>
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
                  Khoa học, viễn tưởng
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span className="text-accent">
                    <FaRegClock />
                  </span>
                  <span className="text-scondary">Thời lượng</span>
                </span>
                <span className="text-accent font-semibold">118 phút</span>
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
                  Beta Thái Nguyên
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span className="text-accent">
                    <FaCalendarAlt />
                  </span>
                  <span className="text-secondary">Ngày chiếu</span>
                </span>
                <span className="text-accent font-semibold">24/02/2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span className="text-accent">
                    <FaRegClock />
                  </span>
                  <span className="text-secondary">Giờ chiếu</span>
                </span>
                <span className="text-accent font-semibold">11:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span className="text-accent">
                    <MdOutlineMeetingRoom />
                  </span>
                  <span className="text-secondary">Phòng chiếu</span>
                </span>
                <span className="text-accent font-semibold">P2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <span className="text-accent">
                    <GiCarSeat />
                  </span>
                  <span className="text-secondary">Ghế Ngồi</span>
                </span>
                <span className="text-accent font-semibold flex gap-2">
                  D2, D1
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5">
              <Button onClick={() => {}} className="w-1/2">
                Quay lại
              </Button>
              <Button className="w-1/2">Tiếp Tục</Button>
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
    </>
  );
};

export default InforMovie;
