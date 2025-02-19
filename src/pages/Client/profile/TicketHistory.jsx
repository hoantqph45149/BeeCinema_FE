import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { useState } from "react";

const ticketHistory = [
  {
    id: 1,
    event: "Dune: Part Two",
    date: "10/03/2025",
    bookingDate: "05/03/2025",
    seat: "H5",
    price: "150,000đ",
    status: "Đã thanh toán",
    cinema: "CGV Aeon Mall",
    room: "P301",
    combo: "Bắp + Nước ngọt",
  },
  {
    id: 2,
    event: "Godzilla x Kong: The New Empire",
    date: "15/03/2025",
    bookingDate: "10/03/2025",
    seat: "G12",
    price: "180,000đ",
    status: "Chưa thanh toán",
    cinema: "Lotte Cinema Quận 7",
    room: "P201",
    combo: "Combo siêu bắp",
  },
  {
    id: 3,
    event: "Taylor Swift: The Eras Tour",
    date: "20/04/2025",
    bookingDate: "01/04/2025",
    seat: "VIP A1",
    price: "2,500,000đ",
    status: "Đã thanh toán",
    combo: "Không có",
  },
  {
    id: 4,
    event: "Avengers 5: Secret Wars",
    date: "05/05/2025",
    bookingDate: "01/05/2025",
    seat: "F9",
    price: "200,000đ",
    status: "Chưa thanh toán",
    cinema: "BHD Star Bitexco",
    room: "P701",
    combo: "Combo đặc biệt",
  },
  {
    id: 5,
    event: "Rap Việt All-Star",
    date: "12/06/2025",
    bookingDate: "25/05/2025",
    seat: "C7",
    price: "800,000đ",
    status: "Đã thanh toán",
    combo: "Vé VIP có nước suối",
  },
  {
    id: 6,
    event: "Fast & Furious 11",
    date: "20/07/2025",
    bookingDate: "15/07/2025",
    seat: "D10",
    price: "160,000đ",
    status: "Đã thanh toán",
    cinema: "CGV VivoCity",
    room: "P501",
    combo: "Bắp caramel + Pepsi",
  },
  {
    id: 7,
    event: "Concert Sơn Tùng M-TP",
    date: "01/09/2025",
    bookingDate: "10/08/2025",
    seat: "A12",
    price: "1,200,000đ",
    status: "Chưa thanh toán",
    combo: "Vé VIP có quà tặng",
  },
];

const ITEMS_PER_PAGE = 9;
const TicketHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ticketHistory.length / ITEMS_PER_PAGE);

  const paginatedTickets = ticketHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mt-4 mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl flex items-center justify-center gap-2 font-semibold mb-4 text-gray-800 text-center">
        <History size={30} /> Lịch sử đặt vé
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex flex-col-reverse md:flex-row justify-between p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="md:w-2/3 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-accent">{ticket.event}</h3>
              <p className="text-sm text-gray-600">
                Mã vé: <span className="font-semibold">2880321924751108</span>
              </p>
              <p className="text-sm text-gray-600">
                Ngày đặt: <span className="font-semibold">{ticket.date}</span>
              </p>
              <p className="text-sm text-gray-600">
                Ngày chiếu: <span className="font-semibold">{ticket.date}</span>
              </p>
              <p className="text-sm text-gray-600">
                Phòng: <span className="font-semibold">{ticket.room}</span>
              </p>
              <div className="text-sm text-gray-600">
                <p>
                  Ghế: <span className="font-semibold">{ticket.seat}</span>
                </p>
                <span>Tổng tiền ghế: 80.000đ</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Combo: <span className="font-semibold">{ticket.combo}</span>
                </p>
                <span>Tổng tiền combo: 80.000đ</span>
              </div>
              <p className="text-sm text-gray-600">
                Tổng tiền: <span className="font-semibold">{ticket.price}</span>
              </p>
            </div>
            <div className="md:w-1/3 w-full mt-4 md:mt-0">
              <img
                src="https://files.betacorp.vn/media%2fimages%2f2025%2f01%2f08%2fscreenshot%2D2025%2D01%2D08%2D170147%2D170223%2D080125%2D20.png"
                alt="Ticket"
                className="w-full h-auto max-h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

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

export default TicketHistory;
