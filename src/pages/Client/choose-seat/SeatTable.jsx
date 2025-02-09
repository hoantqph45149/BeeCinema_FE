import React from "react";

const SeatTable = ({
  seatsByRow,
  selectedSeats,
  toggleSeatSelection,
  matrixSeat,
}) => {
  const matrix = matrixSeat[0];
  return (
    <table
      border="1"
      cellPadding="5"
      cellSpacing="0"
      className="w-full font-oswald"
    >
      <thead>
        <tr>
          <th colSpan={matrix?.max_col}>
            <img src="/images/screen.png" alt="" />
          </th>
        </tr>
      </thead>
      <tbody>
        {seatsByRow.map((rowData) => {
          let hideNextSeat = false;
          return (
            <tr key={rowData.row}>
              {Array.from({ length: matrix?.max_row }, (_, i) => i + 1).map(
                (x) => {
                  const seat = rowData.seats.find(
                    (seat) => seat.coordinates_x === x
                  );
                  // console.log("seat ", seat);

                  if (hideNextSeat) {
                    hideNextSeat = false;
                    return null;
                  }

                  if (seat?.type_seat_id === 3) {
                    hideNextSeat = true;
                  }

                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <td
                      onClick={() => toggleSeatSelection(seat)}
                      colSpan={seat?.type_seat_id === 3 ? 2 : 1}
                      key={x}
                      className={`w-8 max-w-8 h-6 max-h-8 cursor-pointer text-center ${
                        seat?.type_seat_id === 3 && "px-[2px] sm:px-1"
                      }`}
                    >
                      {seat && seat?.type_seat_id === 3 ? (
                        <div
                          className={`${
                            isSelected ? "bg-[#32a9ef]" : "bg-[#d1d1d1]"
                          } relative inline-flex justify-center items-center w-full h-8 sm:h-14 text-center text-[20px]`}
                          style={{
                            maskImage: "url('/svg/seat-double.svg')",
                            maskRepeat: "no-repeat",
                            maskSize: "100% 100%",
                          }}
                        >
                          <span
                            style={{
                              wordSpacing: "1.2em",
                            }}
                            className={`select-none absolute top-[45%] sm:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] sm:text-[10px] font-bold ${
                              isSelected ? "text-white" : "text-secondary"
                            } w-[66px]`}
                          >
                            {seat.name}
                          </span>
                        </div>
                      ) : seat && seat?.type_seat_id === 2 ? (
                        <div
                          className={`${
                            isSelected ? "bg-[#32a9ef]" : "bg-[#d1d1d1]"
                          } relative inline-flex justify-center items-center w-full h-6 sm:h-12 text-center text-xl z-5`}
                          style={{
                            maskImage: "url('/svg/seat-vip.svg')",
                            maskRepeat: "no-repeat",
                            maskSize: "100% 100%",
                          }}
                        >
                          <span
                            style={{
                              wordSpacing: "1.2em",
                            }}
                            className={`select-none absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] sm:text-[10px] font-medium ${
                              isSelected ? "text-white" : "text-secondary"
                            } w-[66px]`}
                          >
                            {seat.name}
                          </span>
                        </div>
                      ) : seat && seat?.type_seat_id === 1 ? (
                        <div
                          className={`${
                            isSelected ? "bg-[#32a9ef]" : "bg-[#d1d1d1]"
                          } relative inline-flex justify-center items-center w-full h-6 sm:h-12 text-center text-xl z-5`}
                          style={{
                            maskImage: "url('/svg/seat-regular.svg')",
                            maskRepeat: "no-repeat",
                            maskSize: "100% 100%",
                          }}
                        >
                          <span
                            style={{
                              wordSpacing: "1.2em",
                            }}
                            className={`select-none absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] sm:text-[10px] font-medium ${
                              isSelected ? "text-white" : "text-secondary"
                            } w-[66px]`}
                          >
                            {seat?.name}
                          </span>
                        </div>
                      ) : null}
                    </td>
                  );
                }
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SeatTable;
