import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { showConfirm } from "../../../Components/Common/showAlert";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import Loader from "../../../Components/Common/Loader";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const Cinema = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["cinemas"], "/cinemas");
  const { patch, delete: deleteCinema } = useCRUD(["cinemas"]);
  const nav = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [cinema, setCinema] = useState({});

  useEffect(() => {
    if (data) {
      setCinemas(data);
    }
  }, [data]);

  const handleDeleteCinema = (cinema) => {
    if (hasPermission("Xóa rạp")) {
      showConfirm(
        "Xóa Rạp Chiếu",
        `Bạn có chắc muốn xóa rạp ${cinema.name} không?`,
        () => {
          deleteCinema.mutate(`/cinemas/${cinema.id}`);
        }
      );
    }
    setCinema({});
  };

  const handleUpdateActive = (cinema) => {
    if (hasPermission("Sửa rạp")) {
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không",
        () => {
          patch.mutate({
            url: `/cinemas/${cinema.id}`,
            data: {
              ...cinema,
              is_active: cinema.is_active == 1 ? 0 : 1,
            },
          });
        }
      );
    }
    setCinema({});
  };

  // Cột của Table
  const columns = useMemo(
    () => [
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
        accessorKey: "branch.name",
        enableColumnFilter: false,
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
        cell: (cell) => (
          <div className="form-check form-switch form-check-right">
            <Input
              disabled={!hasPermission("Sửa rạp")}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckRightDisabled"
              defaultChecked={cell.row.original.is_active == 1}
              onChange={() => handleUpdateActive(cell.row.original)}
            />
          </div>
        ),
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa rạp") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    nav(`/admin/cinema/${cell.row.original.id}/update`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa rạp") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeleteCinema(cell.row.original);
                    setCinema(cell.row.original);
                  }}
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </Button>
              </li>
            )}
          </ul>
        ),
      },
    ],
    [hasPermission, nav]
  );

  document.title = "Quản lý rạp chiếu";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý rạp chiếu" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="cinemaList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Danh sách rạp chiếu</h5>
                    </div>
                    <div className="col-sm-auto">
                      {hasPermission("Thêm rạp") && (
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => nav("/admin/cinema/add")}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Thêm
                          Rạp chiếu
                        </button>
                      )}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {isLoading ? (
                    <Loader />
                  ) : hasPermission("Danh sách rạp") ? (
                    <TableContainer
                      columns={columns}
                      data={cinemas}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap dt-responsive"
                      theadClass="table-light text-muted"
                      SearchPlaceholder="Tìm kiếm rạp chiếu..."
                    />
                  ) : (
                    <p>Bạn không có quyền xem danh sách rạp chiếu.</p>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Cinema;
