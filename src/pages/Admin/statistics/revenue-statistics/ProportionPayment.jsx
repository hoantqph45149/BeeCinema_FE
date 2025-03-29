import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "./../../../../Components/Common/ChartsDynamicColor";

const ProportionPayment = ({ dataColors, data }) => {
  var chartPieBasicColors = getChartColorsArray(dataColors);
  console.log("ProportionPayment", data);
  const series = data?.map((item) => Number.parseInt(item.total_amount));
  var options = {
    chart: {
      height: 300,
      type: "pie",
    },
    labels: data?.map((item) => item.payment_name),
    legend: {
      position: "bottom",
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    colors: chartPieBasicColors,
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

export default ProportionPayment;
