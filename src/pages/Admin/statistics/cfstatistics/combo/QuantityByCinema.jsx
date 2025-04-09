import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";

const QuantityByCinema = ({ dataColors, data }) => {
  let chartColumnStackedColors = getChartColorsArray(dataColors);

  const allCombos = [
    ...new Set(
      data?.flatMap((cinema) => cinema.data.map((item) => item.combo_name))
    ),
  ];

  // Tạo series theo từng combo với total_quantity
  const series = allCombos.map((comboName) => ({
    name: comboName,
    data: data?.map((cinema) => {
      const combo = cinema.data.find((item) => item.combo_name === comboName);
      return combo ? Number.parseInt(combo.total_quantity) : 0;
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
          return new Intl.NumberFormat("vi-VN").format(value) + " combo";
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return new Intl.NumberFormat("vi-VN").format(value) + " combo";
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

export default QuantityByCinema;
