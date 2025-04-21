import React, { useEffect, useState } from "react";
import Disclosure from "../../../Components/Common/Disclosure";
import { ArrowBigRight } from "lucide-react";

const PaymentMethod = ({ paymentMethod }) => {
  const paymentMethods = [
    {
      id: "VNPAY",
      label: "Ví VNPay",
      img: "/images/payment/vnpay.png",
    },
    // {
    //   id: "MOMO",
    //   label: "Ví MoMo",
    //   img: "/images/payment/momo.png",
    // },
    {
      id: "ZALOPAY",
      label: "Ví ZaloPay",
      img: "/images/payment/zalopay.png",
    },
  ];

  const [selectedPayment, setSelectedPayment] = useState("VNPAY");

  useEffect(() => {
    paymentMethod(selectedPayment);
  }, [selectedPayment]);

  return (
    <>
      {" "}
      <h2 className="text-sm lg:text-lg font-semibold flex items-center gap-2">
        <span>
          <img
            className="w-8 h-6 lg:w-12 lg:h-8"
            src="/images/discount.png"
            alt="img_discount"
          />
        </span>
        Chọn Phương Thức Thanh Toán
      </h2>
      <Disclosure
        defaultOpen={true}
        title={
          <div className="flex items-center gap-2">
            <ArrowBigRight className="w-7 h-7 " />
            <span className="text-sm lg:text-lg font-semibold">
              BeeCinema Phương Thức Thanh Toán
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-lg">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={() => setSelectedPayment(method.id)}
                className="hidden"
              />
              <div
                className={`w-4 h-4 lg:w-5 lg:h-5 border-2 border-gray-600 rounded-full flex items-center justify-center`}
              >
                {selectedPayment === method.id && (
                  <div
                    className={`w-2.5 h-2.5 rounded-full  ${
                      selectedPayment === method.id
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white"
                    }`}
                  ></div>
                )}
              </div>
              <div className="flex-1 flex items-center gap-2">
                <img
                  src={method.img}
                  alt={method.label}
                  className="w-6 h-6 lg:w-8 lg:h-8"
                />
                <span className="text-xs font-semibold">{method.label}</span>
              </div>
            </label>
          ))}
        </div>
      </Disclosure>
    </>
  );
};

export default PaymentMethod;
