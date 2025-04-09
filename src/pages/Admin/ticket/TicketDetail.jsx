import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Loading from "../../../Components/Common/Loading";
import { useFetch } from "../../../Hooks/useCRUD";
import { formatVND } from "./../../../utils/Currency";
import PrintTicket from "./../print-ticket/index";

const TicketDetail = () => {
  const { code } = useParams();
  const { data, isLoading } = useFetch(["tickets", code], `/tickets/${code}`);
  const [modal, setModal] = useState(false);
  const [ticket, setTicket] = useState({});
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  useEffect(() => {
    if (data) {
      setTicket(data.ticket);
    }
  }, [data]);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Chi tiết vé xem phim" pageTitle="Quản lý" />
        {isLoading ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : (
          <>
            <Row>
              <Col lg={8}>
                <Card>
                  <CardHeader className="align-items-center justify-content-between d-flex">
                    <Link
                      to="/admin/ticket"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Danh sách
                    </Link>
                    {ticket?.status !== "Đã hết hạn" && (
                      <PrintTicket ticket={ticket} />
                    )}
                  </CardHeader>
                  <CardBody>
                    <div className="table-responsive table-card mb-1">
                      <Table className="align-middle table-nowrap">
                        <thead className="table-light text-muted">
                          <tr>
                            <th scope="col">Phim</th>
                            <th scope="col">Thông tin xuất chiếu</th>
                            <th scope="col">Ghế</th>
                            <th scope="col">Tổng tiền ghế</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center flex-column">
                                <img
                                  src={ticket?.movie?.img}
                                  alt={ticket?.movie?.name}
                                  style={{
                                    width: "150px",
                                  }}
                                />
                                <div className="flex-grow-1 py-2">
                                  <h5 className="fs-6">
                                    {ticket?.movie?.name}
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="container">
                                <p>
                                  <strong>Thời Lượng:</strong>{" "}
                                  {ticket?.movie?.duration} Phút
                                </p>
                                <p>
                                  <strong>Độ Tuổi:</strong> {ticket?.movie?.age}
                                </p>
                                <p>
                                  <strong>Định Dạng:</strong>{" "}
                                  {ticket?.showtime?.format}
                                </p>
                                <p>
                                  <strong>Thể Loại:</strong>{" "}
                                  {ticket?.movie?.category}
                                </p>
                                <p>
                                  <strong>Lịch Chiếu:</strong>{" "}
                                  {dayjs(ticket?.showtime?.start_time).format(
                                    "HH:mm"
                                  )}{" "}
                                  ~{" "}
                                  {dayjs(ticket?.showtime?.end_time).format(
                                    "HH:mm"
                                  )}{" "}
                                  (
                                  {dayjs(ticket?.showtime?.end_time).format(
                                    "DD/MM/YYYY"
                                  )}
                                  )
                                </p>
                                <p>
                                  <strong>Địa Điểm:</strong> Rạp chiếu BEECINEM{" "}
                                  {ticket?.cinema?.name}
                                </p>
                              </div>
                            </td>
                            <td className="fw-bold text-wrap">
                              {ticket?.seats?.details
                                ?.map((item) => item.seat_name)
                                .join(", ")}
                            </td>

                            <td className="fw-bold text-end">
                              {formatVND(ticket?.seats?.total_seat_price)}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    {ticket?.combos?.details.length > 0 && (
                      <div className="table-responsive table-card mb-1">
                        <Table className="align-middle table-nowrap">
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col">Combo</th>
                              <th scope="col">Thông tin Combo</th>
                              <th scope="col">Số Lượng</th>
                              <th scope="col">Giá Combo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ticket?.combos?.details?.map((item) => (
                              <tr key={item.combo_id}>
                                <td>
                                  <div className="d-flex align-items-center flex-column">
                                    <img
                                      src={item.img}
                                      alt=""
                                      className="avatar avatar-lg rounded-circle"
                                    />
                                    <div className="flex-grow-1 py-2">
                                      <h5 className="fs-7">
                                        {item.combo_name}
                                      </h5>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="container">
                                    {item.foods.map((food) => (
                                      <p key={food.food_id}>
                                        <strong>
                                          {food.food_name} x ({food.quantity})
                                        </strong>
                                      </p>
                                    ))}
                                  </div>
                                </td>
                                <td className="fw-bold">
                                  {item.quantity} x{" "}
                                  {formatVND(Number(item.price_per_unit))}
                                </td>
                                <td className="fw-bold text-end">
                                  {formatVND(item.total_price)}
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td className="text-end fw-bold" colSpan={2}>
                                Tổng tiền combo
                              </td>
                              <td colSpan={2} className="fw-bold text-end">
                                {formatVND(ticket?.combos?.total_combo_price)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    )}
                    <div className="table-responsive table-card mb-1">
                      <Table className="align-middle table-nowrap">
                        <tbody>
                          <tr>
                            <td colSpan={3} className="text-end fw-bold">
                              Giảm giá voucher
                            </td>
                            <td className="text-end fw-bold">
                              {ticket?.voucher_discount}
                            </td>
                          </tr>
                          {/* <tr>
                            <td colSpan={3} className="text-end fw-bold">
                              Giảm giá của MemberShip
                              <p className="text-muted fw-medium">
                                (Chỉ áp dụng vào ngày cuối tuần và những ngày
                                lễ)
                              </p>
                            </td>
                            <td className="text-end fw-bold">
                              {ticket?.point_discount}
                            </td>
                          </tr> */}
                          <tr>
                            <td colSpan={3} className="text-end fw-bold">
                              Đổi điểm
                            </td>
                            <td className="text-end fw-bold">
                              {ticket?.point_discount}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="text-end fw-bold">
                              Tổng tiền
                            </td>
                            <td className="text-end fw-bold">
                              {formatVND(ticket?.total_price)}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={4}>
                <Card>
                  <CardHeader>
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Thông tin vé</h5>
                    </div>
                  </CardHeader>
                  <CardBody className="p-4 d-flex flex-column gap-2">
                    <p>
                      <strong>Trạng thái:</strong>

                      <Button
                        size="sm"
                        className="ms-2"
                        color={
                          ticket?.status == "Đã thanh toán"
                            ? "primary"
                            : ticket?.status == "Đã xuất vé"
                            ? "succses"
                            : "danger"
                        }
                      >
                        {ticket?.status}
                      </Button>
                    </p>
                    <p>
                      <strong>Thanh toán lúc:</strong>
                      <span className="fw-medium ms-2">
                        {dayjs(ticket?.create_at).format("HH:mm")} (
                        {dayjs(ticket?.create_at).format("DD/MM/YYYY")})
                      </span>
                    </p>
                    <p>
                      <strong>Thanh toán bằng:</strong>
                      <span className="fw-medium ms-2">
                        {ticket?.payment_name}
                      </span>
                    </p>
                    <div className="mt-3 d-flex gap-1 justify-content-center flex-column align-items-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket?.code}`}
                        alt=""
                        style={{
                          maxWidth: "200px",
                        }}
                      />
                      <span>{ticket?.code}</span>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="col-sm d-flex justify-content-between align-items-center">
                      <h5 className="card-title mb-0">Thông tin người đặt</h5>
                      <Button
                        size="sm"
                        onClick={() => setModal(true)}
                        color="primary"
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="d-flex gap-3 flex-column">
                      <span className="d-flex align-items-center">
                        <img
                          className="rounded-circle header-profile-user"
                          src={"/images/defaultavatar.jpg"}
                          alt="Header Avatar"
                        />
                        <span className="text-start ms-xl-2">
                          <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                            {ticket?.user?.role}
                          </span>
                          <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                            {ticket?.user?.name}
                          </span>
                        </span>
                      </span>
                      <div className="d-flex flex-column gap-3">
                        <p className="mb-0">
                          <i className="text-muted fs-4 ri-mail-line"></i>{" "}
                          {ticket?.user?.email}
                        </p>
                        <p className="mb-0">
                          <i className="text-muted fs-4 ri-phone-line"></i>{" "}
                          {ticket?.user?.phone}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader className="bg-light p-3" toggle={toggle}>
            Thông Tin Chi Tiết Người Đặt Vé
          </ModalHeader>
          <form>
            <ModalBody>
              <div className="mb-3 text-center">
                <img
                  src={ticket?.user?.avata ?? "/images/defaultavatar.jpg"}
                  alt="Avatar"
                  className="avatar avatar-sm rounded-circle"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Họ và tên</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={ticket?.user?.name}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={ticket?.user?.email}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={ticket?.user?.phone}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ngày sinh</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={ticket?.user?.birthday}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giới tính</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={ticket?.user?.gender}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Địa chỉ</label>
                <textarea
                  disabled
                  className="form-control"
                  rows="3"
                  value={ticket?.user?.address ?? ""}
                ></textarea>
              </div>
            </ModalBody>
            <div className="modal-footer">
              <Button type="button" color="light" onClick={toggle}>
                Đóng
              </Button>
            </div>
          </form>
        </Modal>
      </Container>
    </div>
  );
};

export default TicketDetail;
