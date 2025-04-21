import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
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
import { formatVND } from "./../../../utils/Currency";

const Combo = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["combos"], "/combos");
  const { patch, delete: deleteCombo } = useCRUD(["combos"]);
  const nav = useNavigate();
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setCombos(data.data);
    }
  }, [data]);

  const handleDeleteCombo = (combo) => {
    if (hasPermission("Xóa combo")) {
      showConfirm(
        "Xóa Combo",
        `Bạn có chắc muốn xóa combo ${combo.name} không?`,
        () => {
          deleteCombo.mutate(`/combos/${combo.id}`);
        }
      );
    }
  };

  const handleUpdateActive = (combo) => {
    if (hasPermission("Sửa combo")) {
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không?",
        () => {
          patch.mutate({
            url: `/combos/${combo.id}`,
            data: {
              ...combo,
              is_active: combo.is_active == 1 ? 0 : 1,
            },
          });
        }
      );
    }
  };

  const columns = useMemo(
    () => [
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
        cell: (cell) => (
          <img
            src={cell.row.original.img_thumbnail}
            alt={`image-${cell.row.original.name}`}
            style={{
              maxWidth: "120px",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        header: "Thông tin",
        accessorKey: "combo_foods",
        enableColumnFilter: false,
        cell: (cell) => {
          const foods = cell.row.original.combo_foods || [];
          return foods.map((food) => (
            <div className="mb-2" key={food.id}>
              <h5 className="fs-14">
                <p className="mb-0 fw-bold">{food.name}</p>
              </h5>
              <p className="text-muted mb-0">
                Số lượng: <span className="fw-medium">{food.quantity}</span>
              </p>
            </div>
          ));
        },
      },
      {
        header: "Giá gốc",
        accessorKey: "price",
        enableColumnFilter: false,
        cell: (cell) => formatVND(Number(cell.row.original.price)),
      },
      {
        header: "Giá bán",
        accessorKey: "discount_price",
        enableColumnFilter: false,
        cell: (cell) => formatVND(Number(cell.row.original.discount_price)),
      },
      {
        header: "Hoạt động",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="form-check form-switch form-check-right">
            <Input
              disabled={!hasPermission("Sửa combo")}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id={`is_active_${cell.row.original.id}`}
              checked={cell.row.original.is_active}
              defaultChecked={cell.row.original.is_active}
              onChange={() => {
                handleUpdateActive(cell.row.original);
              }}
            />
          </div>
        ),
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa combo") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    nav(`/admin/combo/${cell.row.original.id}/edit`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa combo") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeleteCombo(cell.row.original);
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

  document.title = "Quản lý combo | Admin Dashboard";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý combo" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="comboList">
              <CardHeader className="border-0">
                <Row className="g-4 align-items-center">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách combo</h5>
                  </div>
                  <div className="col-sm-auto">
                    {hasPermission("Thêm combo") && (
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => nav("/admin/combo/add")}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Thêm
                        combo
                      </button>
                    )}
                  </div>
                </Row>
              </CardHeader>
              <div className="card-body pt-0">
                {isLoading ? (
                  <Loader />
                ) : hasPermission("Danh sách combo") ? (
                  <TableContainer
                    columns={columns}
                    data={combos || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={10}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap dt-responsive"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Tìm kiếm combo..."
                  />
                ) : (
                  <p>Bạn không có quyền xem danh sách combo.</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Combo;
