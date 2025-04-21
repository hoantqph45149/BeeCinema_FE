import { showAlert } from "./../../../Components/Common/showAlert";
import {
  checkStaggeredChairs,
  checkTerminalSeat,
} from "./../../../utils/CheckChooseSeat";
export const handleSeatSelection = (seatsByRow, user_id) => {
  const { errorTerminalSeat, messageTerminalSeat } = checkTerminalSeat(
    seatsByRow,
    user_id
  );
  if (errorTerminalSeat) {
    showAlert(
      "Hãy chọn lại ghế!",
      `Không được để trống ghế: ${messageTerminalSeat}`,
      "warning"
    );
    return false;
  }

  const { errorStaggeredChairs, messageStaggeredChairs } = checkStaggeredChairs(
    seatsByRow,
    user_id
  );

  if (errorStaggeredChairs) {
    showAlert(
      "Hãy chọn lại ghế!",
      `Không được để trống ghế: ${messageStaggeredChairs}`,
      "warning"
    );
    return false;
  }
  return true;
};
