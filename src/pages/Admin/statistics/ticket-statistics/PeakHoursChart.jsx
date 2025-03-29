import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const PeakHoursChart = ({ dataColors, data }) => {
  let chartColumnDistributedColors = getChartColorsArray(dataColors);
  const series = [
    {
      data: data?.map((item) => item.total_tickets),
    },
  ];
  let options = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function () {},
      },
    },
    colors: chartColumnDistributedColors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: data?.map((item) =>
        dayjs().hour(item?.hour).minute(0).second(0).format("HH:mm")
      ),
      labels: {
        style: {
          colors: [
            "#038edc",
            "#51d28c",
            "#f7cc53",
            "#f34e4e",
            "#564ab1",
            "#5fd0f3",
          ],
          fontSize: "12px",
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
PeakHoursChart.propTypes = {
  dataColors: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      total_tickets: PropTypes.number.isRequired,
      hour: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PeakHoursChart;
