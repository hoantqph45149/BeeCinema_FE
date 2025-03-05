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

const Voucher = () => {
  const { data } = useFetch(["vouchers"], "/vouchers");
  const { patch: patchVoucher, delete: deleteVoucher } = useCRUD(["vouchers"]);
  const nav = useNavigate();

  const handleUpdateActive = (voucher) => {
    showConfirm(
      "Thay đổi trạng thái",
      "Bạn có chắc muốn thay đổi trạng thái không",
      () => {
        patchVoucher.mutate({
          url: `/vouchers/${voucher.id}`,
          data: {
            ...voucher,
            is_active: voucher.is_active === true ? false : true,
          },
        });
      }
    );
  };

  const handleDeleteVoucher = (voucher) => {
    showConfirm(
      "Xóa Chi Nhánh",
      `Bạn có chắc muốn xóa voucher có mã là ${voucher.code} không?`,
      () => {
        deleteVoucher.mutate(`/vouchers/${voucher.id}`);
      }
    );
  };

  const columns = useMemo(() => [
    {
      header: "Mã voucher",
      accessorKey: "code",
      enableColumnFilter: false,
    },
    {
      header: "Tiêu đề",
      accessorKey: "title",
      enableColumnFilter: false,
    },
    {
      header: "Thời gian sử dụng",
      accessorKey: "time",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <div className="d-flex flex-column">
            <span>
              <strong>Bắt đầu:</strong> {cell.row.original.start_date_time}
            </span>
            <span>
              <strong>Kết thúc:</strong> {cell.row.original.end_date_time}
            </span>
          </div>
        );
      },
    },
    {
      header: "Giảm giá",
      accessorKey: "discount",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <span>
            {cell.row.original.type === "percent"
              ? `${cell.row.original.discount}%`
              : formatVND(cell.row.original.discount)}
          </span>
        );
      },
    },
    {
      header: "Số lượng",
      accessorKey: "quantity",
      enableColumnFilter: false,
    },
    {
      header: "Đã dùng",
      accessorKey: "total_usage",
      enableColumnFilter: false,
    },
    {
      header: "Giới hạn",
      accessorKey: "limit",
      enableColumnFilter: false,
    },
    {
      header: "Hoạt động",
      accessorKey: "online1",
      enableColumnFilter: false,
      cell: (cell) => {
        // console.log(cell);
        return (
          <>
            <div className="form-check form-switch form-check-right">
              <Input
                disabled={
                  cell.row.original.total_usage > 0 ||
                  dayjs(cell.row.original.end_date_time).isBefore(dayjs())
                }
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckRightDisabled"
                defaultChecked={cell.row.original.is_active}
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
                  disabled={
                    cell.row.original.total_usage > 0 ||
                    dayjs(cell.row.original.end_date_time).isBefore(dayjs())
                  }
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    nav(`/admin/voucher/${cell.row.original.id}/edit`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
              <li className="list-inline-item">
                <Button
                  disabled={
                    cell.row.original.total_usage > 0 ||
                    dayjs(cell.row.original.end_date_time).isBefore(dayjs())
                  }
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    handleDeleteVoucher(cell.row.original);
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

  document.title = "Voucher | Quản lý";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý Voucher" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Danh sách Voucher</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => nav("/admin/voucher/add")}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Thêm
                          voucher
                        </button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={data || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap"
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
    </React.Fragment>
  );
};

export default Voucher;
