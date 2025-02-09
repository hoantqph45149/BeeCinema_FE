export const validateMaxSeats = (selectedSeats) => {
  const selectedCount = selectedSeats.reduce((count, seat) => {
    return count + (seat.type_seat_id === 3 ? 2 : 1);
  }, 0);
  return selectedCount <= 8;
};

// kiểm tra các ghế ở ngoài cùng
export const checkAdjacentEdgeSeats = (seatsByRow) => {
  console.log("check edge seatsByRow ", seatsByRow);
  let edgeSeatsMessage = "";
  let isEdgeSeatIssue = false;

  seatsByRow.forEach((rowData) => {
    const seatsInRow = rowData.seats;
    if (seatsInRow.length >= 2) {
      const firstSeat = seatsInRow[0];
      const secondSeat = seatsInRow[1];
      const lastSeat = seatsInRow[seatsInRow.length - 1];
      const beforeLastSeat = seatsInRow[seatsInRow.length - 2];

      if (
        !firstSeat.selected &&
        secondSeat.selected &&
        firstSeat.type_seat_id !== 3 &&
        !firstSeat.sold &&
        !firstSeat.hold &&
        !firstSeat.seat_is_active
      ) {
        isEdgeSeatIssue = true;
        edgeSeatsMessage += `${firstSeat.coordinates_x}${firstSeat.coordinates_y} `;
      }

      if (
        !lastSeat.selected &&
        beforeLastSeat.selected &&
        lastSeat.type_seat_id !== 3 &&
        !lastSeat.sold &&
        !lastSeat.hold &&
        !lastSeat.seat_is_active
      ) {
        isEdgeSeatIssue = true;
        edgeSeatsMessage += `${lastSeat.coordinates_x}${lastSeat.coordinates_y} `;
      }
    }
  });

  return {
    isEdgeSeatIssue,
    edgeSeatsMessage,
  };
};

// kiểm tra ghế so le nhau

export const checkSoleSeats = (seatsByRow) => {
  console.log("check sole seatsByRow ", seatsByRow);
  let soleSeatsMessage = "";
  let isSoleSeatIssue = false;

  seatsByRow.forEach((rowData) => {
    const seatsInRow = rowData.seats;
    const selectedIndexes = seatsInRow
      .map((seat, index) => (seat.selected ? index : null))
      .filter((index) => index !== null);
    for (let i = 0; i < selectedIndexes.length - 1; i++) {
      const gap = selectedIndexes[i + 1] - selectedIndexes[i];
      if (gap === 2) {
        const emptySeatIndex = selectedIndexes[i] + 1;
        const emptySeat = seatsInRow[emptySeatIndex];

        if (
          emptySeat &&
          !emptySeat.sold &&
          !emptySeat.hold &&
          !emptySeat.seat_is_active
        ) {
          isSoleSeatIssue = true;
          soleSeatsMessage += `${emptySeat.coordinates_x}${emptySeat.coordinates_y} `;
        }
      }
    }
  });

  return {
    isSoleSeatIssue,
    soleSeatsMessage,
  };
};
