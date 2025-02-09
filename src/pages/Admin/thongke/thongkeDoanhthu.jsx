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

      data: ["22-01-2025"],
    },
    yAxis: {
      type: "value",
      name: "Doanh thu (VNĐ)",
      nameLocation: "center",
      nameTextStyle: { fontSize: 10, padding: 10 },
      nameGap: 40,
      min: 0,
      max: 500000,
      interval: 50000,
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Doanh thu",
        type: "bar",
        barWidth: "50%",
        data: [480000],
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
