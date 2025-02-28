import React, { useMemo, useState } from "react";
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

import { Link, useNavigate } from "react-router-dom";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { showConfirm } from "../../../Components/Common/showAlert";

const SlideShow = () => {
  const { data: banners } = useFetch(["banners"], "/banners");
  const { patch: patchBanners, delete: deleteBanner } = useCRUD(["banners"]);

  const nav = useNavigate();
  const [banner, setBanner] = useState({});
  const handleUpdateActive = (banner) => {
    showConfirm(
      "Thay đổi trạng thái",
      "Bạn có chắc muốn thay đổi trạng thái không",
      () => {
        patchBanners.mutate({
          url: `/banners/${banner.id}`,
          data: {
            ...banner,
            is_active: banner.is_active === true ? false : true,
            images: banner.img_thumbnail_url,
          },
        });
      }
    );
    setBanner({});
  };

  const handleDeleteBanner = (banner) => {
    showConfirm(
      "Xóa Chi Nhánh",
      `Bạn có chắc muốn xóa banner ${banner.name} không?`,
      () => {
        deleteBanner.mutate(`/banners/${banner.id}`);
      }
    );
    setBanner({});
  };
  const columns = useMemo(() => [
    {
      header: "#",
      accessorKey: "id",
      enableColumnFilter: false,
    },
    {
      header: "Hình ảnh",
      accessorKey: "img_thumbnail_url",
      enableColumnFilter: false,
      cell: (cell) => {
        // const images = JSON.parse(cell.row.original.img_thumbnail_url);
        const images = cell.row.original?.img_thumbnail_url;
        return (
          <div className="container">
            <div className="row g-2">
              {images.map((image, index) => (
                <div className="col-12 col-md-4 col-lg-3" key={index}>
                  <img
                    src={image}
                    alt={`image-${index}`}
                    className="img-fluid rounded"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "75px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      header: "Mô tả",
      accessorKey: "description",
      enableColumnFilter: false,
    },

    {
      header: "Hoạt động",
      accessorKey: "is_active",
      enableColumnFilter: false,
      cell: (cell) => {
        // console.log(cell);
        return (
          <>
            <div className="form-check form-switch form-check-right">
              <Input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckRightDisabled"
                defaultChecked={cell.row.original.is_active}
                onChange={() => {
                  handleUpdateActive(cell.row.original);
                  setBanner(cell.row.original);
                }}
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
                  disabled={cell.row.original.is_active}
                  color="primary"
                  className="btn-sm "
                  onClick={() => {
                    handleDeleteBanner(cell.row.original);
                    setBanner(cell.row.original);
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

  document.title = "";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý banner" pageTitle="Quản lý" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Danh sách banner</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => {
                            nav("/admin/slide-show/add");
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Tạo
                          slide show
                        </Button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <div>
                    <TableContainer
                      columns={columns}
                      data={banners || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={8}
                      className="custom-header-css"
                      SearchPlaceholder="Search for customer, email, phone, status or something..."
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

export default SlideShow;
