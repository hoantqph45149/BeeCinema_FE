import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../../../Components/Common/ChartsDynamicColor";

const RevenueDistribution = ({ dataColors, data }) => {
  let chartPieBasicColors = getChartColorsArray(dataColors);

  // Tính tổng doanh thu hoặc số lượng theo rạp chiếu phim
  const aggregatedData = data?.map((cinema) => ({
    cinema_name: cinema.cinema_name,
    total_revenue: cinema.data.reduce(
      (sum, item) => sum + Number.parseInt(item.total_revenue),
      0
    ),
    total_quantity: cinema.data.reduce(
      (sum, item) => sum + Number.parseInt(item.total_quantity),
      0
    ),
  }));

  // Dữ liệu cho biểu đồ (ví dụ: dùng total_revenue)
  const series = aggregatedData?.map((item) => item.total_revenue);
  const labels = aggregatedData?.map((item) => item.cinema_name);

  let options = {
    chart: {
      height: 300,
      type: "pie",
    },
    labels: labels, // Tên rạp chiếu phim
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
          let total_revenue = aggregatedData[seriesIndex]?.total_revenue;
          return new Intl.NumberFormat("vi-VN").format(total_revenue) + " VNĐ";
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

export default RevenueDistribution;
