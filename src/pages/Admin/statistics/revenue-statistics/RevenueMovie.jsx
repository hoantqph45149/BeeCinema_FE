import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "./../../../../Components/Common/ChartsDynamicColor";

const RevenueMovie = ({ dataColors, data }) => {
  const BasicColors = getChartColorsArray(dataColors);
  const series = [
    {
      data: data?.map((item) => item.revenue),
    },
  ];

  const options = {
    chart: {
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: BasicColors,
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: data?.map((item) => item.movie),
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => {
          return new Intl.NumberFormat("vi-VN").format(value) + " VND";
        },
      },
    },
  };

  return (
    <ReactApexChart
      dir="ltr"
      className="apex-charts"
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default RevenueMovie;
