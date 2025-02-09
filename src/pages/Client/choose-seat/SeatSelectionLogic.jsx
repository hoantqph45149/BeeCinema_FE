import {
  validateMaxSeats,
  checkAdjacentEdgeSeats,
  checkSoleSeats,
} from "./../../../utils/CheckChooseSeat";
export const handleSeatSelection = (
  seat,
  selectedSeats,
  setSelectedSeats,
  seatsByRow,
  setDialog
) => {
  const isSelected = selectedSeats.includes(seat);
  const updatedSeats = isSelected
    ? selectedSeats.filter((s) => s !== seat)
    : [...selectedSeats, seat];

  if (!validateMaxSeats(updatedSeats)) {
    setDialog({
      isOpen: true,
      title: "Warning",
      message: "Bạn chỉ được đặt tối đa 8 ghế.",
    });
    return;
  }

  const { isEdgeSeatIssue, edgeSeatsMessage } = checkAdjacentEdgeSeats(
    seatsByRow.map((rowData) => ({
      ...rowData,
      seats: rowData.seats.map((s) =>
        updatedSeats.includes(s) ? { ...s, selected: true } : s
      ),
    }))
  );

  if (isEdgeSeatIssue) {
    setDialog({
      isOpen: true,
      title: "Hãy chọn lại ghế!",
      message: `Không được để trống ghế : ${edgeSeatsMessage}`,
    });
    return;
  }

  const { isSoleSeatIssue, soleSeatsMessage } = checkSoleSeats(
    seatsByRow.map((rowData) => ({
      ...rowData,
      seats: rowData.seats.map((s) =>
        updatedSeats.includes(s) ? { ...s, selected: true } : s
      ),
    }))
  );

  if (isSoleSeatIssue) {
    setDialog({
      isOpen: true,
      title: "Hãy chọn lại ghế!",
      message: `Không được để trống ghế: ${soleSeatsMessage}`,
    });
    return;
  }

  setSelectedSeats(updatedSeats);
};
