import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showAlert = (title, text, icon = "success") => {
  return MySwal.fire({
    title,
    html: text,
    icon,
    confirmButtonText: "OK",
  });
};

export const showLoadingAlert = () => {
  Swal.fire({
    title: "Đang xử lý...",
    text: "Vui lòng chờ trong giây lát.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
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
