import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showAlert = (title, text, icon = "success") => {
  return MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText: "OK",
  });
};

export const showConfirm = (title, text, confirmCallback) => {
  return MySwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có, tiếp tục!",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed && typeof confirmCallback === "function") {
      confirmCallback();
    }
  });
};
