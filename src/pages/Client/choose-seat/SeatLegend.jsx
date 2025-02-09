import React from "react";

const SeatLegend = () => {
  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-5 border border-gray-300 rounded-lg overflow-hidden divide-x divide-gray-300">
        <div className="flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1">
          <div
            className="bg-[#d1d1d1] w-5 h-5 lg:w-8 lg:h-8 text-center text-[20px]"
            style={{
              maskImage: "url('/svg/seat-vip.svg')",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          ></div>
          <span className="text-[10px] md:text-xs lg:text-sm xl:text-[11px] font-semibold text-secondary">
            Ghế Trống
          </span>
        </div>
        <div className="flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1 ">
          <div
            className="bg-[#d1d1d1] w-5 h-5 lg:w-8 lg:h-8 text-center text-[20px]"
            style={{
              maskImage: "url('/svg/seat-vip-broken.svg')",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          ></div>
          <span className="text-[10px] md:text-xs lg:text-sm xl:text-[11px] font-semibold text-secondary">
            Ghế Hỏng
          </span>
        </div>
        <div className="border-t flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1 ">
          <div
            className="bg-accent w-5 h-5 lg:w-8 lg:h-8 text-center text-[20px]"
            style={{
              maskImage: "url('/svg/seat-vip.svg')",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          ></div>
          <span className="text-[10px] md:text-xs lg:text-sm xl:text-[11px] font-semibold text-secondary">
            Ghế Đang Chọn
          </span>
        </div>
        <div className="border-t flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1 ">
          <div
            className="bg-sky-950 w-5 h-5 lg:w-8 lg:h-8 text-center text-[20px]"
            style={{
              maskImage: "url('/svg/seat-vip.svg')",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          ></div>
          <span className="text-[10px] md:text-xs lg:text-sm xl:text-[11px] font-semibold text-secondary">
            Ghế Đang Giữ
          </span>
        </div>
        <div className="col-span-2 xl:col-span-1 border-t flex justify-center items-center px-1 py-2 md:px-2 md:py-4 gap-1 ">
          <div
            className="bg-red-500 w-5 h-5 lg:w-8 lg:h-8 text-center text-[20px]"
            style={{
              maskImage: "url('/svg/seat-vip.svg')",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          ></div>
          <span className="text-[10px] md:text-xs lg:text-sm xl:text-[11px]  font-semibold text-secondary">
            Ghế Đã Bán
          </span>
        </div>
      </div>
    </>
  );
};

export default SeatLegend;
