import React from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import ReactEcharts from "echarts-for-react";

const ThongkeDoanhthu = () => {
  const data = {
    data: [
      { date: "2025-01-01", revenue: 350000 },
      { date: "2025-01-02", revenue: 480000 },
      { date: "2025-01-03", revenue: 520000 },
      { date: "2025-01-04", revenue: 610000 },
      { date: "2025-01-05", revenue: 430000 },
      { date: "2025-01-06", revenue: 540000 },
      { date: "2025-01-07", revenue: 720000 },
      { date: "2025-01-08", revenue: 680000 },
      { date: "2025-01-09", revenue: 490000 },
      { date: "2025-01-10", revenue: 580000 },
      { date: "2025-01-11", revenue: 630000 },
      { date: "2025-01-12", revenue: 750000 },
      { date: "2025-01-13", revenue: 670000 },
      { date: "2025-01-14", revenue: 600000 },
      { date: "2025-01-15", revenue: 730000 },
      { date: "2025-01-16", revenue: 810000 },
      { date: "2025-01-17", revenue: 720000 },
      { date: "2025-01-18", revenue: 680000 },
      { date: "2025-01-19", revenue: 590000 },
      { date: "2025-01-20", revenue: 640000 },
      { date: "2025-01-21", revenue: 780000 },
      { date: "2025-01-22", revenue: 850000 },
      { date: "2025-01-23", revenue: 920000 },
      { date: "2025-01-24", revenue: 880000 },
      { date: "2025-01-25", revenue: 760000 },
      { date: "2025-01-26", revenue: 690000 },
      { date: "2025-01-27", revenue: 710000 },
      { date: "2025-01-28", revenue: 800000 },
      { date: "2025-01-29", revenue: 870000 },
      { date: "2025-01-30", revenue: 930000 },
      { date: "2025-01-31", revenue: 990000 },
    ],
  };
  const revenues = data.data.map((item) => item.revenue);
  const maxRevenue = Math.ceil(Math.max(...revenues, 0) / 100000) * 100000;
  const interval = maxRevenue / 5;
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        let data = params[0];
        return `<strong>${
          data.name
        }</strong><br/> ${data.value.toLocaleString()} VNĐ`;
      },
    },
    legend: {
      // Thêm ghi chú giống trong ảnh
      top: "5%", // Đặt vị trí thanh ghi chú
      left: "center",

      textStyle: {
        fontSize: 12,
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "15%", // Dịch xuống để có khoảng trống cho tiêu đề và ghi chú
      containLabel: true,
    },
    xAxis: {
      type: "category",
      name: "Thời gian",
      nameLocation: "center",
      nameTextStyle: { fontSize: 10, padding: 10 },
      nameGap: 10,

      data: data.data.map((item) => item.date),
    },
    yAxis: {
      type: "value",
      name: "Doanh thu (VNĐ)",
      nameLocation: "center",
      nameTextStyle: { fontSize: 10, padding: 10 },
      nameGap: 40,
      min: 0,
      max: maxRevenue,
      interval: interval,
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Doanh thu",
        type: "bar",
        barWidth: "50%",
        data: data.data.map((item) => item.revenue),
        color: "  #2c5282",
        showBackground: true,
        backgroundStyle: { color: "rgba(17, 9, 37, 0.1)" },
      },
    ],
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="g-3 align-items-end">
          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Chi nhánh</Label>
            <select className="form-select form-select-md">
              <option defaultValue="">Tất cả chi nhánh</option>
              <option value="1">Chi nhánh 1</option>
              <option value="2">Chi nhánh 2</option>
              <option value="3">Chi nhánh 3</option>
            </select>
          </Col>
          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Rạp</Label>
            <select className="form-select form-select-md">
              <option defaultValue="">Tất cả rạp</option>
              <option value="1">Rạp 1</option>
              <option value="2">Rạp 2</option>
              <option value="3">Rạp 3</option>
            </select>
          </Col>
          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Ngày bắt đầu</Label>
            <Input type="date" className="form-control" />
          </Col>
          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Ngày kết thúc</Label>
            <Input type="date" className="form-control" />
          </Col>
          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Button color="success" className="w-100">
              <i className="ri-equalizer-fill me-2"></i>Lọc
            </Button>
          </Col>
        </Row>
      </Container>

      <Card className="mt-4">
        <CardBody>
          <h5 className="mb-3">Thống kê Doanh thu</h5>
          <ReactEcharts
            style={{ height: "400px", width: "100%" }}
            option={option}
            className="chart-responsive"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ThongkeDoanhthu;
