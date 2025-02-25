import React, { useEffect, useState } from "react";
import { formatVND } from "./../../../utils/Currency";
import Combo from "./Combo";
import Discount from "./Discount";
import InforMovie from "./InforMovie";
import PaymentMethod from "./PaymentMethod";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import TotalPriceSeat from "./TotalPriceSeat";
const Checkout = () => {
  const { authUser } = useAuthContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  const [totalpayment, setTotalPayment] = useState(0);
  const handleCalculateTotalPriceSeat = (data) => {
    const { seatRegular, seatVip, seatDouble } = data;
    const totalPrice =
      seatRegular.totalPrice + seatVip.totalPrice + seatDouble.totalPrice;
    setTotalAmount(totalPrice);
    setTotalPayment(totalPrice);
  };

  const handleCalculatePriceVoucher = (price, type) => {
    let discount = 0;

    if (type === "voucher") {
      discount = totalAmount * (price / 100);
    } else if (type === "fixed") {
      discount = price;
    }

    const newTotalPayment = Math.max(totalAmount - discount, 0);

    setPriceDiscount(discount);
    setTotalPayment(newTotalPayment);
  };

  const handleCalculatePriceCombo = (price, isAdding) => {
    console.log(price, isAdding);
    const newTotalAmount = isAdding
      ? totalAmount + price
      : Math.max(totalAmount - price, 0);
    const newTotalPayment = Math.max(newTotalAmount - priceDiscount, 0);
    setTotalAmount(newTotalAmount);
    setTotalPayment(newTotalPayment);
  };

  const handleCalculatePoint = (price) => {
    const newTotalPayment = Math.max(totalAmount - price, 0);
    setTotalPayment(newTotalPayment);
    setPriceDiscount(price);
  };
  return (
    <div className="container grid grid-cols-1 md:grid-cols-6 gap-8 my-10 text-secondary">
      <div className="col-span-6 lg:col-span-4 divide-y-2">
        <div className="pb-4">
          <h2 className="text-sm md:text-lg font-semibold flex items-center gap-2 pb-4">
            <span>
              <img
                className="w-6 h-6 md:w-10 md:h-10"
                src="/images/user.png"
                alt="user"
              />
            </span>{" "}
            THÔNG TIN THANH TOÁN
          </h2>
          <div className="flex flex-col gap-4 md:flex-row md:items-center lg:gap-10 xl:gap-28 justify-start">
            <p className="text-xs md:text-base">
              <strong className="text-sm md:text-base">Họ Tên:</strong> <br />{" "}
              {authUser.user.name}
            </p>
            <p className="text-xs md:text-base">
              <strong className="text-sm">Số điện thoại:</strong> <br />{" "}
              {authUser.user.phone}
            </p>
            <p className="text-xs md:text-base">
              <strong className="text-sm md:text-base">Email:</strong> <br />{" "}
              {authUser.user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-4">
          <TotalPriceSeat onSeatPrices={handleCalculateTotalPriceSeat} />
        </div>

        <div className="py-4">
          <Combo handleCalculatePriceCombo={handleCalculatePriceCombo} />
        </div>

        <div className="py-4">
          <Discount handleCalculatePoint={handleCalculatePoint} />
        </div>
        <div className="py-4">
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <h4>Tổng Tiền: </h4>
              <h2 className="lg:text-xl font-semibold ">
                {formatVND(totalAmount)}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm md:text-base">
              <h4>Số Tiền Được Giảm: </h4>
              <h2 className="lg:text-xl font-semibold ">
                {formatVND(priceDiscount)}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm md:text-base">
              <h4>Số Tiền Cần Thanh Toán: </h4>
              <h2 className="lg:text-xl font-semibold">
                {formatVND(totalpayment)}
              </h2>
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-4">
          <PaymentMethod />
        </div>
      </div>
      <div className="col-span-6 lg:col-span-2">
        <InforMovie />
      </div>
    </div>
  );
};

export default Checkout;
