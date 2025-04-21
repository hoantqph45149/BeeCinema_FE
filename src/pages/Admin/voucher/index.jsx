import React, { useMemo } from "react";
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
import dayjs from "dayjs";
import { showConfirm } from "../../../Components/Common/showAlert";
import TableContainer from "../../../Components/Common/TableContainer";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { formatVND } from "../../../utils/Currency";
import Loader from "../../../Components/Common/Loader";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const Voucher = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["vouchers"], "/vouchers");
  const { patch: patchVoucher, delete: deleteVoucher } = useCRUD(["vouchers"]);
  const nav = useNavigate();

  const handleUpdateActive = (voucher) => {
    if (hasPermission("Sửa vouchers")) {
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không?",
        () => {
          patchVoucher.mutate({
            url: `/vouchers/${voucher.id}`,
            data: {
              ...voucher,
              is_active: voucher.is_active ? false : true,
            },
          });
        }
      );
    }
  };

  const handleDeleteVoucher = (voucher) => {
    if (hasPermission("Xóa vouchers")) {
      showConfirm(
        "Xóa Voucher",
        `Bạn có chắc muốn xóa voucher có mã ${voucher.code} không?`,
        () => {
          deleteVoucher.mutate(`/vouchers/${voucher.id}`);
        }
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Mã voucher",
        accessorKey: "code",
        enableColumnFilter: false,
      },
      {
        header: "Số tiền tối thiểu",
        accessorKey: "min_order_amount",
        enableColumnFilter: false,
        cell: (cell) => (
          <span>{formatVND(cell.row.original.min_order_amount)}</span>
        ),
      },
      {
        header: "Thời gian sử dụng",
        accessorKey: "time",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="d-flex flex-column">
            <span>
              <strong>Bắt đầu:</strong>{" "}
              {dayjs(cell.row.original.start_date).format("DD/MM/YYYY")}
            </span>
            <span>
              <strong>Kết thúc:</strong>{" "}
              {dayjs(cell.row.original.end_date).format("DD/MM/YYYY")}
            </span>
          </div>
        ),
      },
      {
        header: "Giảm giá",
        accessorKey: "discount_value",
        enableColumnFilter: false,
        cell: (cell) =>
          cell.row.original.discount_type === "percent" ? (
            <span>{`${cell.row.original.discount_value}%`}</span>
          ) : (
            <span>{formatVND(cell.row.original.discount_value)}</span>
          ),
      },
      {
        header: "Số lượng",
        accessorKey: "quantity",
        enableColumnFilter: false,
      },
      {
        header: "Đã dùng",
        accessorKey: "used_count",
        enableColumnFilter: false,
      },
      {
        header: "Giới hạn lượt sử dụng",
        accessorKey: "per_user_limit",
        enableColumnFilter: false,
      },
      {
        header: "Hoạt động",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="form-check form-switch form-check-right">
            <Input
              disabled={
                cell.row.original.used_count > 0 ||
                dayjs(cell.row.original.end_date).isBefore(dayjs()) ||
                !hasPermission("Sửa vouchers")
              }
              className="form-check-input"
              type="checkbox"
              role="switch"
              id={`is_active_${cell.row.original.id}`}
              checked={cell.row.original.is_active}
              defaultChecked={cell.row.original.is_active}
              onChange={() => handleUpdateActive(cell.row.original)}
            />
          </div>
        ),
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa vouchers") && (
              <li className="list-inline-item">
                <Button
                  disabled={dayjs(cell.row.original.end_date).isBefore(dayjs())}
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    nav(`/admin/voucher/${cell.row.original.id}/edit`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa vouchers") && (
              <li className="list-inline-item">
                <Button
                  disabled={
                    cell.row.original.used_count > 0 ||
                    dayjs(cell.row.original.end_date).isBefore(dayjs())
                  }
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeleteVoucher(cell.row.original);
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

  document.title = "Quản lý voucher | Admin Dashboard";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý voucher" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="voucherList">
              <CardHeader className="border-0">
                <Row className="g-4 align-items-center">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách voucher</h5>
                  </div>
                  <div className="col-sm-auto">
                    {hasPermission("Thêm vouchers") && (
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => nav("/admin/voucher/add")}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Thêm
                        voucher
                      </button>
                    )}
                  </div>
                </Row>
              </CardHeader>
              <div className="card-body pt-0">
                {isLoading ? (
                  <Loader />
                ) : hasPermission("Danh sách vouchers") ? (
                  <TableContainer
                    columns={columns}
                    data={data || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Tìm kiếm voucher..."
                  />
                ) : (
                  <p>Bạn không có quyền xem danh sách voucher.</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Voucher;
