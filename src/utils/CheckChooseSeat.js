// kiểm tra các ghế ở ngoài cùng
export const checkTerminalSeat = (seatsByRow, user_id) => {
  let errorTerminalSeat = false;
  let messageTerminalSeat = "";
  seatsByRow.forEach((rowData) => {
    const seatsInRow = rowData.seats;
    if (seatsInRow.length >= 2) {
      const firstSeat = seatsInRow[0];
      const secondSeat = seatsInRow[1];
      const lastSeat = seatsInRow[seatsInRow.length - 1];
      const beforeLastSeat = seatsInRow[seatsInRow.length - 2];
      if (
        firstSeat.pivot.status == "available" &&
        firstSeat.pivot.user_id == null &&
        firstSeat.type_seat_id !== 3 &&
        firstSeat.is_active &&
        secondSeat.pivot.status == "hold" &&
        secondSeat.pivot.user_id == user_id
      ) {
        errorTerminalSeat = true;
        messageTerminalSeat += `${firstSeat.name} `;
      }
      if (
        lastSeat.pivot.status == "available" &&
        lastSeat.pivot.user_id == null &&
        lastSeat.type_seat_id !== 3 &&
        lastSeat.is_active &&
        beforeLastSeat.pivot.status == "hold" &&
        beforeLastSeat.pivot.user_id == user_id
      ) {
        errorTerminalSeat = true;
        messageTerminalSeat += `${lastSeat.name} `;
      }
    }
  });
  return {
    errorTerminalSeat,
    messageTerminalSeat,
  };
};

// kiểm tra ghế so le nhau
export const checkStaggeredChairs = (seatsByRow, user_id) => {
  let errorStaggeredChairs = false;
  const seatNamesWithError = new Set();

  seatsByRow.forEach((rowData) => {
    const seatsInRow = rowData.seats;

    seatsInRow.forEach((seat, index) => {
      if (seat.pivot.status === "available" && seat.is_active) {
        const prevSeat = seatsInRow[index - 1];
        const nextSeat = seatsInRow[index + 1];

        const prevIsHoldOrSold =
          prevSeat &&
          (prevSeat.pivot.status === "booked" ||
            (prevSeat.pivot.status === "hold" &&
              prevSeat.pivot.user_id === user_id));

        const nextIsHold =
          nextSeat &&
          nextSeat.pivot.status === "hold" &&
          nextSeat.pivot.user_id === user_id;

        const prevIsHold =
          prevSeat &&
          prevSeat.pivot.status === "hold" &&
          prevSeat.pivot.user_id === user_id;

        const nextIsHoldOrSold =
          nextSeat &&
          (nextSeat.pivot.status === "booked" ||
            (nextSeat.pivot.status === "hold" &&
              nextSeat.pivot.user_id === user_id));

        if (
          (prevIsHoldOrSold && nextIsHold) ||
          (prevIsHold && nextIsHoldOrSold)
        ) {
          errorStaggeredChairs = true;
          seatNamesWithError.add(seat.name); // 💡 Thêm vào Set
        }
      }
    });
  });

  return {
    errorStaggeredChairs,
    messageStaggeredChairs: Array.from(seatNamesWithError).join(" "), // ❌ tránh lặp
  };
};
