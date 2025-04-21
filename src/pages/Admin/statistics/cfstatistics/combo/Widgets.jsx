import dayjs from "dayjs";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { formatLargeNumber, formatVND } from "../../../../../utils/Currency";

const Widgets = ({ data, date }) => {
  const ecomWidgets = [
    {
      id: 1,
      cardColor: "primary",
      label: "Tổng tiền bán ra",
      badgeClass: "success",
      counter: formatLargeNumber(data?.total_revenue).value,
      suffix: formatLargeNumber(data?.total_revenue).suffix,
      link: `Từ ${dayjs(date.startDate).format("DD-MM-YYYY")} đến ${dayjs(
        date.endDate
      ).format("DD-MM-YYYY")} tại tất cả các rạp`,
      bgcolor: "success",
      icon: "ri-ticket-2-line",
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Tổng số lượng combo bán ra",
      badgeClass: "danger",
      counter: `${data?.total_sold}`,
      link: `Từ ${dayjs(date.startDate).format("DD-MM-YYYY")} đến ${dayjs(
        date.endDate
      ).format("DD-MM-YYYY")} tại tất cả các rạp`,
      bgcolor: "info",
      decimals: 2,
      icon: "ri-calendar-2-line",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Combo bán chạy nhất",
      badgeClass: "success",
      counter: data?.best_selling_combo?.combo_name,
      link: `Tổng doanh thu ${formatVND(
        Number(data?.best_selling_combo?.total_revenue)
      )} tại ${data?.best_selling_combo?.cinema_name}`,
      bgcolor: "warning",
      icon: "ri-time-line",
    },
  ];
  return (
    <React.Fragment>
      {ecomWidgets.map((item, key) => (
        <Col xl={4} md={6} key={key}>
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
                        item.counter
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

export default Widgets;
