import React from "react";
import ReactECharts from "echarts-for-react";

const BookingHeatmap = ({ date }) => {
  // Dữ liệu đã lọc chỉ từ 7h-23h
  const bookingData = [
    // Thứ Hai (17/03/2025) - Ít người
    { time: "2025-03-17 08:30:00", day: "Monday" },
    { time: "2025-03-17 10:15:00", day: "Monday" },
    { time: "2025-03-17 14:00:00", day: "Monday" },
    { time: "2025-03-17 18:45:00", day: "Monday" },

    // Thứ Ba (18/03/2025) - Bắt đầu tăng nhẹ
    { time: "2025-03-18 09:00:00", day: "Tuesday" },
    { time: "2025-03-18 11:00:00", day: "Tuesday" }, // Sửa lỗi "Politician" trong dữ liệu gốc
    { time: "2025-03-18 15:15:00", day: "Tuesday" },
    { time: "2025-03-18 17:00:00", day: "Tuesday" },
    { time: "2025-03-18 19:30:00", day: "Tuesday" },

    // Thứ Tư (19/03/2025) - Trung bình
    { time: "2025-03-19 07:45:00", day: "Wednesday" },
    { time: "2025-03-19 09:30:00", day: "Wednesday" },
    { time: "2025-03-19 12:00:00", day: "Wednesday" },
    { time: "2025-03-19 14:30:00", day: "Wednesday" },
    { time: "2025-03-19 16:15:00", day: "Wednesday" },
    { time: "2025-03-19 18:00:00", day: "Wednesday" },
    { time: "2025-03-19 20:45:00", day: "Wednesday" },

    // Thứ Năm (20/03/2025) - Tăng dần
    { time: "2025-03-20 08:00:00", day: "Thursday" },
    { time: "2025-03-20 10:45:00", day: "Thursday" },
    { time: "2025-03-20 13:30:00", day: "Thursday" },
    { time: "2025-03-20 15:00:00", day: "Thursday" },
    { time: "2025-03-20 16:00:00", day: "Thursday" },
    { time: "2025-03-20 18:30:00", day: "Thursday" },
    { time: "2025-03-20 19:15:00", day: "Thursday" },
    { time: "2025-03-20 21:00:00", day: "Thursday" },

    // Thứ Sáu (21/03/2025) - Đông hơn
    { time: "2025-03-21 07:30:00", day: "Friday" },
    { time: "2025-03-21 09:15:00", day: "Friday" },
    { time: "2025-03-21 11:45:00", day: "Friday" },
    { time: "2025-03-21 12:30:00", day: "Friday" },
    { time: "2025-03-21 15:00:00", day: "Friday" },
    { time: "2025-03-21 17:30:00", day: "Friday" },
    { time: "2025-03-21 18:15:00", day: "Friday" },
    { time: "2025-03-21 19:00:00", day: "Friday" },
    { time: "2025-03-21 19:45:00", day: "Friday" },
    { time: "2025-03-21 20:30:00", day: "Friday" },
    { time: "2025-03-21 22:00:00", day: "Friday" },

    // Thứ Bảy (22/03/2025) - Rất đông
    { time: "2025-03-22 08:15:00", day: "Saturday" },
    { time: "2025-03-22 10:00:00", day: "Saturday" },
    { time: "2025-03-22 11:15:00", day: "Saturday" },
    { time: "2025-03-22 12:45:00", day: "Saturday" },
    { time: "2025-03-22 13:00:00", day: "Saturday" },
    { time: "2025-03-22 14:30:00", day: "Saturday" },
    { time: "2025-03-22 16:00:00", day: "Saturday" },
    { time: "2025-03-22 17:15:00", day: "Saturday" },
    { time: "2025-03-22 18:00:00", day: "Saturday" },
    { time: "2025-03-22 18:45:00", day: "Saturday" },
    { time: "2025-03-22 19:30:00", day: "Saturday" },
    { time: "2025-03-22 20:15:00", day: "Saturday" },
    { time: "2025-03-22 21:00:00", day: "Saturday" },
    { time: "2025-03-22 22:30:00", day: "Saturday" },

    // Chủ Nhật (23/03/2025) - Đông nhưng giảm nhẹ
    { time: "2025-03-23 09:30:00", day: "Sunday" },
    { time: "2025-03-23 11:00:00", day: "Sunday" },
    { time: "2025-03-23 12:15:00", day: "Sunday" },
    { time: "2025-03-23 13:15:00", day: "Sunday" },
    { time: "2025-03-23 15:45:00", day: "Sunday" },
    { time: "2025-03-23 17:00:00", day: "Sunday" },
    { time: "2025-03-23 18:30:00", day: "Sunday" },
    { time: "2025-03-23 19:15:00", day: "Sunday" },
    { time: "2025-03-23 20:00:00", day: "Sunday" },

    // Thứ Hai (24/03/2025) - Ít người
    { time: "2025-03-24 08:45:00", day: "Monday" },
    { time: "2025-03-24 11:30:00", day: "Monday" },
    { time: "2025-03-24 15:00:00", day: "Monday" },
    { time: "2025-03-24 19:00:00", day: "Monday" },

    // Thứ Ba (25/03/2025) - Tăng nhẹ
    { time: "2025-03-25 09:15:00", day: "Tuesday" },
    { time: "2025-03-25 11:45:00", day: "Tuesday" },
    { time: "2025-03-25 14:15:00", day: "Tuesday" },
    { time: "2025-03-25 16:30:00", day: "Tuesday" },
    { time: "2025-03-25 18:45:00", day: "Tuesday" },

    // Thứ Tư (26/03/2025) - Trung bình
    { time: "2025-03-26 07:30:00", day: "Wednesday" },
    { time: "2025-03-26 09:00:00", day: "Wednesday" },
    { time: "2025-03-26 12:30:00", day: "Wednesday" },
    { time: "2025-03-26 15:15:00", day: "Wednesday" },
    { time: "2025-03-26 17:45:00", day: "Wednesday" },
    { time: "2025-03-26 20:00:00", day: "Wednesday" },

    // Thứ Năm (27/03/2025) - Tăng dần
    { time: "2025-03-27 08:30:00", day: "Thursday" },
    { time: "2025-03-27 10:15:00", day: "Thursday" },
    { time: "2025-03-27 13:00:00", day: "Thursday" },
    { time: "2025-03-27 15:30:00", day: "Thursday" },
    { time: "2025-03-27 17:15:00", day: "Thursday" },
    { time: "2025-03-27 19:00:00", day: "Thursday" },
    { time: "2025-03-27 21:15:00", day: "Thursday" },

    // Thứ Sáu (28/03/2025) - Trung bình
    { time: "2025-03-28 07:30:00", day: "Friday" },
    { time: "2025-03-28 09:00:00", day: "Friday" },
    { time: "2025-03-28 12:30:00", day: "Friday" },
    { time: "2025-03-28 15:15:00", day: "Friday" },
    { time: "2025-03-28 17:45:00", day: "Friday" },

    // Thứ Sáu (29/03/2025) - Tăng dần
    { time: "2025-03-29 08:30:00", day: "Saturday" },
    { time: "2025-03-29 10:15:00", day: "Saturday" },
    { time: "2025-03-29 13:00:00", day: "Saturday" },
    { time: "2025-03-29 15:30:00", day: "Saturday" },
    { time: "2025-03-29 17:15:00", day: "Saturday" },
    { time: "2025-03-29 19:00:00", day: "Saturday" },
    { time: "2025-03-29 21:15:00", day: "Saturday" },

    // Thứ Sáu (30/03/2025) - Trung bình
    { time: "2025-03-30 07:30:00", day: "Sunday" },
    { time: "2025-03-30 09:00:00", day: "Sunday" },
    { time: "2025-03-30 12:30:00", day: "Sunday" },
    { time: "2025-03-30 15:15:00", day: "Sunday" },
    { time: "2025-03-30 17:45:00", day: "Sunday" },
    { time: "2025-03-30 20:00:00", day: "Sunday" },

    // Thứ Sáu (31/03/2025) - Tăng dần
    { time: "2025-03-31 08:30:00", day: "Monday" },
    { time: "2025-03-31 10:15:00", day: "Monday" },
    { time: "2025-03-31 13:00:00", day: "Monday" },
    { time: "2025-03-31 15:30:00", day: "Monday" },
    { time: "2025-03-31 17:15:00", day: "Monday" },
    { time: "2025-03-31 19:00:00", day: "Monday" },
    { time: "2025-03-31 21:15:00", day: "Monday" },

    // Thứ Sáu (01/04/2025) - Trung bình
    { time: "2025-04-01 07:30:00", day: "Tuesday" },
    { time: "2025-04-01 09:00:00", day: "Tuesday" },
    { time: "2025-04-01 12:30:00", day: "Tuesday" },
    { time: "2025-04-01 15:15:00", day: "Tuesday" },
    { time: "2025-04-01 17:45:00", day: "Tuesday" },

    // ... (Tiếp tục cho đến 30/03/2025)
  ];

  const dayMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  const heatmapData = [];
  for (let hour = 7; hour <= 23; hour++) {
    for (let day = 0; day < 7; day++) {
      heatmapData.push([hour - 7, day, 0]);
    }
  }

  // Đếm số vé trong khoảng 7h-23h
  bookingData.forEach((booking) => {
    const date = new Date(booking.time);
    const hour = date.getHours();
    if (hour >= 7 && hour <= 23) {
      const day = dayMap[booking.day];
      const index = (hour - 7) * 7 + day; // Điều chỉnh index cho 7h-23h
      heatmapData[index][2]++;
    }
  });

  // Tính min/max cho visualMap
  const values = heatmapData.map((item) => item[2]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Cấu hình ECharts
  const option = {
    tooltip: {
      position: "top",
      formatter: (params) => {
        const hour = params.data[0] + 7; // Chuyển lại thành giờ thật (7h-23h)
        const day = [
          "Thứ Hai",
          "Thứ Ba",
          "Thứ Tư",
          "Thứ Năm",
          "Thứ Sáu",
          "Thứ Bảy",
          "Chủ Nhật",
        ][params.data[1]];
        const count = params.data[2];
        return `${day}, ${hour}h: ${count} vé`;
      },
    },
    grid: {
      height: "60%",
      top: "10%",
    },
    xAxis: {
      type: "category",
      data: Array.from({ length: 17 }, (_, i) => `${i + 7}h`), // 7h-23h
      splitArea: { show: true },
    },
    yAxis: {
      type: "category",
      data: [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ Nhật",
      ],
      splitArea: { show: true },
    },
    visualMap: {
      min: minValue,
      max: maxValue || 1, // Đảm bảo max không là 0
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "5%",
      inRange: {
        color: ["#e0f7fa", "#26c6da", "#006064"], // Gradient từ nhạt đến đậm
      },
    },
    series: [
      {
        name: "Số vé đặt",
        type: "heatmap",
        data: heatmapData,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};

export default BookingHeatmap;
