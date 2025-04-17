import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import SeatInfo from "./SeatInfo";
import SeatLegend from "./SeatLegend";
import SeatTable from "./SeatTable";

import { showAlert } from "../../../Components/Common/showAlert";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import echo from "../../../pusher/echo";

import CountDown from "./CountDown";
import { handleSeatSelection } from "./SeatSelectionLogic";
import MovieInfo from "./MovieInfo";
import Loading from "../../../Components/Common/Loading";

const ChooseSeat = () => {
  const nav = useNavigate();
  const { slug } = useParams();
  const { authUser } = useAuthContext();
  const { data: showtimeData, isLoading } = useFetch(
    ["choose-seat", slug],
    `/choose-seat/${slug}`,
    {
      refetchOnMount: true,
    }
  );
  const { create: chooseSeat } = useCRUD(["chooseSeats"]);
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [movie, setMovie] = useState({});
  const [seatsByRow, setSeatsByRow] = useState([]);
  const [matrixSeat, setMatrixSeat] = useState({});
  const [holdExpiresAt, setHoldExpiresAt] = useState(null);
  const selectedSeatsRef = useRef(selectedSeats);
  useEffect(() => {
    selectedSeatsRef.current = selectedSeats;
  }, [selectedSeats]);
  useEffect(() => {
    const handlePageLeave = () => {
      if (selectedSeatsRef.current.length > 0) {
        console.log("selectedSeatsRef.current", selectedSeatsRef.current);
        selectedSeatsRef.current.forEach((seat) => {
          chooseSeat.mutate({
            url: "/update-seat",
            data: {
              seat_id: seat.id,
              showtime_id: seat?.pivot?.showtime_id,
              action: "release",
            },
            shouldShowLoadingAlert: false,
            shouldShowAlert: false,
          });
        });
      }
    };

    return () => {
      const newPath = window.location.pathname;

      if (newPath !== `/checkout/${slug}`) {
        handlePageLeave();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (showtimeData) {
      setMovie(showtimeData.showtime.movie);
      setSeatsByRow(showtimeData.seatMap);
      setMatrixSeat(showtimeData.matrixSeat);

      const filteredSeats = showtimeData.seatMap
        .flatMap((row) => row.seats)
        .filter(
          (seat) =>
            seat.pivot?.user_id === authUser?.id &&
            seat.pivot?.status === "hold"
        );

      setSelectedSeats(filteredSeats);
    }
  }, [showtimeData]);

  useEffect(() => {
    const totalAmount = selectedSeats.reduce(
      (amount, seat) => amount + Number(seat.pivot.price),
      0
    );
    setTotalAmount(totalAmount);

    if (selectedSeats.length === 0) {
      setHoldExpiresAt(null);
      return;
    }

    if (holdExpiresAt === null) {
      const closestSeat = selectedSeats.reduce((minSeat, seat) => {
        return !minSeat ||
          dayjs(seat.pivot.hold_expires_at).isBefore(
            dayjs(minSeat.pivot.hold_expires_at)
          )
          ? seat
          : minSeat;
      }, null);

      if (closestSeat) {
        setHoldExpiresAt(closestSeat.pivot.hold_expires_at);
      }
    }
  }, [selectedSeats]);

  useEffect(() => {
    const channel = echo.channel(`showtime.${showtimeData?.showtime?.id}`);

    channel.listen(".seatStatusChange", (data) => {
      setSeatsByRow((prevSeatsByRow) => {
        return prevSeatsByRow.map((row) => ({
          ...row,
          seats: row.seats.map((seat) =>
            seat.id === data.seatId
              ? {
                  ...seat,
                  pivot: {
                    ...seat.pivot,
                    status: data.status,
                    user_id: data.userId,
                  },
                }
              : seat
          ),
        }));
      });
    });

    return () => {
      channel.stopListening(".SeatStatusChange");
      echo.leaveChannel(`showtime.${showtimeData?.showtime?.id}`);
    };
  }, [showtimeData?.showtime?.id]);

  const toggleSeatSelection = (selectSeat) => {
    const currentSeatCount = selectedSeats.reduce((total, seat) => {
      return total + (seat.type_seat_id === 3 ? 2 : 1);
    }, 0);

    const isSelected = selectedSeats.some((s) => s.id === selectSeat.id);
    const seatValue = selectSeat.type_seat_id === 3 ? 2 : 1;

    if (!isSelected && currentSeatCount + seatValue > 8) {
      showAlert("", "Bạn chỉ được chọn tối đa 8 ghế", "warning");
      return;
    }

    setSelectedSeats((prevSelectedSeats) =>
      isSelected
        ? prevSelectedSeats.filter((s) => s.id !== selectSeat.id)
        : [
            ...prevSelectedSeats,
            {
              ...selectSeat,
              pivot: {
                ...selectSeat.pivot,
                status: "hold",
                user_id: authUser?.id,
              },
            },
          ]
    );

    setSeatsByRow((prevSeatsByRow) => {
      const updatedSeatsByRow = prevSeatsByRow.map((row) => ({
        ...row,
        seats: row.seats.map((seat) =>
          seat.id === selectSeat.id
            ? {
                ...seat,
                pivot: {
                  ...seat.pivot,
                  status:
                    seat.pivot?.status === "available" ? "hold" : "available",
                  user_id:
                    seat.pivot?.status === "available" ? authUser?.id : null,
                },
              }
            : seat
        ),
      }));
      return updatedSeatsByRow;
    });

    chooseSeat.mutate(
      {
        url: "/update-seat",
        data: {
          seat_id: selectSeat.id,
          showtime_id: selectSeat?.pivot?.showtime_id,
          action: selectSeat.pivot?.status === "available" ? "hold" : "release",
        },
        shouldShowLoadingAlert: false,
        shouldShowAlert: false,
      },
      {
        onSuccess: (data) => {
          if (holdExpiresAt === null) {
            setHoldExpiresAt(data?.seat?.hold_expires_at);
          }
        },
      }
    );
  };

  const handleCheckOut = () => {
    if (selectedSeats.length === 0) {
      showAlert("", "Vui lòng chọn ghế", "warning");
      return;
    }
    const isValid = handleSeatSelection(seatsByRow, authUser?.id);

    if (isValid) {
      nav(`/checkout/${slug}`);
    }
  };
  return (
    <div className="container my-10">
      {isLoading ? (
        <>
          <div className="container py-80">
            <Loading />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 xl:gap-20 min-h-10">
            <div className="flex-1">
              <div className="flex flex-col gap-5">
                <SeatLegend />
                <SeatTable
                  seatsByRow={seatsByRow}
                  toggleSeatSelection={toggleSeatSelection}
                  matrix={matrixSeat}
                />
                <SeatInfo totalAmount={totalAmount} />
              </div>
            </div>
            <div className="w-full md:w-[38%] lg:w-1/3 flex flex-col gap-5 ">
              <MovieInfo
                movie={movie}
                showtimeData={showtimeData}
                selectedSeats={selectedSeats}
                handleCheckOut={handleCheckOut}
              />
              {holdExpiresAt !== null && selectedSeats.length > 0 && (
                <CountDown
                  holdExpiresAt={holdExpiresAt}
                  selectedSeats={selectedSeats}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseSeat;
