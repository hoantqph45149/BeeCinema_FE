import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Loader from "../../../Components/Common/Loader";
import { useFetch } from "../../../Hooks/useCRUD";
import dayjs from "dayjs";
import { formatVND } from "../../../utils/Currency";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const Ticket = () => {
  const { data: dataBranchs, isLoading: isLoadingBranch } = useFetch(
    ["branches"],
    "/branches"
  );
  const { data: dataMovies, isLoading: isLoadingMovie } = useFetch(
    ["movies"],
    "/movies"
  );
  const { data: dataCinemas, isLoading: isLoadingCinema } = useFetch(
    ["cinemas"],
    "/cinemas"
  );

  const { authUser } = useAuthContext();
  const nav = useNavigate();
  const [cinemas, setCinemas] = useState([]);
  const [idCinema, setIdCinema] = useState("");
  const [idBranch, setIdBranch] = useState("");
  const [idMovie, setIdMovie] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (dataBranchs?.data?.length && dataCinemas?.length) {
      const firstBranchId = dataBranchs.data[0].id;

      const filterCinema = dataCinemas.filter(
        (item) => item.branch_id === firstBranchId
      );

      setCinemas(filterCinema);
      setIdBranch(firstBranchId);

      if (filterCinema.length > 0) {
        setIdCinema(filterCinema[0].id);
      }
    }
  }, [dataBranchs?.data, dataCinemas]);

  const handleChangeBranch = (idBranche) => {
    if (idBranche == idBranch) return;
    const filterCinema = dataCinemas.filter(
      (item) => item.branch_id == idBranche
    );
    setCinemas(filterCinema);
    setIdCinema(filterCinema[0].id);
    setIdBranch(idBranche);
  };

  let queryString = "";

  if (!isLoadingBranch && !isLoadingCinema) {
    const finalBranchId = authUser?.cinema_id
      ? dataCinemas.find((item) => item.id === authUser.cinema_id).branch_id
      : idBranch;
    const finalCinemaId = authUser?.cinema_id ? authUser.cinema_id : idCinema;

    queryString = [
      finalBranchId ? `branch_id=${finalBranchId}` : "",
      finalCinemaId ? `cinema_id=${finalCinemaId}` : "",
      idMovie ? `movie_id=${idMovie}` : "",
      status ? `status=${status}` : "",
      date ? `date=${date}` : "",
    ]
      .filter(Boolean)
      .join("&");
  }

  const { data: dataTickets, isLoading: isLoadingTicket } = useFetch(
    ["tickets", idBranch, idCinema, idMovie, status, date],
    `/tickets/filter?${queryString}`,
    {
      enabled: !isLoadingMovie && !isLoadingBranch && !isLoadingCinema,
    }
  );

  const columns = useMemo(() => [
    {
      header: "Mã vé",
      accessorKey: "code",
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Thông tin vé",
      accessorKey: "ticket_info",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <>
            <div className="container mt-4">
              <p>
                <strong>Phim:</strong> {cell.row.original.movie_name}
              </p>
              <p>
                <strong>Nơi chiếu:</strong> Rạp BEECINEMA{" "}
                {cell.row.original.cinema_name}
              </p>
              <p>
                <strong>Ghế:</strong> {cell.row.original.movie_name}
              </p>
              <p>
                <strong>Giờ chiếu:</strong>{" "}
                {`${dayjs(cell.row.original.start_time).format(
                  "HH:mm"
                )} - ${dayjs(cell.row.original.expiry).format("HH:mm")}`}
              </p>
              <p>
                <strong>Ngày chiếu:</strong> {cell.row.original.show_date}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <Button
                  size="sm"
                  className="ms-2"
                  color={
                    cell.row.original.status == "Đã thanh toán"
                      ? "primary"
                      : cell.row.original.status == "Đã xuất vé"
                      ? "success"
                      : "danger"
                  }
                >
                  {cell.row.original.status}
                </Button>
              </p>
              <p>
                <strong>Hạn sử dụng:</strong>{" "}
                {dayjs(cell.row.original.expiry).format(" HH:mm - DD/MM/YYYY")}
              </p>
              <p>
                <strong>Thanh toán bằng:</strong>{" "}
                <Button size="sm" className="ms-2" color="success">
                  {cell.row.original.payment_name}
                </Button>
              </p>
              <p>
                <strong>Tổng tiền:</strong>{" "}
                {formatVND(cell.row.original.total_price)}
              </p>
            </div>
          </>
        );
      },
    },
    {
      header: "Hình ảnh",
      accessorKey: "movie_image",
      enableColumnFilter: false,
      cell: (cell) => (
        <img
          style={{
            maxWidth: "100px",
          }}
          src={cell.row.original.movie_image}
          alt={cell.row.original.movie_name}
        />
      ),
    },
    {
      header: "Thông tin người đặt",
      accessorKey: "user_info",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <>
            <div className="container mt-4">
              <p>
                <strong>Người đăt:</strong> {cell.row.original.user_name}
              </p>
              <p>
                <strong>Email:</strong> {cell.row.original.user_email}
              </p>
              <p>
                <strong>Chức vụ:</strong>{" "}
                <Button size="sm" className="ms-2" color="primary">
                  {cell.row.original.user_role}
                </Button>
              </p>
            </div>
          </>
        );
      },
    },
    {
      header: "Action",
      cell: (cell) => {
        return (
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item">
              <Button
                color="primary"
                className="btn-sm "
                onClick={() => {
                  nav(`/admin/ticket/detail/${cell.row.original.code}`);
                }}
              >
                <i className="ri-information-line"></i>
              </Button>
            </li>
          </ul>
        );
      },
    },
  ]);

  document.title = "Quản lý vé";
  return (
    <div className="page-content">
      {isLoadingBranch || isLoadingCinema || isLoadingMovie ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <>
          <Container fluid>
            <BreadCrumb title="Quản lý vé" pageTitle="Quản lý" />
            <Row>
              <Col lg={12}>
                <Card id="orderList">
                  <CardHeader className="border-0">
                    <Row className="align-items-center gy-3">
                      <Form>
                        <Row className="g-3">
                          {!authUser.cinema_id && (
                            <>
                              <Col lg={4} xl={2} md={6} sm={12}>
                                <div>
                                  <Label className="form-label " for="address">
                                    Chi nhánh
                                  </Label>
                                  <select
                                    id="address"
                                    className="form-select"
                                    onClick={(e) =>
                                      handleChangeBranch(e.target.value)
                                    }
                                  >
                                    {dataBranchs?.data?.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Col>
                              <Col lg={4} xl={2} md={6} sm={12}>
                                <div>
                                  <Label className="form-label " for="rap">
                                    Rạp
                                  </Label>
                                  <select
                                    id="rap"
                                    className="form-select"
                                    onChange={(e) =>
                                      setIdCinema(e.target.value)
                                    }
                                  >
                                    {cinemas.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Col>
                            </>
                          )}

                          <Col lg={4} xl={2} md={6}>
                            <div>
                              <Label htmlFor="date" className="form-label">
                                Ngày
                              </Label>
                              <Input
                                type="date"
                                className="form-control"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>
                          </Col>
                          <Col lg={4} xl={2} md={6} sm={12}>
                            <div>
                              <Label className="form-label" for="trangthai">
                                Trạng thái
                              </Label>
                              <select
                                id="trangthai"
                                className="form-select"
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="">Tất cả</option>
                                <option value="Đã thanh toán">
                                  Đã thanh toán
                                </option>
                                <option value="Đã xuất vé">Đã xuất vé</option>
                                <option value="Đã hết hạn">Đã hết hạn</option>
                              </select>
                            </div>
                          </Col>
                          <Col lg={6} xl={4} md={6} sm={12}>
                            <div>
                              <Label className="form-label " for="movie">
                                Phim
                              </Label>
                              <select
                                id="movie"
                                className="form-select"
                                onChange={(e) => setIdMovie(e.target.value)}
                              >
                                <option value="">Tất cả</option>
                                {dataMovies?.data?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {isLoadingTicket ? (
                      <>
                        <Loader />
                      </>
                    ) : (
                      <>
                        <TableContainer
                          columns={columns}
                          data={dataTickets?.data || []}
                          isGlobalFilter={true}
                          isAddUserList={false}
                          customPageSize={8}
                          divClass="table-responsive table-card mb-1"
                          tableClass="align-middle table-nowrap"
                          theadClass="table-light text-muted"
                          SearchPlaceholder="Search for order ID, customer, order status or something..."
                        />
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default Ticket;
