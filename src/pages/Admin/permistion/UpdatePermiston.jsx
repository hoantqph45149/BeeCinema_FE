import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../../Components/Common/Loader";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Tên vai trò là bắt buộc")
    .min(3, "Tên vai trò phải có ít nhất 3 ký tự")
    .max(50, "Tên vai trò không được vượt quá 50 ký tự"),
});

const UpdatePermiston = () => {
  const { id } = useParams();
  const { data: dataPermission, isLoading: isLoadingPermission } = useFetch(
    ["permissions"],
    "/permission"
  );
  const { data: dataRole, isLoading: isLoadingRole } = useFetch(
    ["roles", id],
    `/roles/${id}`
  );

  const { patch: patchRole } = useCRUD(["roles", id]);

  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    if (dataRole?.permissions) {
      setPermissions(dataRole.permissions);
    }
  }, [dataRole]);

  const handlePermissionChange = (permission) => {
    setPermissions((prev) => {
      if (prev.includes(permission)) {
        return prev.filter((p) => p !== permission);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setPermissions([]);
    } else {
      setPermissions(dataPermission ? [...dataPermission] : []);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (dataPermission && permissions.length === dataPermission.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [permissions, dataPermission]);

  const filteredPermissions = dataPermission?.filter((permission) =>
    permission.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (values) => {
    const roleData = {
      name: values.name,
      permissions: permissions,
    };
    patchRole.mutate(
      { url: `/roles/update/${id}`, data: roleData },
      {
        onSuccess: () => {
          nav(`/admin/permission`);
        },
      }
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Cập nhật Quyền" pageTitle="Quản lý" />
          {isLoadingRole || isLoadingPermission ? (
            <Loader />
          ) : (
            <Row>
              <Col lg={4}>
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Thông tin vai trò</h5>
                  </CardHeader>
                  <CardBody>
                    <Formik
                      initialValues={{ name: dataRole?.role || "" }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                      enableReinitialize
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="name">
                              Tên vai trò
                            </Label>
                            <Field
                              name="name"
                              type="text"
                              className={`form-control ${
                                errors.name && touched.name ? "is-invalid" : ""
                              }`}
                              placeholder="Nhập tên vai trò"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <Button
                            onClick={() => nav("/admin/permission")}
                            type="button"
                            color="primary"
                          >
                            Danh sách
                          </Button>
                          <Button
                            disabled={patchRole.isLoading}
                            type="submit"
                            color="primary"
                            className="ms-2"
                          >
                            Cập nhật vai trò
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={8}>
                <Card>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">
                      Cập nhật quyền cho vai trò
                    </h5>
                    <div className="d-flex align-items-center gap-3">
                      <div className="form-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          id="selectAll"
                        />
                        <Label className="form-check-label" htmlFor="selectAll">
                          Chọn tất cả quyền
                        </Label>
                      </div>
                      <Input
                        type="text"
                        placeholder="Tìm kiếm quyền..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "200px" }}
                      />
                    </div>
                  </CardHeader>
                  <CardBody style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    {filteredPermissions && filteredPermissions.length > 0 ? (
                      filteredPermissions.map((item, index) => (
                        <Card key={`permission-${index}`}>
                          <CardHeader>
                            <div className="form-check">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                checked={permissions.includes(item)}
                                onChange={() => handlePermissionChange(item)}
                                id={`permission-${index}`}
                              />
                              <Label
                                className="form-check-label"
                                htmlFor={`permission-${index}`}
                              >
                                {item}
                              </Label>
                            </div>
                          </CardHeader>
                        </Card>
                      ))
                    ) : (
                      <p>Không tìm thấy quyền nào</p>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UpdatePermiston;
