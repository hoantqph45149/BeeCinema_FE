import React, { useEffect, useState } from "react";
import Disclosure from "../../../Components/Common/Disclosure";
import { ArrowBigRight, Check, Clipboard } from "lucide-react";
import { formatVND } from "../../../utils/Currency";
import Button from "../../../Components/Common/Button";

const Discount = ({ handleCalculatePoint }) => {
  const vouchers = [
    {
      id: 1,
      code: "SALE50",
      discount: "Giảm 50%",
      condition: "Cho đơn từ 500K",
    },
    {
      id: 2,
      code: "FREESHIP",
      discount: "Miễn phí vận chuyển",
      condition: "Cho đơn từ 200K",
    },
    {
      id: 3,
      code: "NEW10",
      discount: "Giảm 10%",
      condition: "Cho khách hàng mới",
    },
    {
      id: 4,
      code: "SUMMER20",
      discount: "Giảm 20%",
      condition: "Cho đơn từ 1 triệu",
    },
    {
      id: 5,
      code: "VIP100",
      discount: "Giảm 100K",
      condition: "Chỉ áp dụng cho thành viên VIP",
    },
  ];

  const [selectVoucher, setSelectVoucher] = useState({});
  const [points, setPoints] = useState("");
  const currentPoints = 5000;
  const conversionRate = 1 / 2;

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
            {vouchers.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 border rounded-lg shadow-sm bg-gray-100 cursor-pointer ${
                  item.id == selectVoucher.id ? "bg-primary" : ""
                }`}
                onClick={() => setSelectVoucher(item)}
              >
                <div className="md:text-left">
                  <p className="md:text-lg font-bold text-accent">
                    {item.discount}
                  </p>
                  <p className="text-sm text-secondary">{item.condition}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <button className="p-2 bg-accent text-primary rounded-md hover:bg-accent/50 transition">
                    {item.id == selectVoucher.id ? (
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
                onClick={() => handleCalculatePoint(points * conversionRate)}
                disabled={points === 0}
              >
                Đổi điểm
              </Button>
            </div>
          </div>
        </Disclosure>
      </div>
    </>
  );
};

export default Discount;
