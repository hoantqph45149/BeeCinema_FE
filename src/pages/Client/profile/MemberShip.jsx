import { Crown, Gem, IdCard, Medal, Star } from "lucide-react";
import React from "react";
import Loading from "../../../Components/Common/Loading";
import { useFetch } from "../../../Hooks/useCRUD";
import { formatVND } from "../../../utils/Currency";
import PointHistory from "./PointHistory";

const MemberShip = () => {
  const { data: ranks } = useFetch(["ranks"], "/ranks", {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });
  const { data: membership, isLoading } = useFetch(
    ["membership"],
    "/user/membership",
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );

  const rankIcons = {
    Member: <Medal className="text-[#cd7f32]" size={20} />,
    Gold: <Star className="text-[#ffd700]" size={20} />,
    Platinum: <Crown className="text-[#C0C0C0]" size={20} />,
    Diamond: <Gem className="text-[#b0e0e6]" size={20} />,
  };

  const totalSpent = membership?.total_spent ?? 0;
  const maxSpent = ranks?.data?.length
    ? ranks.data[ranks.data.length - 1].total_spent
    : 1;

  const progressPercentage = (totalSpent / maxSpent) * 100;

  return (
    <div className="container mt-4 bg-primary rounded-xl shadow-lg">
      <h2 className="text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-2 font-semibold py-6 text-secondary text-center">
        <IdCard size={30} /> Thẻ thành viên
      </h2>
      {isLoading ? (
        <div className="container py-40">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-primary">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold border-b pb-2">
              Tổng quan
            </h2>

            <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-4 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
                <p className="text-secondary text-sm sm:text-base">
                  Cấp độ thẻ:
                </p>
                <p className="font-bold text-sm sm:text-base">
                  {membership?.rank?.name}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
                <p className="text-secondary text-sm sm:text-base">Số thẻ:</p>
                <p className="font-bold text-sm sm:text-base">
                  {membership?.code}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-secondary text-sm sm:text-base">
                Số tiền đã chi tiêu{" "}
                <span className="font-bold">
                  {formatVND(membership?.total_spent)}
                </span>
              </p>
              <div className="relative w-full py-3">
                <div className="w-[96%] mx-auto bg-gray-200 h-4 rounded-sm">
                  <div
                    className="h-full bg-accent stripe-animation"
                    style={{
                      width: `${Math.min(progressPercentage, 100)}%`,
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
                      className="absolute text-[10px] sm:text-xs text-secondary flex flex-col items-center"
                      style={{
                        left: `${positionPercentage}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="relative flex flex-col items-center group">
                        {membership?.rank?.name === rank.name && (
                          <div className="absolute animate-ping w-6 h-6 rounded-full bg-accent opacity-20 top-0"></div>
                        )}

                        <div
                          className={`z-10 bg-white rounded-full p-1 shadow-md ${
                            membership?.rank?.name === rank.name
                              ? "animate-bounce"
                              : ""
                          }`}
                        >
                          {rankIcons[rank.name] ?? <Medal size={20} />}
                        </div>

                        <p className="font-semibold text-xs sm:text-sm px-1">
                          {rank.name}
                        </p>
                        <p className="text-gray-500 text-[10px] sm:text-xs">
                          {formatVND(rank.total_spent)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Điểm thành viên */}
            <div className="mt-16 text-secondary">
              <p className="text-sm sm:text-base">
                Điểm đã tích lũy:{" "}
                <span className="font-bold">
                  {membership?.totalEarnedPoints.toLocaleString()} điểm
                </span>
              </p>
              <p className="text-sm sm:text-base">
                Điểm đã sử dụng:{" "}
                <span className="font-bold">
                  {Math.abs(membership?.totalSpentPoints).toLocaleString()} điểm
                </span>
              </p>
              <p className="text-sm sm:text-base">
                Điểm hiện có:{" "}
                <span className="font-bold">
                  {membership?.points.toLocaleString()} điểm
                </span>
              </p>
              <p className="text-sm sm:text-base">
                Điểm sắp hết hạn:{" "}
                <span className="font-bold">
                  {membership?.expiringPoints.toLocaleString()} điểm
                </span>
              </p>
            </div>

            {/* Lưu ý */}
            <div className="mt-8 text-secondary">
              <p className="font-bold text-sm sm:text-base">Lưu ý:</p>
              <ul className="list-disc pl-5 text-sm sm:text-base">
                <li>
                  Điểm tích lũy được tính dựa trên các giao dịch hợp lệ trong hệ
                  thống.
                </li>
                <li>
                  Điểm đã sử dụng không thể hoàn lại sau khi quy đổi hoặc sử
                  dụng.
                </li>
              </ul>
            </div>
          </div>
          <PointHistory pointsHistory={membership?.point_histories} />
        </>
      )}
    </div>
  );
};

export default MemberShip;
