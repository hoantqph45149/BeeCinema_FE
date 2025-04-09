import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const TicketSalesTrends = ({ dataColors, data }) => {
  let linechartBasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Desktops",
      data: data?.map((item) => item.total_tickets),
    },
  ];
  let options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: linechartBasicColors,

    xaxis: {
      categories: data?.map((item) => dayjs(item.time_group).format("DD-MM")),
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="line"
        height="350"
        className="apex-charts"
      />
    </React.Fragment>
  );
};
TicketSalesTrends.propTypes = {
  dataColors: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      total_tickets: PropTypes.number.isRequired,
      time_group: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TicketSalesTrends;
