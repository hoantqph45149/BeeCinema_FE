import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { useState } from "react";
import { useFetch } from "../../../Hooks/useCRUD";
import dayjs from "dayjs";
import { formatVND } from "../../../utils/Currency";
import Loading from "../../../Components/Common/Loading";

const ITEMS_PER_PAGE = 9;
const TicketHistory = () => {
  const { data: ticketHistory, isLoading } = useFetch(
    ["ticketHistory"],
    "/booking-history",
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(ticketHistory?.data?.length / ITEMS_PER_PAGE);

  const paginatedTickets = ticketHistory?.data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <div className="container mt-4 mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl flex items-center justify-center gap-2 font-semibold mb-4 text-gray-800 text-center">
        <History size={30} /> Lịch sử đặt vé
      </h2>

      {isLoading ? (
        <>
          <div className="container py-40">
            <Loading />
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedTickets?.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col-reverse md:flex-row justify-between p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="md:w-2/3 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-accent">{}</h3>
                  <p className="text-sm text-gray-600">
                    Mã vé: <span className="font-semibold">{ticket.code}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Ngày đặt:{" "}
                    <span className="font-semibold">
                      {dayjs(ticket.created_at).format("DD/MM/YYYY")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Ngày chiếu:{" "}
                    <span className="font-semibold">
                      {dayjs(ticket.showtime.start_time).format("DD/MM/YYYY")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Phòng:{" "}
                    <span className="font-semibold">{ticket.room.name}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Giờ chiếu:{" "}
                    <span className="font-semibold">
                      {`${dayjs(ticket.showtime.start_time).format(
                        "HH:mm"
                      )}-${dayjs(ticket.showtime.end_time).format("HH:mm")}`}
                    </span>
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>
                      Ghế:{" "}
                      <span className="font-semibold">
                        {ticket.seats.map((item) => item.seat.name).join(", ")}
                      </span>
                    </p>
                    <span>
                      Tổng tiền ghế: {formatVND(ticket.total_seat_price)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>
                      Combo:{" "}
                      <span className="font-semibold">
                        {ticket.combos.length > 0
                          ? ticket.combos
                              .map((item) => item.combo.name)
                              .join(", ")
                          : "Không có"}
                      </span>
                    </p>
                    {ticket.combos.length > 0 && (
                      <span>
                        Tổng tiền combo: {formatVND(ticket.total_combo_price)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Tổng tiền:{" "}
                    <span className="font-semibold">
                      {formatVND(ticket.total_price)}
                    </span>
                  </p>
                </div>
                <div className="md:w-1/3 w-full mt-4 md:mt-0">
                  <img
                    src={ticket.movie.img_thumbnail}
                    alt="Ticket"
                    className=" w-full h-auto max-h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
