import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";
import PropTypes from "prop-types";

const TopBestSellingMovies = ({ dataColors, data }) => {
  let chartPieBasicColors = getChartColorsArray(dataColors);
  const series = data?.map((item) => Number.parseInt(item.total_tickets));
  let options = {
    chart: {
      height: 300,
      type: "pie",
    },
    labels: data?.map((item) => item.movie),
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
          let total_tickets = data[seriesIndex]?.total_tickets;
          return new Intl.NumberFormat("vi-VN").format(total_tickets) + " vé";
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
TopBestSellingMovies.propTypes = {
  dataColors: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      total_tickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      movie: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TopBestSellingMovies;
