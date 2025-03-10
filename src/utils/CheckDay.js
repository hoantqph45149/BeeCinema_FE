function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

const HOLIDAYS = [
  "04-30", // 30/4
  "05-01", // 1/5
  "09-02", // Quốc Khánh
  "01-01", // Tết Dương Lịch
];

function isHoliday(date) {
  const monthDay = date.toISOString().slice(5, 10); // Lấy MM-DD
  return HOLIDAYS.includes(monthDay);
}

function isDayOff() {
  const date = new Date();
  return isWeekend(date) || isHoliday(date);
}
export default isDayOff;
