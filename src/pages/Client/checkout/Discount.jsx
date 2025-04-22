import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowBigRight, Check, Clipboard } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../../Components/Common/Button";
import Disclosure from "../../../Components/Common/Disclosure";
import { showAlert } from "../../../Components/Common/showAlert";
import { useFetch } from "../../../Hooks/useCRUD";
import api from "../../../apis/axios";
import { formatVND } from "../../../utils/Currency";

const Discount = ({
  handleCalculatePoint,
  setSelectVoucher,
  setPriceDiscountVoucher,
  membership,
  totalAmount,
  setTotalPayment,
  setPriceDiscount,
  slug,
  dataPoint,
}) => {
  const { data: vouchers } = useFetch(["voucherUser"], "/user/vouchers");

  const queryClient = useQueryClient();
  const [clickVoucher, setClickVoucher] = useState(null);
  const location = useLocation();
  const [points, setPoints] = useState("");
  const currentPoints = dataPoint ?? 0;
  const conversionRate = 1;
  const [isPointConverted, setIsPointConverted] = useState(false);

  useEffect(() => {
    if (clickVoucher) {
      sessionStorage.setItem("clickVoucher", JSON.stringify(clickVoucher));
    }
  }, [clickVoucher]);

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation")[0];

    if (navigationEntry && navigationEntry.type === "reload") {
      const storedVoucher = sessionStorage.getItem("clickVoucher");
      if (storedVoucher) {
        const parsedVoucher = JSON.parse(storedVoucher);
        api
          .post("/vouchers/remove-voucher", {
            voucher_code: parsedVoucher?.code,
            total_amount: 0,
          })
          .then(() => {
            sessionStorage.removeItem("clickVoucher");
            queryClient.invalidateQueries(["voucherUser"]);
          });
      }
    }
  }, []);

  useEffect(() => {
    const handleRemoveVoucher = async () => {
      const storedVoucher = sessionStorage.getItem("clickVoucher");
      if (storedVoucher) {
        const parsedVoucher = JSON.parse(storedVoucher);
        await api.post("/vouchers/remove-voucher", {
          voucher_code: parsedVoucher?.code,
          total_amount: 0,
        });

        setClickVoucher(null);
      }
    };

    return () => {
      const newPath = window.location.pathname;
      if (newPath !== `/checkout/${slug}`) {
        handleRemoveVoucher();
        sessionStorage.removeItem("clickVoucher");
      }
    };
  }, [location]);

  useEffect(() => {
    setSelectVoucher(clickVoucher);
  }, [clickVoucher]);

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

  const handleSelectVoucher = async (voucher) => {
    try {
      let updatedTotal = totalAmount;

      // Nếu chọn lại voucher đang áp dụng => Remove nó
      if (clickVoucher?.code === voucher.code) {
        const res = await api.post("/vouchers/remove-voucher", {
          voucher_code: voucher.code,
          total_amount: totalAmount,
        });

        if (res.data.success) {
          setPriceDiscount((prev) => prev - res.data.discount_applied);
          setTotalPayment(res.data.discounted_amount);
          setPriceDiscountVoucher(0);
          setClickVoucher(null);
        } else {
          console.error("Lỗi khi gỡ voucher:", res.data.message);
        }
        return;
      }

      // Nếu đã có voucher trước đó, cần remove nó trước
      if (clickVoucher) {
        const resRemove = await api.post("/vouchers/remove-voucher", {
          voucher_code: clickVoucher.code,
          total_amount: totalAmount,
        });

        if (!resRemove.data.success) {
          return;
        }
        setPriceDiscount((prev) => prev - resRemove.data.discount_applied);
        setTotalPayment(resRemove.data.discounted_amount);
        setPriceDiscountVoucher(0);

        // Cập nhật total mới ngay sau khi remove voucher cũ
        updatedTotal = resRemove.data.discounted_amount;
      }

      // Apply voucher mới với totalAmount đã cập nhật
      const resApply = await api.post("/vouchers/apply-voucher", {
        voucher_code: voucher.code,
        total_amount: updatedTotal, // Dùng totalAmount đã cập nhật
      });

      if (resApply.data.success) {
        setPriceDiscount((prev) => prev + resApply.data.discount_value);
        setTotalPayment(resApply.data.discounted_amount);
        setPriceDiscountVoucher(resApply.data.discount_value);
        setClickVoucher(voucher);
      } else {
        console.error("Lỗi khi áp voucher:", resApply.data.message);
      }
    } catch (error) {
      if (error.response) {
        showAlert("Thất Bại", error.response.data.message, "error");
        setClickVoucher(null);
      } else {
        console.error("Lỗi mạng hoặc request bị hủy");
      }
    }
  };

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10) || "";
    if (value > currentPoints) value = currentPoints;
    if (value < 0) value = "";
    if (value > totalAmount - 10000) value = totalAmount - 10000;
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
                  item.id == clickVoucher?.id ? "bg-primary" : ""
                }`}
                onClick={() => handleSelectVoucher(item)}
              >
                <div className="md:text-left">
                  <p className="font-bold text-accent">{item.description}</p>
                  <p className="md:text-lg font-bold text-accent"></p>
                  <p className="text-sm text-secondary font-medium">{`HSD: ${dayjs(
                    item.end_date
                  ).format("HH:mm - DD/MM/YYYY")}`}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <button className="p-2 bg-accent text-primary rounded-md hover:bg-accent/50 transition">
                    {item.id == clickVoucher?.id ? (
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 font-semibold">
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
Discount.propTypes = {
  handleCalculatePoint: PropTypes.func.isRequired,
  setSelectVoucher: PropTypes.func.isRequired,
  setPriceDiscountVoucher: PropTypes.func.isRequired,
  membership: PropTypes.object.isRequired,
  totalAmount: PropTypes.number.isRequired,
  setTotalPayment: PropTypes.func.isRequired,
  setPriceDiscount: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Discount;
