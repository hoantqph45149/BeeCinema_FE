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

const ThongkeCombo = () => {
  const data = [
    {
      name: "Combo Drink",
      count: 39,
    },
    {
      name: "Combo Mixed",
      count: 25,
    },
    {
      name: "Combo Premium",
      count: 35,
    },
    {
      name: "Combo Snack",
      count: 12,
    },
  ];

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        let data = params[0];
        return `<strong>${data.name}</strong><br/> ${data.value} lượt - ${(
          data.value * 42500
        ).toLocaleString()} VNĐ`;
      },
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",

      data: data.map((item) => item.name),
    },
    yAxis: {
      type: "value",

      min: 0, // Bắt đầu từ 0
      max: 40, // Giới hạn là 40 như trong ảnh
      interval: 5, // Chia đều các mốc 0 - 5 - 10 - 15 - 20 - 25 - 30 - 35 - 40
    },
    textStyle: { fontFamily: "Poppins, sans-serif" },
    color: ["#2c5282"],
    series: [
      {
        data: data.map((item) => item.count),
        type: "bar",
        barWidth: "60%",

        showBackground: true,
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
          <h5 className="mb-3">Thống kê Combo</h5>
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

export default ThongkeCombo;
