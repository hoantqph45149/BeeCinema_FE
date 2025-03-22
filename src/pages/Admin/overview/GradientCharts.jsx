import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";
import { useEffect, useState } from "react";

const GradientCharts = ({ dataColors, data }) => {
  var GradientChartsColors = getChartColorsArray(dataColors);
  const [dateTime, setDateTime] = useState([]);
  const [revenue, setRevenue] = useState([]);
  console.log(dateTime);
  useEffect(() => {
    if (data) {
      setDateTime(data?.map((item) => item.date));
      setRevenue(data?.map((item) => item.revenue));
    }
  }, [data]);
  const series = [
    {
      name: "Doanh thu",
      data: revenue,
    },
  ];
  var options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },

    stroke: {
      width: 7,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: dateTime,
      tickAmount: 10,
    },
    title: {
      text: "Doanh thu theo thời gian",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#0ab39c"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 4,
      colors: GradientChartsColors,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    yaxis: {
      min: 0,
      max: revenue.length > 0 ? Math.ceil(Math.max(...revenue) * 1.1) : 1000000,
      title: {
        text: "Doanh thu",
      },
      labels: {
        formatter: (value) => {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0, // Không hiển thị số lẻ
          }).format(value);
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        dir="ltr"
        options={options}
        series={series}
        type="line"
        height={350}
        className="apex-charts"
      />
    </>
  );
};
export default GradientCharts;
