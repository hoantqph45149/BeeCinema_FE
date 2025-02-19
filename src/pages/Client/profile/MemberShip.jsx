import { Barcode, IdCard } from "lucide-react";
import React from "react";
import PointHistory from "./PointHistory";

const MemberShip = () => {
  const memberData = {
    level: "Diamond",
    spent: 3000000,
    levels: [
      { name: "Member", value: 0 },
      { name: "Gold", value: 600000 },
      { name: "Platinum", value: 3000000 },
      { name: "Diamond", value: 5000000 },
    ],
    points: {
      total: 271400,
      used: 13000,
      available: 258400,
    },
    barcode: "548800740954",
  };

  const progressPercentage =
    (memberData.spent / memberData.levels[3].value) * 100;
  return (
    <div className="container mt-4 mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl flex items-center justify-center gap-2 font-semibold mb-4 text-gray-800 text-center">
        <IdCard size={30} /> Thẻ thành viên
      </h2>
      <div className="bg-white">
        <h2 className="text-lg font-semibold border-b pb-2">Tổng quan</h2>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-700">
            Cấp độ thẻ: <span className="font-bold">{memberData.level}</span>
          </p>
          <Barcode size={100} />
        </div>

        <div className="mt-4">
          <p className="text-gray-700">
            Số tiền đã chi tiêu{" "}
            <span className="font-bold">
              {" "}
              {memberData.spent.toLocaleString()}
            </span>
          </p>
          <div className="flex justify-between items-center">
            <div className="w-full bg-gray-200 h-4 rounded-sm overflow-hidden">
              <div
                className="h-full bg-accent stripe-animation"
                style={{
                  width: `${progressPercentage}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Các mức thẻ */}
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          {memberData.levels.map((level) => (
            <div key={level.name} className="text-center">
              <p className="font-semibold">{level.name}</p>
              <p>{level.value.toLocaleString()} VND</p>
            </div>
          ))}
        </div>

        {/* Điểm thành viên */}
        <div className="mt-4 text-gray-700">
          <p>
            Điểm đã tích lũy:{" "}
            <span className="font-bold">
              {memberData.points.total.toLocaleString()} điểm
            </span>
          </p>
          <p>
            Điểm đã sử dụng:{" "}
            <span className="font-bold">
              {memberData.points.used.toLocaleString()} điểm
            </span>
          </p>
          <p>
            Điểm hiện có:{" "}
            <span className="font-bold">
              {memberData.points.available.toLocaleString()} điểm
            </span>
          </p>
        </div>
      </div>
      <PointHistory />
    </div>
  );
};

export default MemberShip;
