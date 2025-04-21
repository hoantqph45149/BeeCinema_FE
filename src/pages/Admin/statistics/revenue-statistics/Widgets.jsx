import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { formatLargeNumber, formatVND } from "../../../../utils/Currency";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const Widgets = ({ data, date }) => {
  const ecomWidgets = [
    {
      id: 1,
      cardColor: "primary",
      label: "Tổng doanh thu",
      badgeClass: "success",
      counter: formatLargeNumber(data?.totalRevenue).value,
      suffix: formatLargeNumber(data?.totalRevenue).suffix,
      link: `Từ ${dayjs(date.startDate).format("DD-MM-YYYY")} đến ${dayjs(
        date.endDate
      ).format("DD-MM-YYYY")}`,
      bgcolor: "success",
      icon: "bx bx-dollar-circle",
      decimals: 2,
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Rạp có doanh thu cao nhất",
      badgeClass: "danger",
      counter: data?.cinemaRevenue?.cinema,
      link: `${formatVND(Number(data?.cinemaRevenue?.revenue))} chiếm ${
        data?.cinemaRevenue?.percentage
      } tổng doanh thu`,
      bgcolor: "info",
      icon: "ri-store-2-fill",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Phim có doanh thu cao nhất",
      badgeClass: "success",
      counter: data?.movieRevenue?.movie,
      link: `Doanh thu ${formatVND(Number(data?.movieRevenue?.revenue))}`,
      bgcolor: "warning",
      icon: "ri-movie-2-line",
    },
    {
      id: 4,
      cardColor: "info",
      label: "Phương thức thanh toán phổ biến",
      badgeClass: "muted",
      counter: data?.paymentMethod?.payment_name,
      link: `Chiếm ${data?.paymentMethod?.percentage} lượt thanh toán`,
      bgcolor: "primary",
      icon: "bx bx-wallet",
    },
  ];
  return (
    <React.Fragment>
      {ecomWidgets.map((item, key) => (
        <Col xl={3} md={6} key={key}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {item.label}
                  </p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={
                      "avatar-title rounded fs-3 bg-" + item.bgcolor + "-subtle"
                    }
                  >
                    <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-2">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value" data-target="559.25">
                      {typeof item.counter === "number" ? (
                        <CountUp
                          start={0}
                          end={item.counter}
                          decimals={item.decimals || 0}
                          duration={4}
                          separator=","
                          suffix={item.suffix || ""}
                        />
                      ) : (
                        item.counter // Hiển thị trực tiếp nếu là chuỗi
                      )}
                    </span>
                  </h4>
                  <Link to="#">{item.link}</Link>
                </div>
                <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                  {item.badge ? (
                    <i className={"fs-13 align-middle " + item.badge}></i>
                  ) : null}{" "}
                  {item.percentage}
                </h5>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};
Widgets.propTypes = {
  data: PropTypes.object.isRequired,
  date: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default Widgets;
