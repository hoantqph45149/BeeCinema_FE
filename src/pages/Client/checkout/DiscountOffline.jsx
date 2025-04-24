import { useQueryClient } from "@tanstack/react-query";
import { ArrowBigRight } from "lucide-react";
import { memo, useEffect, useState } from "react";
import Button from "../../../Components/Common/Button";
import Disclosure from "../../../Components/Common/Disclosure";
import { formatVND } from "../../../utils/Currency";
import api from "../../../apis/axios"; // Assuming axios is used for API calls
import { showAlert } from "../../../Components/Common/showAlert"; // For error/success messages
import { useCRUD } from "../../../Hooks/useCRUD";

const DiscountOffline = ({
  handleCalculatePoint,
  totalAmount,
  resetPoints,
  codeMembership,
}) => {
  const { create: pointsMembership } = useCRUD(["points-membership"]);
  const [points, setPoints] = useState("");
  const [membershipCode, setMembershipCode] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);
  const [isMembershipValid, setIsMembershipValid] = useState(false);
  const conversionRate = 1;
  const [isPointConverted, setIsPointConverted] = useState(false);

  useEffect(() => {
    if (resetPoints) {
      setPoints("");
      setIsPointConverted(false);
      handleCalculatePoint(0, true);
    }
  }, [resetPoints, handleCalculatePoint]);

  // Handle membership code submission
  const handleMembershipSubmit = async () => {
    if (!membershipCode) {
      showAlert("Cảnh báo", "Vui lòng nhập mã thành viên", "warning");
      return;
    }

    pointsMembership.mutate(
      {
        url: "/get-points",
        data: { code: membershipCode },
      },
      {
        onSuccess: (data) => {
          codeMembership(membershipCode);
          setIsMembershipValid(true);
          setCurrentPoints(data?.points || 0);
          showAlert("Thành công", "Mã thành viên hợp lệ!", "success");
        },
        onError: (err) => {
          showAlert("Cảnh báo", "Mã thông báo hợp lệ", "warning");
        },
      }
    );
  };

  // Handle point exchange
  const handleExchangePoints = () => {
    if (points > 0) {
      handleCalculatePoint(points * conversionRate, isPointConverted);
      setIsPointConverted(true);
    }
  };

  // Handle point cancellation
  const handleCancelExchange = () => {
    setPoints("");
    handleCalculatePoint(points * conversionRate, isPointConverted);
    setIsPointConverted(false);
  };

  // Handle point input change
  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10) || "";
    if (value > currentPoints) value = currentPoints;
    if (value < 0) value = "";
    if (value > totalAmount - 10000) value = totalAmount - 10000;
    setPoints(value);
  };

  return (
    <>
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
        {/* Membership Code Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-semibold">
            Nhập mã thành viên
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="outline-none border focus:border-accent rounded p-2 w-full"
              value={membershipCode}
              onChange={(e) => setMembershipCode(e.target.value)}
              placeholder="Nhập mã thành viên"
              disabled={pointsMembership.isLoading || isMembershipValid}
            />
            <Button
              onClick={handleMembershipSubmit}
              disabled={pointsMembership.isLoading || !membershipCode}
            >
              Xác nhận
            </Button>
          </div>
        </div>

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

            <div className="text-sm lg:text-base">
              <p>Nhập số điểm đổi:</p>
              <input
                type="number"
                className="outline-none border focus:border-accent rounded p-1"
                value={points}
                onChange={handleChange}
                disabled={isPointConverted}
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

export default memo(DiscountOffline);
