export const formatVND = (amount) => {
  if (isNaN(amount)) return "0 đ";
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
