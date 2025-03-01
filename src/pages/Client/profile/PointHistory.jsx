import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

const data = [
  { id: 1, date: "2024-02-15", points: 500, type: "Nhận điểm" },
  { id: 2, date: "2024-02-10", points: -200, type: "Dùng điểm" },
  { id: 3, date: "2024-02-08", points: 300, type: "Nhận điểm" },
  { id: 4, date: "2024-02-05", points: -100, type: "Dùng điểm" },
  { id: 5, date: "2024-02-02", points: 400, type: "Nhận điểm" },
  { id: 6, date: "2024-01-28", points: -150, type: "Dùng điểm" },
  { id: 7, date: "2024-01-25", points: 350, type: "Nhận điểm" },
  { id: 8, date: "2024-01-20", points: -250, type: "Dùng điểm" },
];

const ITEMS_PER_PAGE = 5;

const PointHistory = ({ pointsHistory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(pointsHistory?.length / ITEMS_PER_PAGE);

  const paginatedData = pointsHistory?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Lịch sử điểm</h2>

      <div className="space-y-4">
        {paginatedData?.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg shadow-md bg-white flex justify-between items-center"
          >
            <div>
              <p className="text-gray-600">
                {dayjs(item.created_at).format("DD-MM-YYYY")}
              </p>
              <p className="font-medium">{item.type}</p>
            </div>
            <p
              className={`font-bold ${
                item.points > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.points > 0 ? `+${item.points}` : item.points} Điểm
            </p>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 border rounded-md bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded-md">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 border rounded-md bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default PointHistory;
