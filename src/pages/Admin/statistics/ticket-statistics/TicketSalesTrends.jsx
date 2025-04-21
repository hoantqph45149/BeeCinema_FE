import dayjs from "dayjs";
import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../Components/Common/ChartsDynamicColor";

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

export default TicketSalesTrends;
