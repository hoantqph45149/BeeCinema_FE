import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";

const TicketsByType = ({ dataColors, data }) => {
  let chartDonutBasicColors = getChartColorsArray(dataColors);
  const series = data?.map((item) => Number.parseInt(item.total_tickets));
  let options = {
    chart: {
      height: 300,
      type: "donut",
    },
    labels: data?.map((item) =>
      item.seat_type == 1
        ? "Ghế Thường"
        : item.seat_type == 2
        ? "Ghế VIP"
        : "Ghế Đôi"
    ),
    legend: {
      position: "bottom",
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: chartDonutBasicColors,
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
      type="donut"
      height={300}
    />
  );
};
TicketsByType.propTypes = {
  dataColors: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      total_tickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      seat_type: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TicketsByType;
