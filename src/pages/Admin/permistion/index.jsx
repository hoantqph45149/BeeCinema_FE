import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { useFetch } from "../../../Hooks/useCRUD";
import Loader from "../../../Components/Common/Loader";

const Permistion = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["roles"], "/roles/permission");
  const nav = useNavigate();
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    if (data) {
      setRoles(data.filter((item) => item.role !== "member"));
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Tên vai trò",
        accessorKey: "role",
        enableColumnFilter: false,
      },
      {
        header: "Quyền",
        accessorKey: "permissions",
        cell: (cell) => {
          const perms = cell.getValue() || [];
          const visibleCount = 6;
          const hiddenCount = perms.length - visibleCount;
          const visiblePerms = perms.slice(0, visibleCount);

          return (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              {visiblePerms.map((perm, index) => (
                <span
                  key={index}
                  className="badge bg-info text-white"
                  style={{ fontSize: "12px" }}
                >
                  {perm}
                </span>
              ))}

              {hiddenCount > 0 && (
                <span
                  className="badge bg-secondary"
                  style={{ fontSize: "12px" }}
                  title={perms.slice(visibleCount).join(", ")}
                >
                  +{hiddenCount} quyền nữa
                </span>
              )}
            </div>
          );
        },
        enableColumnFilter: false,
      },

      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item">
              <Button
                disabled={cell.row.original.role === "admin"}
                color="primary"
                className="btn-sm"
                onClick={() => {
                  nav(`/admin/update/permissions/${cell.row.original.id}`);
                }}
              >
                <i className="ri-pencil-fill"></i>
              </Button>
            </li>
          </ul>
        ),
      },
    ],
    [hasPermission, nav]
  );

  document.title = "Quản lý Quyền";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý Quyền" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="cinemaList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Danh sách Quyền</h5>
                    </div>
                    <div className="col-sm-auto">
                      {hasPermission("Thêm rạp") && (
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => nav("/admin/add/permission")}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Thêm
                          Quyền
                        </button>
                      )}
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <TableContainer
                      columns={columns}
                      data={roles || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap dt-responsive"
                      theadClass="table-light text-muted"
                      SearchPlaceholder="Tìm kiếm Quyền..."
                    />
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

export default Permistion;
