import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { use } from "react";

const BookingHeatmap = ({ data }) => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    if (data) {
      setBookingData(data);
    }
  }, [data]);

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
