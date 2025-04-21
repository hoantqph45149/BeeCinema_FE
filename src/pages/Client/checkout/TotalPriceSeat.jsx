import React, { useEffect, useState } from "react";
import { formatVND } from "../../../utils/Currency";

const TotalPriceSeat = ({ holdSeats, onSeatPrices }) => {
  const [priceSeats, setPriceSeats] = useState({
    seatRegular: {},
    seatVip: {},
    seatDouble: {},
  });
  const seats =
    holdSeats?.map((seat) => ({
      ...seat.seat,
      price: seat.price,
    })) || [];

  useEffect(() => {
    const seatData = seats?.reduce(
      (acc, seat) => {
        const typeKey =
          seat.type_seat_id === 1
            ? "seatRegular"
            : seat.type_seat_id === 2
            ? "seatVip"
            : "seatDouble";

        // Kiểm tra tồn tại trước
        acc[typeKey].totalPrice += seat.price || 0;
        acc[typeKey].quantity += 1;
        acc[typeKey].price = seat.price || 0;

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
  }, [holdSeats]);

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
