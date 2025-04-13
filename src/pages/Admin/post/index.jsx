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
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import dayjs from "dayjs";
import { showConfirm } from "../../../Components/Common/showAlert";
import Loader from "../../../Components/Common/Loader";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const Post = () => {
  const { hasPermission } = useAuthContext();
  const { data, isLoading } = useFetch(["posts"], "/posts");
  const nav = useNavigate();
  const { patch: patchPost } = useCRUD(["posts"]);
  const { delete: deletePost } = useCRUD(["posts"]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setPosts(data.data);
    }
  }, [data?.data]);

  const handleDeletePosts = (post) => {
    if (hasPermission("Xóa bài viết")) {
      showConfirm(
        "Xóa Bài Viết",
        `Bạn có chắc muốn xóa bài viết ${post.title} không?`,
        () => {
          deletePost.mutate(`/posts/${post.id}`);
        }
      );
    }
  };

  const handleUpdateActive = (post) => {
    if (hasPermission("Sửa bài viết")) {
      showConfirm(
        "Thay đổi trạng thái",
        "Bạn có chắc muốn thay đổi trạng thái không?",
        () => {
          patchPost.mutate({
            url: `/posts/${post.id}`,
            data: {
              ...post,
              is_active: post.is_active ? false : true,
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
        header: "Tiêu đề",
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => (
          <span
            style={{
              maxWidth: "250px",
              display: "inline-block",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
            className="fw-medium"
          >
            {cell.row.original.title}
          </span>
        ),
      },
      {
        header: "Hình ảnh",
        accessorKey: "img_post",
        enableColumnFilter: false,
        cell: (cell) =>
          cell.row.original.img_post ? (
            <img
              style={{ maxWidth: "250px" }}
              src={cell.row.original.img_post}
              alt={cell.row.original.title}
            />
          ) : (
            <span>Không có hình ảnh</span>
          ),
      },
      {
        header: "Người tạo",
        accessorKey: "user.name",
        enableColumnFilter: false,
      },
      {
        header: "Lượt xem",
        accessorKey: "view_count",
        enableColumnFilter: false,
      },
      {
        header: "Ngày tạo",
        accessorKey: "created_at",
        enableColumnFilter: false,
        cell: (cell) => (
          <span>
            {dayjs(cell.row.original.created_at).format("DD/MM/YYYY")}
          </span>
        ),
      },
      {
        header: "Hoạt động",
        accessorKey: "is_active",
        enableColumnFilter: false,
        cell: (cell) =>
          hasPermission("Sửa bài viết") ? (
            <div className="form-check form-switch form-check-right">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={`is_active_${cell.row.original.id}`}
                defaultChecked={cell.row.original.is_active}
                onChange={() => handleUpdateActive(cell.row.original)}
              />
            </div>
          ) : null,
      },
      {
        header: "Action",
        cell: (cell) => (
          <ul className="list-inline hstack gap-2 mb-0">
            {hasPermission("Sửa bài viết") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    nav(`/admin/post/${cell.row.original.id}/edit`);
                  }}
                >
                  <i className="ri-pencil-fill"></i>
                </Button>
              </li>
            )}
            {hasPermission("Xóa bài viết") && (
              <li className="list-inline-item">
                <Button
                  color="primary"
                  className="btn-sm"
                  onClick={() => {
                    handleDeletePosts(cell.row.original);
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

  document.title = "Quản lý bài viết | Admin Dashboard";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Quản lý bài viết" pageTitle="Quản lý" />
        <Row>
          <Col lg={12}>
            <Card id="postList">
              <CardHeader className="border-0">
                <Row className="g-4 align-items-center">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Danh sách bài viết</h5>
                  </div>
                  <div className="col-sm-auto">
                    {hasPermission("Thêm bài viết") && (
                      <Button
                        type="button"
                        className="btn btn-success add-btn"
                        id="create-btn"
                        onClick={() => nav("/admin/post/add")}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Thêm
                        bài viết
                      </Button>
                    )}
                  </div>
                </Row>
              </CardHeader>
              <div className="card-body pt-0">
                {isLoading ? (
                  <Loader />
                ) : hasPermission("Danh sách bài viết") ? (
                  <TableContainer
                    columns={columns}
                    data={posts || []}
                    isGlobalFilter={true}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap dt-responsive"
                    theadClass="table-light text-muted"
                    SearchPlaceholder="Tìm kiếm bài viết..."
                  />
                ) : (
                  <p>Bạn không có quyền xem danh sách bài viết.</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Post;
