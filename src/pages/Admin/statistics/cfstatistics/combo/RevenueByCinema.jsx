import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";

const RevenueByCinema = ({ dataColors, data }) => {
  let chartColumnStackedColors = getChartColorsArray(dataColors);

  // Lấy danh sách tất cả các combo duy nhất từ dữ liệu
  const allCombos = [
    ...new Set(
      data?.flatMap((cinema) => cinema.data.map((item) => item.combo_name))
    ),
  ];

  // Tạo series theo từng combo
  const series = allCombos.map((comboName) => ({
    name: comboName,
    data: data?.map((cinema) => {
      const combo = cinema.data.find((item) => item.combo_name === comboName);
      return combo ? Number.parseInt(combo.total_revenue) : 0;
    }),
  }));

  const options = {
    chart: {
      stacked: true, // Xếp chồng các cột
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: data?.map((item) => item.cinema_name), // Tên rạp trên trục X
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },
    colors: chartColumnStackedColors,
    tooltip: {
      y: {
        formatter: (value) => {
          return new Intl.NumberFormat("vi-VN").format(value) + " VNĐ";
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return new Intl.NumberFormat("vi-VN").format(value) + " VNĐ";
        },
      },
    },
  };

  return (
    <ReactApexChart
      dir="ltr"
      className="apex-charts"
      series={series}
      options={options}
      type="bar"
      height={350}
    />
  );
};

export default RevenueByCinema;
