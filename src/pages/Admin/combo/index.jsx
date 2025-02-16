import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  Modal,
  Row,
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useFetch } from "../../../Hooks/useCRUD";
import { formatVND } from "./../../../utils/Currency";

const Combo = () => {
  const { data } = useFetch(["combos"], "/combos");
  const nav = useNavigate();
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    if (data) {
      setCombos(data.data);
    }
  }, [data]);

  console.log(combos);
  // Customers Column
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
    },
    {
      header: "Tên",
      accessorKey: "name",
      enableColumnFilter: false,
    },

    {
      header: "Hình ảnh",
      accessorKey: "img_thumbnail",
      enableColumnFilter: false,
      cell: (cell) => {
        // console.log(cell);
        return (
          <>
            <img
              src={cell.row.original.img_thumbnail}
              alt={`image-${cell.row.original.name}`}
              style={{
                maxWidth: "120px",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </>
        );
      },
    },
    {
      header: "Thông tin",
      accessorKey: "combo_foods",
      enableColumnFilter: false,
      cell: (cell) => {
        const foods = cell.row.original.combo_foods;
        return (
          <>
            {foods.map((food) => {
              return (
                <div className="mb-2">
                  <h5 className="fs-14">
                    <p className="mb-0 fw-bold">{food.name}</p>
                  </h5>
                  <p className="text-muted mb-0">
                    Số lượng :{" "}
                    <span className="fw-medium">{food.quantity}</span>
                  </p>
                </div>
              );
            })}
          </>
        );
      },
    },
    {
      header: "Giá gốc",
      accessorKey: "price",
      enableColumnFilter: false,
      cell: (cell) => {
        return formatVND(Number(cell.row.original.price));
      },
    },
    {
      header: "Giá bán",
      accessorKey: "discount_price",
      enableColumnFilter: false,
      cell: (cell) => {
        const price = formatVND(Number(cell.row.discount_price));
        console.log(price);
        return price;
      },
    },
    {
      header: "Hoạt động",
      accessorKey: "is_active",
      enableColumnFilter: false,
      cell: (cell) => {
        // console.log(cell);
        return (
          <>
            <div className="form-check form-switch form-check-right">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="is_active"
                defaultChecked={cell.row.original.is_active}
                // onChange={() => handleUpdateActive(cell.row.original)}
              />
            </div>
          </>
        );
      },
    },

    {
      header: "Action",
      cell: (cell) => {
        return (
          <>
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    nav(`/admin/combo/${cell.row.original.id}/edit`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
              {/* <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm "
                  // onClick={() => {
                  //   handleDeleteBranche(cell.row.original);
                  //   setBranche(cell.row.original);
                  // }}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </Button>
              </li> */}
            </ul>
          </>
        );
      },
    },
  ]);

  document.title = "Danh sách combo";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý đồ ăn" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Danh sách đồ ăn</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => {
                            nav("/admin/combo/add");
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Thêm
                          đồ ăn
                        </button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={combos || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={10}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap dt-responsive"
                      theadClass="table-light text-muted"
                      SearchPlaceholder="Search for order ID, customer, order status or something..."
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Combo;
