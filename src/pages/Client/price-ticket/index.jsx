import React from "react";
import { useFetch } from "../../../Hooks/useCRUD";
import { useBrancheContext } from "../../../Contexts/branche/UseBrancheContext";
import Loading from "./../../../Components/Common/Loading";

const PriceTicket = () => {
  const { cinema } = useBrancheContext();

  const { data, loading: loadingPriceTicket } = useFetch(
    ["price-ticket", cinema?.id],
    `/price-rules/cinema/${cinema?.id}`
  );

  if (!data || loadingPriceTicket)
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );

  // Chuyển đổi dữ liệu
  const formatData = (seats) => {
    const groupedBySeat = {};
    seats.forEach((seat) => {
      const { seat_name, day_type, time_slot, price } = seat;
      if (!groupedBySeat[seat_name]) {
        groupedBySeat[seat_name] = {
          Weekday: { Morning: null, Evening: null },
          Weekend: { Morning: null, Evening: null },
          Holiday: { AllDay: null },
        };
      }
      if (day_type === "Holiday") {
        groupedBySeat[seat_name][day_type]["AllDay"] = price;
      } else {
        groupedBySeat[seat_name][day_type][time_slot] = price;
      }
    });

    return {
      Weekday: [
        {
          seatName: "Ghế thường",
          morning: groupedBySeat["Ghế thường"]?.Weekday.Morning,
          evening: groupedBySeat["Ghế thường"]?.Weekday.Evening,
        },
        {
          seatName: "Ghế vip",
          morning: groupedBySeat["Ghế vip"]?.Weekday.Morning,
          evening: groupedBySeat["Ghế vip"]?.Weekday.Evening,
        },
        {
          seatName: "Ghế đôi",
          morning: groupedBySeat["Ghế đôi"]?.Weekday.Morning,
          evening: groupedBySeat["Ghế đôi"]?.Weekday.Evening,
        },
      ],
      Weekend: [
        {
          seatName: "Ghế thường",
          morning: groupedBySeat["Ghế thường"]?.Weekend.Morning,
          evening: groupedBySeat["Ghế thường"]?.Weekend.Evening,
        },
        {
          seatName: "Ghế vip",
          morning: groupedBySeat["Ghế vip"]?.Weekend.Morning,
          evening: groupedBySeat["Ghế vip"]?.Weekend.Evening,
        },
        {
          seatName: "Ghế đôi",
          morning: groupedBySeat["Ghế đôi"]?.Weekend.Morning,
          evening: groupedBySeat["Ghế đôi"]?.Weekend.Evening,
        },
      ],
      Holiday: [
        {
          seatName: "Ghế thường",
          allDay: groupedBySeat["Ghế thường"]?.Holiday.AllDay,
        },
        {
          seatName: "Ghế vip",
          allDay: groupedBySeat["Ghế vip"]?.Holiday.AllDay,
        },
        {
          seatName: "Ghế đôi",
          allDay: groupedBySeat["Ghế đôi"]?.Holiday.AllDay,
        },
      ],
    };
  };

  // Hàm định dạng giá
  const formatPrice = (price) =>
    price ? Number(price).toLocaleString("vi-VN") : "-";

  // Hàm render bảng giá vé
  const renderTable = (title, label, formattedData) => (
    <div className="mb-10 bg-gradient-to-br from-accent to-accent/50 text-white shadow-2xl border-none relative overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-blue-300/20 rounded-xl">
      <div className="absolute -left-2 -top-4 w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center rotate-12">
        <span className="text-5xl font-extrabold text-white drop-shadow-md">
          {label}
        </span>
      </div>
      <div className="pt-8 pb-4 pl-20 md:pl-24">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="pb-6 px-6">
        <div className="rounded-lg overflow-hidden border border-accent/30">
          <table className="w-full text-white">
            <thead className="bg-accent">
              <tr>
                <th className="text-lg font-bold w-1/4 p-4 text-left">NGÀY</th>
                <th className="text-lg font-bold w-1/4 p-4 text-center">
                  LOẠI GHẾ
                </th>
                <th className="text-lg font-bold w-1/4 p-4 text-center">
                  7h - 18h
                </th>
                <th className="text-lg font-bold w-1/4 p-4 text-center">
                  18h - 22h
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Weekday */}
              {formattedData.Weekday.map((seat, idx) => (
                <tr
                  key={`weekday-${idx}`}
                  className="hover:bg-accent/50 transition-colors"
                >
                  {idx === 0 && (
                    <td rowSpan={3} className="p-4 font-medium align-top">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded-md text-sm font-bold inline-block shadow-sm">
                        BETA TEN
                      </div>
                      <div className="mt-1 font-semibold">
                        THỨ 2, 3, 4, 5, 6
                      </div>
                    </td>
                  )}
                  <td className="p-4 text-center font-medium">
                    {seat.seatName}
                  </td>
                  <td className="p-4 text-center text-xl font-bold">
                    {formatPrice(seat.morning)}
                  </td>
                  <td className="p-4 text-center text-xl font-bold">
                    {formatPrice(seat.evening)}
                  </td>
                </tr>
              ))}
              {/* Weekend */}
              {formattedData.Weekend.map((seat, idx) => (
                <tr
                  key={`weekend-${idx}`}
                  className="hover:bg-accent/50 transition-colors"
                >
                  {idx === 0 && (
                    <td rowSpan={3} className="p-4 font-medium align-top">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded-md text-sm font-bold inline-block shadow-sm">
                        HAPPY DAY
                      </div>
                      <div className="mt-1 font-semibold">THỨ 7, CN</div>
                    </td>
                  )}
                  <td className="p-4 text-center font-medium">
                    {seat.seatName}
                  </td>
                  <td className="p-4 text-center text-xl font-bold">
                    {formatPrice(seat.morning)}
                  </td>
                  <td className="p-4 text-center text-xl font-bold">
                    {formatPrice(seat.evening)}
                  </td>
                </tr>
              ))}
              {/* Holiday */}
              {formattedData.Holiday.map((seat, idx) => (
                <tr
                  key={`holiday-${idx}`}
                  className="hover:bg-accent/50 transition-colors"
                >
                  {idx === 0 && (
                    <td rowSpan={3} className="p-4 font-medium align-top">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded-md text-sm font-bold inline-block shadow-sm">
                        NGÀY LỄ
                      </div>
                      <div className="mt-1 font-semibold"></div>
                    </td>
                  )}
                  <td className="p-4 text-center font-medium">
                    {seat.seatName}
                  </td>
                  <td colSpan={2} className="p-4 text-center text-xl font-bold">
                    {formatPrice(seat.allDay)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 bg-accent p-4 rounded-lg shadow ">
          <h2 className="text-xl font-semibold mb-2">Lưu ý:</h2>
          <ul className="list-disc pl-5 space-y-1 ">
            <li>
              Giá vé có thể thay đổi theo từng thời điểm mà không báo trước
            </li>
            <li>Trẻ em dưới 1m được miễn phí vé nhưng không có ghế riêng</li>
            <li>Ghế đôi dành cho 2 người ngồi</li>
            <li>
              Khung giờ buổi sáng: từ 7:00 - 18:00, buổi tối: từ 18:00 - 23:59
            </li>
            <li>Ngày lễ áp dụng theo quy định của Nhà nước</li>
          </ul>
        </div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-blue-400 opacity-30 rounded-sm rotate-12"></div>
        <div className="absolute bottom-12 right-12 w-6 h-6 bg-pink-400 opacity-30 rounded-sm rotate-45"></div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl relative">
      <div className="absolute top-10 -left-40 w-40 h-40 bg-blue-400 opacity-20 rounded-full animate-float"></div>
      <div className="absolute top-40 -right-10 w-32 h-32 bg-pink-400 opacity-20 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-20 -left-10 w-24 h-24 bg-yellow-400 opacity-20 rounded-full animate-float"></div>
      <div className="absolute bottom-0 -right-52 w-36 h-36 bg-green-400 opacity-20 rounded-full animate-float-slow"></div>
      <div className="absolute top-20 left-20 w-28 h-28 bg-purple-400 opacity-15 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-orange-400 opacity-25 rounded-sm rotate-45 animate-float"></div>
      <div className="absolute top-60 -left-20 w-16 h-16 bg-red-400 opacity-20 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-10 right-20 w-24 h-24 bg-teal-400 opacity-15 rounded-full animate-spin-slow"></div>

      {/* Các yếu tố trang trí mới */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-400 opacity-15 rounded-full animate-pulse"></div>
      <div className="absolute top-80 right-0 w-28 h-28 bg-amber-400 opacity-20 rounded-sm rotate-45 animate-drift"></div>
      <div className="absolute bottom-60 -left-30 w-20 h-20 bg-cyan-400 opacity-25 rounded-full animate-blink"></div>
      <div className="absolute top-50 right-40 w-16 h-16 bg-lime-400 opacity-15 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-30 left-10 w-24 h-24 bg-violet-400 opacity-20 rounded-full animate-spin-slow"></div>
      <div className="absolute top-30 -right-20 w-18 h-18 bg-rose-400 opacity-18 rounded-sm rotate-30 animate-pulse"></div>
      <div className="absolute bottom-80 left-50 w-22 h-22 bg-emerald-400 opacity-22 rounded-full animate-drift"></div>
      <div className="absolute top-70 -left-10 w-26 h-26 bg-fuchsia-400 opacity-17 rounded-full animate-blink"></div>
      <div className="absolute bottom-50 right-30 w-30 h-30 bg-sky-400 opacity-20 rounded-sm rotate-60 animate-float"></div>
      <div className="absolute top-90 left-60 w-14 h-14 bg-pink-300 opacity-15 rounded-full animate-spin-slow"></div>

      {data?.data?.map((room) => (
        <div key={room.room_name}>
          {renderTable(
            `BẢNG GIÁ VÉ ${room.room_name} - ${room.cinema_name}`,
            room.room_name,
            formatData(room.seats)
          )}
        </div>
      ))}
    </div>
  );
};

export default PriceTicket;
