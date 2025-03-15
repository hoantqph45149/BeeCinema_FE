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

const ThongkePhim = () => {
  const revenuaFim = {
    totalMovies: 5,
    totalRevenue: 12500000,
    data: [
      {
        name: "Linh Miêu",
        revenue: 5000000,
      },
      {
        name: "Hồn Ma",
        revenue: 3000000,
      },
      {
        name: "Bố Già",
        revenue: 2500000,
      },
      {
        name: "Avengers",
        revenue: 1500000,
      },
      {
        name: "Titanic",
        revenue: 500000,
      },
    ],
  };

  const maxRevenue = Math.ceil(revenuaFim.totalRevenue / 100000) * 100000; // Làm tròn lên mức gần nhất
  const interval = maxRevenue / 10;

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        return `<strong>${
          params.name
        }</strong><br/> Doanh thu (VNĐ): ${params.value.toLocaleString(
          "vi-VN"
        )}`;
      },
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: { fontSize: 12 },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: revenuaFim.data.map((item) => item.name),
    },
    yAxis: {
      type: "value",
      name: "Doanh thu (VNĐ)",
      nameLocation: "center",
      nameGap: 60,
      min: 0,
      max: maxRevenue,
      interval: interval,
      axisLabel: {
        formatter: (value) => value.toLocaleString("vi-VN"),
      },
    },
    series: [
      {
        name: "Doanh thu (VNĐ)",
        type: "bar",
        barWidth: "50%",
        data: revenuaFim.data.map((item) => item.revenue),
        color: "#00b386",
        showBackground: true,
        backgroundStyle: { color: "rgba(17, 9, 37, 0.1)" },
      },
    ],
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="g-3 align-items-end">
          <Col lg={2} md={4} sm={6} xs={12}>
            <Label className="form-label">Chi nhánh</Label>
            <select className="form-select form-select-md">
              <option defaultValue="">Tất cả chi nhánh</option>
              <option value="1">Chi nhánh 1</option>
              <option value="2">Chi nhánh 2</option>
              <option value="3">Chi nhánh 3</option>
            </select>
          </Col>
          <Col lg={2} md={4} sm={6} xs={12}>
            <Label className="form-label">Rạp</Label>
            <select className="form-select form-select-md">
              <option defaultValue="">Tất cả rạp</option>
              <option value="1">Rạp 1</option>
              <option value="2">Rạp 2</option>
              <option value="3">Rạp 3</option>
            </select>
          </Col>
          <Col lg={2} md={4} sm={6} xs={12}>
            <Label className="form-label">Ngày bắt đầu</Label>
            <Input
              type="date"
              className="form-control"
              defaultValue="2025-01-08"
            />
          </Col>
          <Col lg={2} md={4} sm={6} xs={12}>
            <Label className="form-label">Ngày kết thúc</Label>
            <Input
              type="date"
              className="form-control"
              defaultValue="2025-02-07"
            />
          </Col>
          <Col lg={2} md={4} sm={6} xs={12}>
            <Button color="success" className="w-100">
              <i className="ri-equalizer-fill me-2"></i>Lọc
            </Button>
          </Col>
        </Row>
      </Container>

      <Card className="mt-4">
        <CardBody>
          <h5 className="mb-3">Doanh thu phim</h5>

          <Row className="mb-3">
            <Col md={6} xs={12} className="text-center mb-2">
              <h6 className="text-muted">Tổng phim</h6>
              <h4 className="text-dark">{revenuaFim.totalMovies}</h4>
            </Col>
            <Col md={6} xs={12} className="text-center">
              <h6 className="text-muted">Tổng doanh thu</h6>
              <h4 className="text-dark">
                {revenuaFim.totalRevenue.toLocaleString("vi-VN")} VNĐ
              </h4>
            </Col>
          </Row>

          <div style={{ overflowX: "auto" }}>
            <ReactEcharts
              style={{ height: "400px", width: "100%" }}
              option={option}
              className="chart-responsive"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ThongkePhim;
