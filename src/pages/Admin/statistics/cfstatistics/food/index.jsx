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
import TypeFood from "./TypeFood";
import TopSelling from "./TopSelling";
import RevenueFood from "./RevenueFood";
import { useAuthContext } from "../../../../../Contexts/auth/UseAuth";
const FoodsStatistics = () => {
  const { authUser } = useAuthContext();

  const { data: cinemas } = useFetch(
    ["cinemas", authUser?.cinema_id],
    `/cinemas`,
    {
      enabled: !authUser?.cinema_id,
    }
  );

  const getDefaultDates = () => ({
    startDate: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    cinema_id: authUser?.cinema_id || "",
    food_type: "",
  });

  const [dates, setDates] = useState(getDefaultDates());
  const [filterDates, setFilterDates] = useState(getDefaultDates());

  const buildApiUrl = () => {
    let url = `/revenue-by-food?start_date=${filterDates.startDate}&end_date=${filterDates.endDate}`;
    if (filterDates.food_type) {
      url += `&food_type=${filterDates.food_type}`;
    }
    if (filterDates.cinema_id) {
      url += `&cinema_id=${filterDates.cinema_id}`;
    }
    return url;
  };

  const { data, isLoading } = useFetch(
    ["revenue-by-food", filterDates],
    buildApiUrl()
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
    total_sold: data?.total_sold,
    best_selling_food: data?.best_selling_food,
    most_valuable_food: data?.most_valuable_food,
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
                <Col md={4} lg={3}>
                  <Label htmlFor="type_food" className="form-label">
                    Loại đồ ăn
                  </Label>
                  <select
                    id="type_food"
                    className="form-select"
                    name="food_type"
                    value={dates.food_type}
                    onChange={handleChange}
                  >
                    <option value="">Tất cả</option>
                    <option value="Đồ Ăn">Đồ ăn</option>
                    <option value="Đồ Uống">Đồ uống</option>
                  </select>
                </Col>
                {!authUser?.cinema_id && (
                  <Col md={4} lg={3}>
                    <Label htmlFor="cinema_id" className="form-label">
                      Rạp chiếu
                    </Label>
                    <select
                      name="cinema_id"
                      id="cinema_id"
                      className="form-select"
                      value={dates.cinema_id}
                      onChange={handleChange}
                    >
                      <option value="">--- Tất cả ---</option>
                      {cinemas?.map((cinema) => (
                        <option key={cinema.id} value={cinema.id}>
                          {cinema.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                )}
                <Col lg={2} md={4} sm={6} xs={12}>
                  <Button
                    className="w-100"
                    color="primary mt-2"
                    onClick={handleFilter}
                  >
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
                      Phân bố sản phẩm theo loại
                    </h4>
                    <p className="text-muted">
                      Tỷ lệ giữa đồ ăn và đồ uống đã bán
                    </p>
                  </CardHeader>
                  <CardBody>
                    {" "}
                    <TypeFood
                      data={data?.food_distribution_by_type}
                      dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col xl={6}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title fs-4 fw-bold mb-0">
                      Top sản phẩm bán chạy
                    </h4>
                    <p className="text-muted">
                      Số lượng bán ra của các sản phẩm bán chạy nhất
                    </p>
                  </CardHeader>

                  <CardBody>
                    {" "}
                    <TopSelling
                      data={data?.top_selling_foods}
                      dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Card>
                  <CardHeader>
                    <h4 className="card-title fs-4 fw-bold mb-0">
                      Doanh thu theo sản phẩm
                    </h4>
                    <p className="text-muted">
                      Doanh thu của các sản phẩm bán chạy nhất
                    </p>
                  </CardHeader>
                  <CardBody>
                    {" "}
                    <RevenueFood
                      data={data?.top_selling_foods}
                      dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]'
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

export default FoodsStatistics;
