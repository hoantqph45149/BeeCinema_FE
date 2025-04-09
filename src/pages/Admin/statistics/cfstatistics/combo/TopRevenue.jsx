import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";

const TopRevenue = ({ dataColors, data }) => {
  let chartColumnDistributedColors = getChartColorsArray(dataColors);

  const series = [
    {
      data: data?.map((item) => Number.parseInt(item.total_revenue)),
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
      categories: data?.map((item) => item.combo_name),
      labels: {
        style: {
          colors: chartColumnDistributedColors,
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return new Intl.NumberFormat("vi-VN").format(value) + " VNĐ";
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

export default TopRevenue;
