import React from "react";
import { useAuthContext } from "./../../../Contexts/auth/UseAuth";
import { showAlert } from "../../../Components/Common/showAlert";

const SeatTable = ({ seatsByRow, toggleSeatSelection, matrix }) => {
  const { authUser } = useAuthContext();
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

                  if (hideNextSeat) {
                    hideNextSeat = false;
                    return null;
                  }

                  if (seat?.type_seat_id === 3) {
                    hideNextSeat = true;
                  }

                  return (
                    <td
                      onClick={() => {
                        if (seat.pivot?.status === "booked") {
                          return;
                        } else if (
                          seat.pivot?.status === "hold" &&
                          seat.pivot?.user_id !== authUser.user.id
                        ) {
                          showAlert(
                            "Vui lòng chọn ghế khác",
                            "Ghế đã được giữ bởi người khác",
                            "error"
                          );
                          return;
                        } else if (!seat.is_active) {
                          showAlert(
                            "Vui lòng chọn ghế khác",
                            "Ghế đã hỏng",
                            "error"
                          );
                          return;
                        }
                        toggleSeatSelection(seat);
                      }}
                      colSpan={seat?.type_seat_id === 3 ? 2 : 1}
                      key={x}
                      className={`w-8 h-8 sm:h-14 md:h-8 lg:w-12 lg:h-12 cursor-pointer text-center p-0 ${
                        seat?.type_seat_id === 3 && "px-[2px] sm:px-1"
                      }`}
                    >
                      {seat && seat?.type_seat_id === 3 ? (
                        <div
                          className={`${
                            seat.pivot?.status == "hold" &&
                            seat.pivot?.user_id == authUser.user.id
                              ? "bg-accent"
                              : seat.pivot?.status == "hold" &&
                                seat.pivot?.user_id !== authUser.user.id
                              ? "bg-[#082f49]"
                              : seat.pivot?.status == "booked"
                              ? "bg-[#ef4444]"
                              : "bg-[#d1d1d1]"
                          }
                          } relative inline-flex justify-center items-center w-full h-full text-center text-[20px] ${
                            !seat.is_active ? "seat-inactive" : ""
                          }`}
                          style={{
                            maskImage: "url('/svg/seat-double.svg')",
                            maskRepeat: "no-repeat",
                            maskSize: "100% 100%",
                          }}
                        >
                          <span
                            style={{
                              wordSpacing: "clamp(0.2rem, 0.5rem, 0.1rem)",
                            }}
                            className={`w-auto select-none absolute top-[45%] sm:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] sm:text-[10px] md:text-[7px] lg:text-[10px] font-bold ${
                              seat.pivot?.status == "hold" &&
                              seat.pivot?.user_id == authUser.user.id
                                ? "text-primary"
                                : seat.pivot?.status == "hold" &&
                                  seat.pivot?.user_id !== authUser.user.id
                                ? "text-primary"
                                : seat.pivot?.status == "booked"
                                ? "text-primary"
                                : "text-secondary"
                            } w-[66px]`}
                          >
                            {seat.name}
                          </span>
                        </div>
                      ) : seat && seat?.type_seat_id === 2 ? (
                        <div
                          className={`${
                            seat.pivot?.status == "hold" &&
                            seat.pivot?.user_id == authUser.user.id
                              ? "bg-accent"
                              : seat.pivot?.status == "hold" &&
                                seat.pivot?.user_id !== authUser.user.id
                              ? "bg-[#082f49]"
                              : seat.pivot?.status == "booked"
                              ? "bg-[#ef4444]"
                              : "bg-[#d1d1d1]"
                          } relative inline-flex justify-center items-center w-full h-full text-center text-xl z-5  ${
                            !seat.is_active ? "seat-inactive" : ""
                          }`}
                          style={{
                            maskImage: "url('/svg/seat-vip.svg')",
                            maskRepeat: "no-repeat",
                            maskSize: "100% 100%",
                          }}
                        >
                          <span
                            className={`w-auto h-auto absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] sm:text-[10px] md:text-[7px] lg:text-[10px] font-medium  ${
                              seat.pivot?.status == "hold" &&
                              seat.pivot?.user_id == authUser.user.id
                                ? "text-primary"
                                : seat.pivot?.status == "hold" &&
                                  seat.pivot?.user_id !== authUser.user.id
                                ? "text-primary"
                                : seat.pivot?.status == "booked"
                                ? "text-primary"
                                : "text-secondary"
                            } w-[66px]`}
                          >
                            {seat.name}
                          </span>
                        </div>
                      ) : seat && seat?.type_seat_id === 1 ? (
                        <div
                          className={`${
                            seat.pivot?.status == "hold" &&
                            seat.pivot?.user_id == authUser.user.id
                              ? "bg-accent"
                              : seat.pivot?.status == "hold" &&
                                seat.pivot?.user_id !== authUser.user.id
                              ? "bg-[#082f49]"
                              : seat.pivot?.status == "booked"
                              ? "bg-[#ef4444]"
                              : "bg-[#d1d1d1]"
                          }
                          } relative inline-flex justify-center items-center w-full h-full text-center text-xl z-5 ${
                            !seat.is_active ? "seat-inactive" : ""
                          }`}
                          style={{
                            maskImage: "url('/svg/seat-regular.svg')",
                            maskRepeat: "no-repeat",
                            maskSize: "100% 100%",
                          }}
                        >
                          <span
                            className={`w-auto absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] sm:text-[10px] md:text-[7px] lg:text-[10px] font-medium  ${
                              seat.pivot?.status == "hold" &&
                              seat.pivot?.user_id == authUser.user.id
                                ? "text-primary"
                                : seat.pivot?.status == "hold" &&
                                  seat.pivot?.user_id !== authUser.user.id
                                ? "text-primary"
                                : seat.pivot?.status == "booked"
                                ? "text-primary"
                                : "text-secondary"
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
