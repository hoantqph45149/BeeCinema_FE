import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  CardHeader,
} from "reactstrap";
import ReactApexChart from "react-apexcharts";

const ThongkeHoaDon = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const series = [
    {
      name: "Chưa xuất vé",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Đã xuất vé",
      data: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Đã hết hạn",
      data: [1, 1, 1, 2, 2.5, 3, 3.5],
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#008FFB", "#00E396", "#FF4560"],
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: [
        "2025-02-07",
        "2025-02-10",
        "2025-02-12",
        "2025-02-15",
        "2025-02-17",
        "2025-02-18",
      ],
      labels: { format: "dd/MM/yyyy" },
    },
    yaxis: { title: { text: "Số lượng hóa đơn" } },
    legend: { position: "top" },
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="g-3 align-items-end">
          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Chi nhánh</Label>
            <select className="form-select form-select-md">
              <option>Tất cả chi nhánh</option>
              <option>Chi nhánh 1</option>
              <option>Chi nhánh 2</option>
            </select>
          </Col>

          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Rạp</Label>
            <select className="form-select form-select-md">
              <option>Tất cả rạp</option>
              <option>Rạp 1</option>
              <option>Rạp 2</option>
            </select>
          </Col>

          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Ngày bắt đầu</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>

          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Label className="form-label">Ngày kết thúc</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>

          <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Button color="success" className="w-100">
              <i className="ri-equalizer-fill me-2"></i> Lọc
            </Button>
          </Col>
        </Row>

        <Card className="mt-4">
          <CardHeader>
            <h5 className="mb-3">Thống kê hóa đơn</h5>
          </CardHeader>
          <CardBody>
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height="350"
              className="apex-charts"
            />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ThongkeHoaDon;
