import dayjs from "dayjs";

const isDayOff = (dateString) => {
  const holidays = [
    "01-01", // Tết Dương Lịch
    "30-04", // Giải phóng miền Nam
    "01-05", // Quốc tế Lao động
    "02-09", // Quốc khánh Việt Nam
    "20-11", // Ngày Nhà giáo Việt Nam
    "25-12", // Giáng Sinh
  ];

  const date = dayjs(dateString, "YYYY-MM-DD HH:mm:ss");
  const dayOfWeek = date.day(); // 0 = Chủ Nhật, 6 = Thứ Bảy

  return (
    dayOfWeek === 0 ||
    dayOfWeek === 6 ||
    holidays.includes(date.format("DD-MM"))
  );
};

export default isDayOff;
