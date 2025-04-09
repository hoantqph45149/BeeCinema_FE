import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";

const TypeFood = ({ dataColors, data }) => {
  let chartPieBasicColors = getChartColorsArray(dataColors);

  const foodTypes = Object.keys(data || {});
  const quantities = Object.values(data || {});

  const series = quantities;
  const labels = foodTypes;

  let options = {
    chart: {
      height: 300,
      type: "pie",
    },
    labels: labels,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: chartPieBasicColors,
    tooltip: {
      y: {
        formatter: (value) => {
          return new Intl.NumberFormat("vi-VN").format(value) + " món";
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
      type="pie"
      height={300}
    />
  );
};

export default TypeFood;
