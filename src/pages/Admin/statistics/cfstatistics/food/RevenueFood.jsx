import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";

const RevenueFood = ({ dataColors, data }) => {
  let chartColumnColors = getChartColorsArray(dataColors);

  // Dữ liệu cho biểu đồ
  const series = [
    {
      name: "Doanh thu",
      data: data?.map((item) => Number.parseInt(item.total_revenue)),
    },
  ];

  const options = {
    chart: {
      stacked: false, // Không xếp chồng vì không có rạp
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
      categories: data?.map((item) => item.name), // Tên món ăn trên trục X
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },
    colors: chartColumnColors,
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

export default RevenueFood;
