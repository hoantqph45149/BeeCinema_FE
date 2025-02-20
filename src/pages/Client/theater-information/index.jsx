import React, { useEffect, useState } from "react";
import MovieCard from "../../../Components/Common/MovieCard";
import TabMovies from "../../../Components/Common/TabMovies";

const TheaterInformation = () => {
  return (
    <>
      <div className="container grid grid-cols-2 gap-4">
        {/* Cột 1  */}
        <div className="col-span-1 ">
          <div className="max-w-sm p-4 font-sans">
            <h1 className="text-[24px] font-bold mb-2 text-[#1c2b33]">
              Beta Thái Nguyên
            </h1>
            <div className="flex items-center gap-2">
              <button className="bg-[#1877f2] text-white px-2 py-1 rounded-md font-semibold text-sm hover:bg-[#166fe5] transition-colors">
                Like
              </button>
              <button className="bg-[#1877f2] text-white px-2 py-1 rounded-md font-semibold text-sm hover:bg-[#166fe5] transition-colors">
                Share
              </button>
              <span className="text-[#65676b] text-[12px] text-sm">
                7 people like this. Be the first of your friends.
              </span>
            </div>
          </div>
          <div className="w-full">
            <img
              src="./images/theater1.jpeg"
              alt="Hình ảnh minh họa"
              className="mt-10 w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="mt-10">
           <p className="text-gray-600 mb-4">Beta Cinemas Thái Nguyên có vị trí trung tâm, tọa lạc tại Hoàng Gia Plaza. Rạp tự hào là rạp phim tư nhân duy nhất và đầu tiên sở hữu hệ thống phòng chiếu phim đạt chuẩn Hollywood tại TP. Thái Nguyên. </p>

           <p className="text-gray-600 mb-4" >Rạp được trang bị hệ thống máy chiếu, phòng chiếu hiện đại với 100% nhập khẩu từ nước ngoài, với 4 phòng chiếu tương được 535 ghế ngồi. Hệ thống âm thanh Dolby 7.1 và hệ thống cách âm chuẩn quốc tế đảm bảo chất lượng âm thanh sống động nhất cho từng thước phim bom tấn. </p>

           <p className="text-gray-600 mb-5">Mức giá xem phim tại Beta Cinemas Thái Nguyên rất cạnh tranh: giá vé 2D chỉ từ 40.000 VNĐ và giá vé 3D chỉ từ 60.000 VNĐ. Không chỉ có vậy, rạp còn có nhiều chương trình khuyến mại, ưu đãi hàng tuần như đồng giá vé 40.000 vào các ngày Thứ 3 vui vẻ, Thứ 4 Beta's Day, đồng giá vé cho Học sinh sinh viên, người cao tuổi, trẻ em..... </p>

           <p className="text-gray-600 mb-5">Thông tin liên hệ</p>
           <p className="text-gray-600 mb-5">Rạp Beta Cinema Thái Nguyên</p>
              <p className="text-gray-600 mb-5 font-bold">Địa chỉ: Tầng 3, TTTM Hoàng Gia Plaza, P. Quang Trung, TP. Thái Nguyên</p>
          <p className="font-bold mb-4">Hotline : 012356789</p>
          <p className="text-gray-600 mb-5">
          Mua phiếu quà tặng, mua vé số lượng lớn, đặt phòng chiếu tổ chức hội nghị, trưng bày quảng cáo: Liên hệ với Hotline 0867 460 053  để được hưởng ưu đãi tốt nhất bạn nhé!
          </p>
          </div>
        </div>
        {/* Cột 2  */}
        <div className="col-span-1">
          <h1 className="text-[24px] font-bold mb-2 text-[#1c2b33] mt-6 font-sans text-center">
            PHIM ĐANG HOT
          </h1>
        </div>
      </div>
    </>
  );
};

export default TheaterInformation;
