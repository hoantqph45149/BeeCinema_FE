import React, { useEffect, useState } from "react";
import Disclosure from "../../../Components/Common/Disclosure";
import { ArrowBigRight, Check, Clipboard } from "lucide-react";
import { formatVND } from "../../../utils/Currency";
import Button from "../../../Components/Common/Button";
import { useFetch } from "../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import dayjs from "dayjs";
import { showAlert } from "../../../Components/Common/showAlert";

const Discount = ({ handleCalculatePoint, selectedVoucher }) => {
  const { authUser } = useAuthContext();
  const { data: vouchers } = useFetch(["voucherUser"], "/user/vouchers");
  const { data: membership } = useFetch(["membership"], "/user/membership");

  console.log("vouchers", vouchers);
  console.log("membership", membership);

  const [selectVoucher, setSelectVoucher] = useState(null);
  const [points, setPoints] = useState("");
  const currentPoints = membership?.points ?? 0;
  const conversionRate = 1 / 2;
  const [isPointConverted, setIsPointConverted] = useState(false);

  const handleExchangePoints = () => {
    if (points > 0) {
      handleCalculatePoint(points * conversionRate, isPointConverted);
      setIsPointConverted(true);
    }
  };

  const handleCancelExchange = () => {
    setPoints("");
    handleCalculatePoint(points * conversionRate, isPointConverted);
    setIsPointConverted(false);
  };

  const handleSelectVoucher = (voucher) => {
    const now = dayjs();
    const startTime = dayjs(voucher.start_date_time);
    const endTime = dayjs(voucher.end_date_time);

    if (startTime.isAfter(now)) {
      showAlert("", "Voucher chưa có hiệu lực!", "warning");
      return;
    }

    if (endTime.isBefore(now)) {
      showAlert("", "Voucher đã hết hạn!", "warning");
      return;
    }
    selectedVoucher(voucher);
    setSelectVoucher((prev) => (prev?.id === voucher.id ? null : voucher));
  };

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10) || "";
    if (value > currentPoints) value = currentPoints;
    if (value < 0) value = "";
    setPoints(value);
  };

  return (
    <>
      {" "}
      <h2 className="text-sm md:text-lg font-semibold flex items-center gap-2">
        <span>
          <img
            className="w-7 h-5 md:w-12 md:h-8"
            src="/images/discount.png"
            alt="img_discount"
          />
        </span>{" "}
        Giảm giá{" "}
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        <Disclosure
          title={
            <div className="flex items-center gap-2">
              <ArrowBigRight className="w-5 h-5 md:w-7 md:h-7" />
              <span className="text-sm md:text-lg font-semibold">
                BeeCinema Voucher
              </span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vouchers?.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 border rounded-lg shadow-sm bg-gray-100 cursor-pointer ${
                  item.id == selectVoucher?.id ? "bg-primary" : ""
                }`}
                onClick={() => handleSelectVoucher(item)}
              >
                <div className="md:text-left">
                  <p className="md:text-lg font-bold text-accent">
                    {`${item.title} giảm ${
                      item.type == "percent"
                        ? `${item.discount}%`
                        : `${formatVND(item.discount)}`
                    } `}
                  </p>
                  <p className="md:text-lg font-bold text-accent"></p>
                  <p className="text-sm text-secondary font-medium">{`${dayjs(
                    item.start_date_time
                  ).format("HH:mm/DD/MM/YYYY")} - ${dayjs(
                    item.end_date_time
                  ).format("HH:mm/DD/MM/YYYY")}`}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <button className="p-2 bg-accent text-primary rounded-md hover:bg-accent/50 transition">
                    {item.id == selectVoucher?.id ? (
                      <Check size={16} />
                    ) : (
                      <Clipboard size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Disclosure>

        <Disclosure
          title={
            <div className="flex items-center gap-2">
              <ArrowBigRight className="w-5 h-5 md:w-7 md:h-7" />
              <span className="text-sm md:text-lg font-semibold">
                BeeCinema Đổi Điểm
              </span>
            </div>
          }
        >
          <div className="flex flex-col lg:flex-row ld:items-center gap-4 lg:gap-8 font-semibold">
            <div className="text-sm lg:text-base">
              <p>Điểm hiện có:</p>
              <p className="font-semibold">{currentPoints}</p>
            </div>

            {/* Nhập số điểm muốn đổi */}
            <div className="text-sm lg:text-base">
              <p>Nhập số điểm đổi:</p>
              <input
                type="number"
                className="outline-none border focus:border-accent rounded p-1"
                value={points}
                onChange={handleChange}
              />
            </div>

            <div className="text-sm lg:text-base">
              <p>Số Tiền được giảm:</p>
              <p className="font-semibold">
                {formatVND(points * conversionRate)}
              </p>
            </div>

            <div>
              <Button
                onClick={
                  isPointConverted ? handleCancelExchange : handleExchangePoints
                }
                disabled={points === 0}
              >
                {isPointConverted ? "Hủy điểm" : "Đổi điểm"}
              </Button>
            </div>
          </div>
        </Disclosure>
      </div>
    </>
  );
};

export default Discount;
