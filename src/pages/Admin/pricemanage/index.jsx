import classnames from "classnames";
import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import CinemaPrice from "./CinemaPrice";
import Holiday from "./Holiday";

document.title = "Quản lý giá vé";
const PriceManage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý giá vé" pageTitle="Danh sách" />
        <Card>
          <CardBody>
            <Nav
              className="nav-tabs nav-tabs-custom nav-success"
              role="tablist"
            >
              <NavItem>
                <NavLink
                  className={classnames(
                    { active: activeTab === "1" },
                    "fw-semibold"
                  )}
                  onClick={() => toggleTab("1", "rulePrice")}
                  href="#"
                >
                  <i className="ri-price-tag-3-fill me-1 align-bottom"></i> Giá
                  vé theo rạp
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    { active: activeTab === "2" },
                    "fw-semibold"
                  )}
                  onClick={() => toggleTab("2", "holiday")}
                  href="#"
                >
                  <i className="ri-calendar-2-fill me-1 align-bottom"></i> Ngày
                  lễ
                </NavLink>
              </NavItem>
            </Nav>
            {activeTab === "1" && <CinemaPrice />}
            {activeTab === "2" && <Holiday />}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default PriceManage;
