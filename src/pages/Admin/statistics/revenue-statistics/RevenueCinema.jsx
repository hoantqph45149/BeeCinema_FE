import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "./../../../../Components/Common/ChartsDynamicColor";
import PropTypes from "prop-types";

const RevenueCinema = ({ dataColors, data }) => {
  console.log(data);
  let chartPieBasicColors = getChartColorsArray(dataColors);
  const series = data?.map((item) => Number.parseInt(item.revenue));
  let options = {
    chart: {
      height: 300,
      type: "pie",
    },
    labels: data?.map((item) => item.cinema),
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
        formatter: (value, { seriesIndex }) => {
          let revenue = data[seriesIndex]?.revenue;
          return new Intl.NumberFormat("vi-VN").format(revenue) + " VND";
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
RevenueCinema.propTypes = {
  dataColors: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      revenue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      cinema: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RevenueCinema;
