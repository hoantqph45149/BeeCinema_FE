import { useState } from "react";
import {
  Clipboard,
  Check,
  ChevronLeft,
  ChevronRight,
  Tags,
} from "lucide-react";

const vouchers = [
  { id: 1, code: "SALE50", discount: "Giảm 50%", condition: "Cho đơn từ 500K" },
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

const itemsPerPage = 6;

const MyVoucher = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(null);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const totalPages = Math.ceil(vouchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVouchers = vouchers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mt-4 mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl flex items-center justify-center gap-2 font-semibold mb-4 text-gray-800 text-center">
        <Tags size={30} /> Danh sách Voucher
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentVouchers.map((voucher) => (
          <div
            key={voucher.id}
            className="flex flex-col md:flex-row items-center justify-between p-3 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="text-center md:text-left">
              <p className="text-lg font-bold text-accent">
                {voucher.discount}
              </p>
              <p className="text-sm text-secondary">{voucher.condition}</p>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="bg-gray-200 px-3 py-1 text-sm font-medium rounded-md">
                {voucher.code}
              </span>
              <button
                className="p-2 bg-accent text-primary rounded-md hover:bg-accent/50 transition"
                onClick={() => handleCopy(voucher.code, voucher.id)}
              >
                {copied === voucher.id ? (
                  <Check size={16} />
                ) : (
                  <Clipboard size={16} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="px-3 py-1 text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default MyVoucher;
