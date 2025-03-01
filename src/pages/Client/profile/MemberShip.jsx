import { Barcode, IdCard } from "lucide-react";
import React from "react";
import PointHistory from "./PointHistory";
import { useFetch } from "../../../Hooks/useCRUD";
import { formatVND } from "../../../utils/Currency";
import Loading from "../../../Components/Common/Loading";

const MemberShip = () => {
  const { data: ranks } = useFetch(["ranks"], "/ranks");
  const { data: membership, isLoading } = useFetch(
    ["membership"],
    "/user/membership"
  );

  const totalSpent = membership?.total_spent ?? 0;
  const maxSpent = ranks?.data?.length
    ? ranks.data[ranks.data.length - 1].total_spent
    : 1;

  const progressPercentage = (totalSpent / maxSpent) * 100;

  return (
    <div className="container mt-4 bg-primary rounded-xl shadow-lg">
      <h2 className="text-xl flex items-center justify-center gap-2 font-semibold py-6 text-secondary text-center">
        <IdCard size={30} /> Thẻ thành viên
      </h2>
      {isLoading ? (
        <div className="container py-40">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-primary">
            <h2 className="text-lg font-semibold border-b pb-2">Tổng quan</h2>

            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                <p className="text-secondary">Cấp độ thẻ: </p>
                <p className="font-bold">{membership?.rank?.name}</p>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                <p className="text-secondary">Số thẻ: </p>
                <p className="font-bold">{membership?.code}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-secondary">
                Số tiền đã chi tiêu{" "}
                <span className="font-bold">
                  {" "}
                  {formatVND(membership?.total_spent)}
                </span>
              </p>
              <div className="relative w-full py-3">
                <div className="w-[96%] mx-auto bg-gray-200 h-4 rounded-sm">
                  <div
                    className="h-full bg-accent stripe-animation"
                    style={{
                      width: `${Math.min(progressPercentage, 100)}%`, // Giới hạn max 100%
                      maxWidth: "100%",
                    }}
                  ></div>
                </div>
                {ranks?.data.map((rank) => {
                  let positionPercentage = (rank.total_spent / maxSpent) * 100;
                  positionPercentage = Math.max(
                    2,
                    Math.min(positionPercentage, 98)
                  );
                  return (
                    <div
                      key={rank.name}
                      className="absolute text-xs text-secondary flex flex-col items-center"
                      style={{
                        left: `${positionPercentage}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="w-1 h-1 bg-gray-700 rounded-full mt-1"></div>
                      <p className="font-semibol px-1 rounded">{rank.name}</p>
                      <p className="text-gray-500">
                        {formatVND(rank.total_spent)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Điểm thành viên */}
            <div className="mt-12 text-secondary">
              <p>
                Điểm đã tích lũy:{" "}
                <span className="font-bold">
                  {membership?.totalEarnedPoints.toLocaleString()} điểm
                </span>
              </p>
              <p>
                Điểm đã sử dụng:{" "}
                <span className="font-bold">
                  {Math.abs(membership?.totalSpentPoints).toLocaleString()} điểm
                </span>
              </p>
              <p>
                Điểm hiện có:{" "}
                <span className="font-bold">
                  {membership?.points.toLocaleString()} điểm
                </span>
              </p>
            </div>
          </div>
          <PointHistory pointsHistory={membership?.point_histories} />
        </>
      )}
    </div>
  );
};

export default MemberShip;
