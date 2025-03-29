export const formatVND = (amount) => {
  if (isNaN(amount)) return "0 đ";
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formatLargeNumber = (number) => {
  if (number >= 1000000000) {
    return {
      value: number / 1000000000, // Chia cho 1 tỷ
      suffix: "T", // Tỷ
    };
  } else if (number >= 1000000) {
    return {
      value: number / 1000000, // Chia cho 1 triệu
      suffix: "tr", // Triệu
    };
  } else if (number >= 1000) {
    return {
      value: number / 1000, // Chia cho 1 nghìn
      suffix: "nghìn", // Nghìn
    };
  } else if (number >= 100) {
    return {
      value: number / 100, // Chia cho 100
      suffix: "tr", // Trăm (hoặc "h" nếu muốn)
    };
  } else if (number >= 10) {
    return {
      value: number / 10, // Chia cho 10
      suffix: "ch", // Chục
    };
  } else {
    return {
      value: number, // Giữ nguyên
      suffix: "", // Không hậu tố
    };
  }
};
