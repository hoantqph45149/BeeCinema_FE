import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";

const TheaterOccupancyRate = ({ dataColors, data }) => {
  let chartColumnStacked100Colors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Ghế đã đặt",
      data: data?.map((item) => item.booked_seats) || [],
    },
    {
      name: "Ghế trống",
      data: data?.map((item) => item.empty_seats) || [],
    },
  ];

  const options = {
    chart: {
      stacked: !0,
      stackType: "100%",
      toolbar: {
        show: !1,
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
      categories: data?.map((item) => item.cinema),
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },
    colors: chartColumnStacked100Colors,
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
TheaterOccupancyRate.propTypes = {
  dataColors: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      booked_seats: PropTypes.number.isRequired,
      empty_seats: PropTypes.number.isRequired,
      cinema: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TheaterOccupancyRate;
