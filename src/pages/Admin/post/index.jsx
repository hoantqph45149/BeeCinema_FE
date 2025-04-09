import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  Modal,
  Row,
} from "reactstrap";

import { useNavigate } from "react-router-dom";

import BreadCrumb from "../../../Components/Common/BreadCrumb";

import TableContainer from "../../../Components/Common/TableContainer";

import { useCRUD, useFetch } from "../../../Hooks/useCRUD";

import dayjs from "dayjs";
import { showConfirm } from "../../../Components/Common/showAlert";

const Post = () => {
  const { data } = useFetch(["posts"], "/posts");
  const nav = useNavigate();
  const { patch: patchPost } = useCRUD();
  const { delete: deletePost } = useCRUD();

  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggle = () => setModal(!modal);
  // Customers Column
  useEffect(() => {
    if (data) {
      setPosts(data);
      console.log(data);
    }
  }, [data]);
  const handleDeletePosts = (post) => {
    showConfirm(
      "Xóa Bài Viết",
      `Bạn có chắc muốn xóa bài viết ${post.title} không?`,
      () => {
        deletePost.mutate(`/posts/${post.id}`);
      }
    );
  };
  const handleUpdateActive = (post) => {
    showConfirm(
      "Thay đổi trạng thái",
      "Bạn có chắc muốn thay đổi trạng thái không",
      () => {
        patchPost.mutate({
          url: `/posts/${post.id}`,
          data: {
            ...post,
            is_active: post.is_active == true ? false : true,
          },
        });
      }
    );
  };
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
    },
    {
      header: "Tiêu đề",
      accessorKey: "title",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
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
        );
      },
    },
    {
      header: "Hình ảnh",
      accessorKey: "img_post",

      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <img
            style={{
              maxWidth: "250px",
            }}
            src={cell.row.original.img_post}
            alt={cell.row.original.title}
          />
        );
      },
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
      cell: (cell) => {
        return (
          <span>
            {dayjs(cell.row.original.created_at).format("DD/MM/YYYY")}
          </span>
        );
      },
    },
    {
      header: "Hoạt động",
      accessorKey: "is_active",
      enableColumnFilter: false,
      cell: (cell) => {
        return (
          <>
            <div className="form-check form-switch form-check-right">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="is_active"
                defaultChecked={
                  cell.row.original.is_active == true ? false : true
                }
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
          <ul className="list-inline hstack gap-2 mb-0">
            <li className="list-inline-item">
              <Button
                color="primary"
                className="btn-sm "
                onClick={() => {
                  nav(`/admin/post/${cell.row.original.id}/edit`);
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
                  handleDeletePosts(cell.row.original);
                }}
              >
                <i className="ri-delete-bin-5-fill"></i>
              </Button>
            </li>
          </ul>
        );
      },
    },
  ]);

  document.title = "";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý bài viết" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Danh sách bài viết</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => nav("/admin/post/add")}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Thêm
                          bài viết
                        </Button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={posts || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      divClass="table-responsive table-card mb-1"
                      tableClass="align-middle table-nowrap dt-responsive"
                      theadClass="table-light text-muted"
                      SearchPlaceholder="Search for order ID, customer, order status or something..."
                    />
                  </div>
                  <Modal
                    id="showModal"
                    isOpen={modal}
                    toggle={toggle}
                    centered
                  ></Modal>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Post;
