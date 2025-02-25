import React, { useEffect, useState } from "react";
import { formatVND } from "../../../utils/Currency";

const TotalPriceSeat = ({ onSeatPrices }) => {
  const [priceSeats, setPriceSeats] = useState({
    seatRegular: {},
    seatVip: {},
    seatDouble: {},
  });

  const seats = [
    {
      id: 203,
      room_id: 2,
      type_seat_id: 2,
      coordinates_x: 9,
      coordinates_y: "I",
      name: "I9",
      is_active: true,
      created_at: "2025-01-16T14:20:30.000000Z",
      updated_at: "2025-01-16T14:20:30.000000Z",
      type_seat: {
        id: 2,
        name: "Ghế Vip",
        price: 75000,
        created_at: null,
        updated_at: null,
      },
      showtimes: [
        {
          id: 129,
          cinema_id: 1,
          room_id: 2,
          slug: "4baad58b-702a-bfed-2342-ad888a0c6aa01f95-eb7bc770-446b-7ab8-2637-1675716bf7251558",
          format: "3D Lồng Tiếng",
          movie_version_id: 4,
          movie_id: 2,
          date: "2025-02-25",
          start_time: "2025-02-25 07:00:00",
          end_time: "2025-02-25 09:13:00",
          is_active: true,
          created_at: "2025-02-24T02:17:53.000000Z",
          updated_at: "2025-02-24T02:17:53.000000Z",
          pivot: {
            seat_id: 203,
            showtime_id: 129,
            status: "hold",
            price: 125000,
            user_id: 1,
            created_at: null,
            updated_at: null,
          },
        },
      ],
    },
    {
      id: 204,
      room_id: 2,
      type_seat_id: 2,
      coordinates_x: 10,
      coordinates_y: "I",
      name: "I10",
      is_active: true,
      created_at: "2025-01-16T14:20:30.000000Z",
      updated_at: "2025-01-16T14:20:30.000000Z",
      type_seat: {
        id: 2,
        name: "Ghế Vip",
        price: 75000,
        created_at: null,
        updated_at: null,
      },
      showtimes: [
        {
          id: 129,
          cinema_id: 1,
          room_id: 2,
          slug: "4baad58b-702a-bfed-2342-ad888a0c6aa01f95-eb7bc770-446b-7ab8-2637-1675716bf7251558",
          format: "3D Lồng Tiếng",
          movie_version_id: 4,
          movie_id: 2,
          date: "2025-02-25",
          start_time: "2025-02-25 07:00:00",
          end_time: "2025-02-25 09:13:00",
          is_active: true,
          created_at: "2025-02-24T02:17:53.000000Z",
          updated_at: "2025-02-24T02:17:53.000000Z",
          pivot: {
            seat_id: 204,
            showtime_id: 129,
            status: "hold",
            price: 125000,
            user_id: 1,
            created_at: null,
            updated_at: null,
          },
        },
      ],
    },
  ];
  useEffect(() => {
    const seatData = seats.reduce(
      (acc, seat) => {
        const typeKey =
          seat.type_seat_id === 1
            ? "seatRegular"
            : seat.type_seat_id === 2
            ? "seatVip"
            : "seatDouble";

        acc[typeKey].totalPrice += seat.showtimes[0]?.pivot?.price || 0;
        acc[typeKey].quantity += 1;
        acc[typeKey].price = seat.type_seat?.price || 0;

        return acc;
      },
      {
        seatRegular: { totalPrice: 0, quantity: 0, price: 0 },
        seatVip: { totalPrice: 0, quantity: 0, price: 0 },
        seatDouble: { totalPrice: 0, quantity: 0, price: 0 },
      }
    );

    setPriceSeats(seatData);
    onSeatPrices(seatData);
  }, []);
  return (
    <>
      {priceSeats.seatRegular.quantity > 0 && (
        <div className="flex justify-between items-center text-sm md:text-base">
          <div className="font-semibold">GHẾ THƯỜNG</div>
          <p>
            {`${priceSeats.seatRegular.quantity}  x ${formatVND(
              priceSeats.seatRegular.price
            )}`}{" "}
            = <strong>{formatVND(priceSeats.seatRegular.totalPrice)}</strong>
          </p>
        </div>
      )}
      {priceSeats.seatVip.quantity > 0 && (
        <div className="flex justify-between items-center text-sm md:text-base">
          <div className="font-semibold">GHẾ VIP</div>
          <p>
            {`${priceSeats.seatVip.quantity}  x ${formatVND(
              priceSeats.seatVip.price
            )}`}{" "}
            = <strong>{formatVND(priceSeats.seatVip.totalPrice)}</strong>
          </p>
        </div>
      )}
      {priceSeats.seatDouble.quantity > 0 && (
        <div className="flex justify-between items-center text-sm md:text-base">
          <div className="font-semibold">GHẾ ĐÔI</div>
          <p>
            {`${priceSeats.seatDouble.quantity}  x ${formatVND(
              priceSeats.seatDouble.price
            )}`}{" "}
            = <strong>{formatVND(priceSeats.seatDouble.totalPrice)}</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default TotalPriceSeat;
