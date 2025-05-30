import classnames from "classnames";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useNavigate } from "react-router-dom";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { showConfirm } from "../../../Components/Common/showAlert";
import Loader from "../../../Components/Common/Loader";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const Movie = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["movies"], "/movies");
  const { patch: patchMovie, delete: deleteMovie } = useCRUD(["movies"]);
  const nav = useNavigate();
  const [moviesPublish, setMoviesPublish] = useState([]);
  const [moviesUnPublish, setMoviesUnPublish] = useState([]);
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (data?.data) {
      const filterMoviesPublish = data.data.filter(
        (item) => item.is_publish === true
      );
      const filterMoviesUnPublish = data.data.filter(
        (item) => item.is_publish === false
      );
      setMoviesPublish(filterMoviesPublish);
      setMoviesUnPublish(filterMoviesUnPublish);
      setMovies(data.data);
    }
  }, [data?.data]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab && data?.data) {
      setActiveTab(tab);
      if (type === "all") {
        setMovies(data.data);
      } else if (type === "publish") {
        setMovies(data.data.filter((item) => item.is_publish === true));
      } else {
        setMovies(data.data.filter((item) => item.is_publish === false));
      }
    }
  };

  const handleUpdateActive = (movie, type) => {
    if (hasPermission("Sửa phim")) {
      const field = type === "active" ? "is_active" : "is_hot";
      const dataUpdate = {
        ...movie,
        [field]: movie[field] === true ? false : true,
      };
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không?",
        () => {
          patchMovie.mutate({
            url: `/movies/${movie.id}`,
            data: dataUpdate,
          });
        }
      );
    }
  };

  const handleDeleteMovie = (movie) => {
    if (hasPermission("Xóa phim")) {
      showConfirm(
        "Xóa Phim",
        `Bạn có chắc muốn xóa phim ${movie.name} không?`,
        () => {
          deleteMovie.mutate(`/movies/${movie.id}`);
        }
      );
    }
  };

  // Column
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Hình ảnh",
        accessorKey: "img_thumbnail",
        enableColumnFilter: false,
        cell: (cell) =>
          cell.row.original.img_thumbnail ? (
            <img
              style={{ maxWidth: "250px" }}
              src={cell.row.original.img_thumbnail}
              alt={cell.row.original.name}
            />
          ) : (
            <span>Không có hình ảnh</span>
          ),
      },
      {
        header: "Thông tin phim",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => {
          const movie = cell.row.original;
          return (
            <div
              className="container mt-4"
              style={{
                maxWidth: "400px",
                display: "inline-block",
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              <h4 className="text-primary fw-bold">{movie.name}</h4>
              {hasPermission("Xem chi tiết phim") && (
                <>
                  <p>
                    <strong>Đạo diễn:</strong> {movie.director}
                  </p>
                  <p style={{ whiteSpace: "pre-line" }}>
                    <strong>Diễn viên:</strong> {movie.cast}
                  </p>
                  <p>
                    <strong>Thể loại:</strong> {movie.category}
                  </p>
                  <p>
                    <strong>Phân loại:</strong> {movie.rating}
                  </p>
                  <p>
                    <strong>Ngày khởi chiếu:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Ngày kết thúc:</strong> {movie.end_date}
                  </p>
                  <p>
                    <strong>Phiên bản:</strong>
                    {movie?.movie_versions?.map((version) => (
                      <span
                        key={version.id}
                        className="btn btn-primary btn-sm me-2"
                      >
                        {version.name}
                      </span>
                    ))}
                  </p>
                  <p>
                    <strong>Trailer code:</strong> {movie.trailer_url}
                  </p>
                </>
              )}
            </div>
          );
        },
      },
      {
        header: "Trạng thái",
        accessorKey: "is_publish",
        enableColumnFilter: false,
        cell: (cell) => {
          return cell.getValue() ? (
            <span className="badge text-uppercase bg-success text-white">
              Đã xuất bản
            </span>
          ) : (
            <span className="badge text-uppercase bg-danger text-white">
              Chưa xuất bản
            </span>
          );
        },
      },
      {
        header: "Hoạt động",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="form-check form-switch form-check-right">
            <Input
              disabled={!hasPermission("Sửa phim")}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id={`is_active_${cell.row.original.id}`}
              checked={cell.row.original.is_active}
              defaultChecked={cell.row.original.is_active}
              onChange={() => {
                handleUpdateActive(cell.row.original, "active");
              }}
            />
          </div>
        ),
      },
      {
        header: "Hot",
        accessorKey: "is_hot",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="form-check form-switch form-check-right">
            <Input
              disabled={!hasPermission("Sửa phim")}
              className="form-check-input"
              type="checkbox"
              role="switch"
              id={`is_hot_${cell.row.original.id}`}
              checked={cell.row.original.is_hot}
              defaultChecked={cell.row.original.is_hot}
              onChange={() => {
                handleUpdateActive(cell.row.original, "hot");
              }}
            />
          </div>
        ),
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa phim") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    nav(`/admin/movie/${cell.row.original.id}/edit`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa phim") && (
              <li className="list-inline-item">
                <Button
                  disabled={cell.row.original.is_publish}
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeleteMovie(cell.row.original);
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

  document.title = "Quản lý phim | Admin Dashboard";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Danh sách phim" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="movieList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách phim</h5>
                  </div>
                  <div className="col-sm-auto">
                    {hasPermission("Thêm phim") && (
                      <button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => {
                          nav("/admin/movie/add");
                        }}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Tạo
                        phim
                      </button>
                    )}
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                {hasPermission("Danh sách phim") ? (
                  <>
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
                          onClick={() => {
                            toggleTab("1", "all");
                          }}
                          href="#"
                        >
                          <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                          Tất cả
                          {data?.data?.length > 0 && (
                            <span className="badge bg-success align-middle ms-1">
                              {data.data.length}
                            </span>
                          )}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "2" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("2", "publish");
                          }}
                          href="#"
                        >
                          <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                          Đã xuất bản
                          {moviesPublish.length > 0 && (
                            <span className="badge bg-success align-middle ms-1">
                              {moviesPublish.length}
                            </span>
                          )}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames(
                            { active: activeTab === "3" },
                            "fw-semibold"
                          )}
                          onClick={() => {
                            toggleTab("3", "unPublish");
                          }}
                          href="#"
                        >
                          Bản nháp
                          {moviesUnPublish.length > 0 && (
                            <span className="badge bg-danger align-middle ms-1">
                              {moviesUnPublish.length}
                            </span>
                          )}
                        </NavLink>
                      </NavItem>
                    </Nav>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <TableContainer
                        columns={columns}
                        data={movies || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={8}
                        divClass="table-responsive table-card mb-1"
                        tableClass="align-middle table-nowrap dt-responsive"
                        theadClass="table-light text-muted"
                        SearchPlaceholder="Tìm kiếm phim..."
                      />
                    )}
                  </>
                ) : (
                  <p>Bạn không có quyền xem danh sách phim.</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
