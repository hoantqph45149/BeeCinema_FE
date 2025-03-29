import ReactECharts from "echarts-for-react";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export default function TrendChart({ data }) {
  const trendChartOptions = {
    tooltip: {
      trigger: "axis",
      formatter: (params) =>
        `${params[0].name}: ${formatCurrency(params[0].value)} VND`,
    },
    xAxis: {
      type: "category",
      data: data?.map((item) => item.time),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value) => (value / 1000000).toFixed(1) + "M",
      },
    },
    series: [
      {
        data: data?.map((item) => Number.parseInt(item.revenue)),
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: "#5470c6",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(84, 112, 198, 0.5)",
              },
              {
                offset: 1,
                color: "rgba(84, 112, 198, 0.1)",
              },
            ],
          },
        },
      },
    ],
  };

  return <ReactECharts option={trendChartOptions} />;
}
