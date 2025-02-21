import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";

import "react-toastify/dist/ReactToastify.css";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { showConfirm } from "../../../Components/Common/showAlert";

const Cinema = () => {
  const { data } = useFetch(["cinemas"], "/cinemas");
  const { delete: deleteCinema } = useCRUD(["cinemas"]);
  const { patch: patchCinema } = useCRUD();
  const nav = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [cinema, setCinema] = useState({});
  useEffect(() => {
    if (data) {
      setCinemas(data);
    }
  }, [data]);

  const handleDeleteCinema = (cinema) => {
    showConfirm(
      "Xóa Rạp Chiếu",
      `Bạn có chắc muốn xóa rạp ${cinema.name} không?`,
      () => {
        deleteCinema.mutate(`/cinemas/${cinema.id}`);
      }
    );
    setCinema({});
  };

  const handleUpdateActive = (cinema) => {
    showConfirm(
      "Thay đổi trạng thái",
      "Bạn có chắc muốn thay đổi trạng thái không",
      () => {
        patchCinema.mutate({
          url: `/cinemas/${cinema.id}`,
          data: {
            ...cinema,
            is_active: cinema.is_active == 1 ? 0 : 1,
          },
        });
      }
    );
    setCinema({});
  };

  // colunms của Table
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: true,
    },
    {
      header: "Tên rạp",
      accessorKey: "name",
      enableColumnFilter: false,
    },
    {
      header: "Chi nhánh",
      accessorKey: "name_branch",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          console.log(cell.row.original),
          (
            <>
              {/* <span className="fw-medium">{cell.row.original.branches.name}</span> */}
            </>
          )
        );
      },
    },
    {
      header: "Địa chỉ",
      accessorKey: "address",
      enableColumnFilter: false,
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
                id="flexSwitchCheckRightDisabled"
                defaultChecked={cell.row.original.is_active == 1 ? true : false}
                onChange={() => handleUpdateActive(cell.row.original)}
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
                    nav(`/admin/cinema/${cell.row.original.id}/update`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    handleDeleteCinema(cell.row.original);
                    setCinema(cell.row.original);
                  }}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </Button>
              </li>
            </ul>
          </>
        );
      },
    },
  ]);

  document.title = "Customers | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý rạp chiếu" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Danh sách rạp chiếu</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => nav("/admin/cinema/add")}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Thêm
                          Rạp chiếu
                        </button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={cinemas}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      className="custom-header-css"
                      SearchPlaceholder="Search for customer, email, phone, status or something..."
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Cinema;
