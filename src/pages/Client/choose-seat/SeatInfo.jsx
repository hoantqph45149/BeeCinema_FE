import React from "react";

const SeatInfo = ({ totalAmount }) => {
  return (
    <>
      <div className="grid grid-cols-3 xl:grid-cols-5 border border-gray-300 rounded-lg overflow-hidden divide-x divide-gray-300">
        <div className="flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1">
          <img
            src="/svg/seat-regular.svg"
            alt=""
            className="md:w-7 md:h-7 lg:w-8 lg:h-8"
          />
          <span className="text-[10px] md:text-xs lg:text-sm font-semibold text-secondary">
            Ghế Thường
          </span>
        </div>
        <div className="flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1 lg:gap-3">
          <img
            src="/svg/seat-vip.svg"
            alt=""
            className="md:w-7 md:h-7 lg:w-8 lg:h-8"
          />
          <span className="text-[10px] md:text-xs lg:text-sm font-semibold text-secondary">
            Ghế Vip
          </span>
        </div>
        <div className="flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1 lg:gap-3">
          <img
            src="/svg/seat-double.svg"
            alt=""
            className="md:w-14 md:h-14 lg:w-16 lg:h-16  xl:w-14 xl:h-14"
          />
          <span className="text-[10px] md:text-xs lg:text-sm font-semibold text-secondary">
            Ghế Đôi
          </span>
        </div>
        <div className="col-span-4 xl:col-span-2 border-t flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1 text-[10px] md:text-base lg:text-lg font-semibold text-secondary">
          <span> Tổng tiền:</span>
          <span>{totalAmount.toLocaleString("vi-VN")} VND</span>
        </div>
      </div>
    </>
  );
};

export default SeatInfo;
