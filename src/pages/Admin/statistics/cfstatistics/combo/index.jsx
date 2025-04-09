import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import Loader from "../../../../../Components/Common/Loader";
import { useFetch } from "../../../../../Hooks/useCRUD";
import Widgets from "./Widgets";
import RevenueDistribution from "./revenueDistribution";
import TopRevenue from "./TopRevenue";
import RevenueByCinema from "./RevenueByCinema";
import QuantityByCinema from "./QuantityByCinema";
const ComboStatistics = () => {
  const getDefaultDates = () => ({
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [dates, setDates] = useState(getDefaultDates());
  const [filterDates, setFilterDates] = useState(getDefaultDates());

  const { data, isLoading } = useFetch(
    ["revenue-by-combo", filterDates],
    `/revenue-by-combo?start_date=${filterDates.startDate}&end_date=${filterDates.endDate}`
  );

  const handleChange = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setFilterDates(dates);
  };

  // Dữ liệu cho Widgets
  const WidgetsData = {
    total_revenue: data?.total_revenue,
    total_sold: data?.total_sold,
    best_selling_combo: data?.best_selling_combo,
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <Row>
          <Col>
            <CardHeader>
              <h4 className="card-title mb-2 fw-bold">Chọn khoảng thời gian</h4>
              <Row className="align-items-end">
                <Col md={4} lg={3}>
                  <Label className="form-label">Ngày bắt đầu</Label>
                  <Input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={dates.startDate}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={4} lg={3}>
                  <Label className="form-label">Ngày kết thúc</Label>
                  <Input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={dates.endDate}
                    onChange={handleChange}
                  />
                </Col>

                <Col lg={2} md={4} sm={6} xs={12}>
                  <Button color="primary" onClick={handleFilter}>
                    Lọc
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <Row className="mt-3">
              <Widgets data={WidgetsData} date={filterDates} />
            </Row>
            <Row className="mt-3">
              <Col xl={6}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title fs-4 fw-bold mb-0">
                      Phân bố doanh thu theo rạp
                    </h4>
                    <p className="text-muted">
                      Tỷ lệ doanh thu theo từng rạp chiếu (
                      {dayjs(filterDates.startDate).format("DD/MM/YYYY")} -
                      {dayjs(filterDates.endDate).format("DD/MM/YYYY")})
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RevenueDistribution
                      data={data?.combo_by_cinema}
                      dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xl={6}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title fs-4 fw-bold mb-0">
                      Top combo có doanh thu cao nhất
                    </h4>
                    <p className="text-muted">
                      Doanh thu của các combo theo rạp
                    </p>
                  </CardHeader>

                  <CardBody>
                    <TopRevenue
                      data={data?.top_revenue_combos}
                      dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xl={6}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title fs-4 fw-bold mb-0">
                      Doanh thu combo theo rạp
                    </h4>
                    <p className="text-muted">
                      Phân tích doanh thu từng loại combo theo rạp
                    </p>
                  </CardHeader>
                  <CardBody>
                    {" "}
                    <RevenueByCinema
                      data={data?.combo_by_cinema}
                      dataColors='["--vz-info", "--vz-primary"]'
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xl={6}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title fs-4 fw-bold mb-0">
                      Số lượng combo theo rạp
                    </h4>
                    <p className="text-muted">
                      Phân tích số lượng từng loại combo theo rạp
                    </p>
                  </CardHeader>

                  <CardBody>
                    {" "}
                    <QuantityByCinema
                      data={data?.combo_by_cinema}
                      dataColors='["--vz-info", "--vz-primary"]'
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default ComboStatistics;
