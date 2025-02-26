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
  console.log(seatsByRow);
  let errorStaggeredChairs = false;
  let messageStaggeredChairs = "";
  seatsByRow.forEach((rowData) => {
    const seatsInRow = rowData.seats;
    const selectedIndexes = seatsInRow
      .map((seat, index) =>
        seat.pivot.user_id == user_id && seat.pivot.status == "hold"
          ? index
          : null
      )
      .filter((index) => index !== null);
    console.log(selectedIndexes);
    for (let i = 0; i < selectedIndexes.length - 1; i++) {
      const gap = selectedIndexes[i + 1] - selectedIndexes[i];
      console.log(gap);
      if (gap === 2) {
        const emptySeatIndex = selectedIndexes[i] + 1;
        const emptySeat = seatsInRow[emptySeatIndex];
        if (
          emptySeat &&
          emptySeat.pivot.status === "available" &&
          emptySeat.is_active
        ) {
          errorStaggeredChairs = true;
          messageStaggeredChairs += `${emptySeat.name} `;
        }
      }
    }
  });

  return {
    errorStaggeredChairs,
    messageStaggeredChairs,
  };
};
