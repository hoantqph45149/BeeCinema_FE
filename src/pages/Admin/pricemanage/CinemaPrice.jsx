import classnames from "classnames";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import Loader from "../../../Components/Common/Loader";
import { useCRUD, useFetch } from "../../../Hooks/useCRUD";
import { formatVND } from "./../../../utils/Currency";

document.title = "Quản lý giá vé";

const CinemaPrice = () => {
  const { data: dataCinema, isLoading: isLoadingCinema } = useFetch(
    ["cinemas"],
    "/cinemas"
  );
  const { data: dataPriceRules, isLoading: isLoadingPriceRules } = useFetch(
    ["price-rules"],
    "/price-rules"
  );
  const { data: typeRooms } = useFetch(["type_rooms"], "/type-rooms");
  const { create: createPriceRule, patch: updatePriceRule } = useCRUD([
    "price-rules",
  ]);

  const dayTypes = [
    { name: "Weekday", description: "Ngày thường (Thứ 2 đến thứ 6)" },
    { name: "Weekend", description: "Cuối tuần (Thứ 7, Chủ nhật)" },
    { name: "Holiday", description: "Ngày lễ" },
  ];

  const timeSlots = [
    { name: "Morning", description: "Sáng (7h - 18h)" },
    { name: "Evening", description: "Tối (18h - 23h59)" },
  ];

  const [activeTab, setActiveTab] = useState("");
  const [activeTabDay, setActiveTabDay] = useState("Weekday");
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPriceRule, setSelectedPriceRule] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [priceRules, setPriceRules] = useState([]);
  useEffect(() => {
    if (dataPriceRules && dataCinema) {
      setActiveTab(dataCinema[0]?.id);
      setPriceRules(
        dataPriceRules.filter(
          (item) => item.cinema_id === Number(dataCinema[0]?.id)
        )
      );
    }
  }, [dataPriceRules, setActiveTab, dataCinema]);

  const toggleTab = (tab, type) => {
    if (activeTab !== type) {
      setActiveTab(type);
      setPriceRules(
        dataPriceRules.filter((item) => item.cinema_id === Number(type))
      );
    }
  };

  const toggleDay = (tab) => {
    if (activeTabDay !== tab) setActiveTabDay(tab);
  };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setIsEdit(false);
      setSelectedPriceRule(null);
      setErrorMessage("");
    } else {
      setModal(true);
    }
  }, [modal]);

  const isDuplicatePriceRule = (
    values,
    priceRules,
    isEdit = false,
    currentId = null
  ) => {
    return priceRules.some((rule) => {
      if (isEdit && rule.id == currentId) return false;
      return (
        rule.cinema_id === Number(values.cinema_id) &&
        rule.type_room_id === Number(values.type_room_id)
      );
    });
  };

  const validationSchema = Yup.object({
    cinema_id: Yup.number().required("Vui lòng chọn rạp"),
    type_room_id: Yup.number().required("Vui lòng chọn loại phòng"),
    price: Yup.object({
      Weekday: Yup.object({
        Morning: Yup.number()
          .required("Vui lòng nhập giá vé")
          .integer("Giá vé phải là số nguyên")
          .min(0, "Giá vé không được âm"),
        Evening: Yup.number()
          .required("Vui lòng nhập giá vé")
          .integer("Giá vé phải là số nguyên")
          .min(0, "Giá vé không được âm"),
      }),
      Weekend: Yup.object({
        Morning: Yup.number()
          .required("Vui lòng nhập giá vé")
          .integer("Giá vé phải là số nguyên")
          .min(0, "Giá vé không được âm"),
        Evening: Yup.number()
          .required("Vui lòng nhập giá vé")
          .integer("Giá vé phải là số nguyên")
          .min(0, "Giá vé không được âm"),
      }),
      Holiday: Yup.object({
        Morning: Yup.number()
          .required("Vui lòng nhập giá vé")
          .integer("Giá vé phải là số nguyên")
          .min(0, "Giá vé không được âm"),
        Evening: Yup.number()
          .required("Vui lòng nhập giá vé")
          .integer("Giá vé phải là số nguyên")
          .min(0, "Giá vé không được âm"),
      }),
    }),
    surcharge: Yup.object({
      Weekday: Yup.object({
        Morning: Yup.object({
          vip: Yup.number()
            .required("Vui lòng nhập phụ phí VIP")
            .integer("Phụ phí VIP phải là số nguyên")
            .min(0, "Phụ phí VIP không được âm"),
          double: Yup.number()
            .required("Vui lòng nhập phụ phí Double")
            .integer("Phụ phí Double phải là số nguyên")
            .min(0, "Phụ phí Double không được âm"),
        }),
        Evening: Yup.object({
          vip: Yup.number()
            .required("Vui lòng nhập phụ phí VIP")
            .integer("Phụ phí VIP phải là số nguyên")
            .min(0, "Phụ phí VIP không được âm"),
          double: Yup.number()
            .required("Vui lòng nhập phụ phí Double")
            .integer("Phụ phí Double phải là số nguyên")
            .min(0, "Phụ phí Double không được âm"),
        }),
      }),
      Weekend: Yup.object({
        Morning: Yup.object({
          vip: Yup.number()
            .required("Vui lòng nhập phụ phí VIP")
            .integer("Phụ phí VIP phải là số nguyên")
            .min(0, "Phụ phí VIP không được âm"),
          double: Yup.number()
            .required("Vui lòng nhập phụ phí Double")
            .integer("Phụ phí Double phải là số nguyên")
            .min(0, "Phụ phí Double không được âm"),
        }),
        Evening: Yup.object({
          vip: Yup.number()
            .required("Vui lòng nhập phụ phí VIP")
            .integer("Phụ phí VIP phải là số nguyên")
            .min(0, "Phụ phí VIP không được âm"),
          double: Yup.number()
            .required("Vui lòng nhập phụ phí Double")
            .integer("Phụ phí Double phải là số nguyên")
            .min(0, "Phụ phí Double không được âm"),
        }),
      }),
      Holiday: Yup.object({
        Morning: Yup.object({
          vip: Yup.number()
            .required("Vui lòng nhập phụ phí VIP")
            .integer("Phụ phí VIP phải là số nguyên")
            .min(0, "Phụ phí VIP không được âm"),
          double: Yup.number()
            .required("Vui lòng nhập phụ phí Double")
            .integer("Phụ phí Double phải là số nguyên")
            .min(0, "Phụ phí Double không được âm"),
        }),
        Evening: Yup.object({
          vip: Yup.number()
            .required("Vui lòng nhập phụ phí VIP")
            .integer("Phụ phí VIP phải là số nguyên")
            .min(0, "Phụ phí VIP không được âm"),
          double: Yup.number()
            .required("Vui lòng nhập phụ phí Double")
            .integer("Phụ phí Double phải là số nguyên")
            .min(0, "Phụ phí Double không được âm"),
        }),
      }),
    }),
  });

  const initialValues = {
    cinema_id: selectedPriceRule?.cinema_id || "",
    type_room_id: selectedPriceRule?.type_room_id || "",
    price: {
      Weekday: {
        Morning:
          selectedPriceRule?.day_types
            ?.find((d) => d.day_type === "Weekday")
            ?.time_slots?.find((t) => t.time_slot === "Morning")?.base_price ||
          0,
        Evening:
          selectedPriceRule?.day_types
            ?.find((d) => d.day_type === "Weekday")
            ?.time_slots?.find((t) => t.time_slot === "Evening")?.base_price ||
          0,
      },
      Weekend: {
        Morning:
          selectedPriceRule?.day_types
            ?.find((d) => d.day_type === "Weekend")
            ?.time_slots?.find((t) => t.time_slot === "Morning")?.base_price ||
          0,
        Evening:
          selectedPriceRule?.day_types
            ?.find((d) => d.day_type === "Weekend")
            ?.time_slots?.find((t) => t.time_slot === "Evening")?.base_price ||
          0,
      },
      Holiday: {
        Morning:
          selectedPriceRule?.day_types
            ?.find((d) => d.day_type === "Holiday")
            ?.time_slots?.find((t) => t.time_slot === "Morning")?.base_price ||
          0,
        Evening:
          selectedPriceRule?.day_types
            ?.find((d) => d.day_type === "Holiday")
            ?.time_slots?.find((t) => t.time_slot === "Evening")?.base_price ||
          0,
      },
    },
    surcharge: {
      Weekday: {
        Morning: {
          vip:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekday")
              ?.time_slots?.find((t) => t.time_slot === "Morning")?.surcharge
              ?.vip || 0,
          double:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekday")
              ?.time_slots?.find((t) => t.time_slot === "Morning")?.surcharge
              ?.double || 0,
        },
        Evening: {
          vip:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekday")
              ?.time_slots?.find((t) => t.time_slot === "Evening")?.surcharge
              ?.vip || 0,
          double:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekday")
              ?.time_slots?.find((t) => t.time_slot === "Evening")?.surcharge
              ?.double || 0,
        },
      },
      Weekend: {
        Morning: {
          vip:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekend")
              ?.time_slots?.find((t) => t.time_slot === "Morning")?.surcharge
              ?.vip || 0,
          double:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekend")
              ?.time_slots?.find((t) => t.time_slot === "Morning")?.surcharge
              ?.double || 0,
        },
        Evening: {
          vip:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekend")
              ?.time_slots?.find((t) => t.time_slot === "Evening")?.surcharge
              ?.vip || 0,
          double:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Weekend")
              ?.time_slots?.find((t) => t.time_slot === "Evening")?.surcharge
              ?.double || 0,
        },
      },
      Holiday: {
        Morning: {
          vip:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Holiday")
              ?.time_slots?.find((t) => t.time_slot === "Morning")?.surcharge
              ?.vip || 0,
          double:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Holiday")
              ?.time_slots?.find((t) => t.time_slot === "Morning")?.surcharge
              ?.double || 0,
        },
        Evening: {
          vip:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Holiday")
              ?.time_slots?.find((t) => t.time_slot === "Evening")?.surcharge
              ?.vip || 0,
          double:
            selectedPriceRule?.day_types
              ?.find((d) => d.day_type === "Holiday")
              ?.time_slots?.find((t) => t.time_slot === "Evening")?.surcharge
              ?.double || 0,
        },
      },
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (
          isDuplicatePriceRule(
            values,
            dataPriceRules,
            isEdit,
            selectedPriceRule?.id
          )
        ) {
          setErrorMessage(
            "Quy tắc giá với tổ hợp rạp và loại phòng này đã tồn tại!"
          );
          return;
        }

        const payload = {
          cinema_id: Number(values.cinema_id),
          type_room_id: Number(values.type_room_id),
          price: {
            Weekday: {
              Morning: Number(values.price.Weekday.Morning),
              Evening: Number(values.price.Weekday.Evening),
            },
            Weekend: {
              Morning: Number(values.price.Weekend.Morning),
              Evening: Number(values.price.Weekend.Evening),
            },
            Holiday: {
              Morning: Number(values.price.Holiday.Morning),
              Evening: Number(values.price.Holiday.Evening),
            },
          },
          surcharge: {
            Weekday: {
              Morning: {
                vip: Number(values.surcharge.Weekday.Morning.vip),
                double: Number(values.surcharge.Weekday.Morning.double),
              },
              Evening: {
                vip: Number(values.surcharge.Weekday.Evening.vip),
                double: Number(values.surcharge.Weekday.Evening.double),
              },
            },
            Weekend: {
              Morning: {
                vip: Number(values.surcharge.Weekend.Morning.vip),
                double: Number(values.surcharge.Weekend.Morning.double),
              },

              Evening: {
                vip: Number(values.surcharge.Weekend.Evening.vip),
                double: Number(values.surcharge.Weekend.Evening.double),
              },
            },
            Holiday: {
              Morning: {
                vip: Number(values.surcharge.Holiday.Morning.vip),
                double: Number(values.surcharge.Holiday.Morning.double),
              },

              Evening: {
                vip: Number(values.surcharge.Holiday.Evening.vip),
                double: Number(values.surcharge.Holiday.Evening.double),
              },
            },
          },
        };

        if (isEdit) {
          createPriceRule.mutate(
            {
              url: `/price-rules/update-rule-prices`,
              data: payload,
            },
            {
              onSuccess: () => {
                formik.resetForm();
                toggle();
              },
            }
          );
        } else {
          createPriceRule.mutate(
            { url: "/price-rules", data: payload },
            {
              onSuccess: () => {
                formik.resetForm();
                toggle();
              },
            }
          );
        }
      } catch (error) {
        setErrorMessage("Đã xảy ra lỗi khi lưu quy tắc giá. Vui lòng thử lại.");
      }
    },
  });

  const [activeModalTab, setActiveModalTab] = useState("Weekday");

  const toggleModalTab = (tab) => {
    if (activeModalTab !== tab) setActiveModalTab(tab);
  };

  return isLoadingCinema || isLoadingPriceRules ? (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Loader />
    </div>
  ) : (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <Button
              color="primary"
              className="mb-3"
              onClick={() => {
                setIsEdit(false);
                setModal(true);
              }}
            >
              Thêm quy tắc giá
            </Button>
            <Nav
              className="nav-tabs nav-tabs-custom nav-success"
              role="tablist"
            >
              {dataCinema?.map((item, index) => (
                <NavItem key={index}>
                  <NavLink
                    className={classnames(
                      { active: activeTab == item.id },
                      "fw-semibold"
                    )}
                    onClick={() => toggleTab(String(index + 2), item.id)}
                    href="#"
                  >
                    {item.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            {priceRules.map((item, index) => (
              <Card key={index}>
                <CardBody>
                  <Row className="mb-4">
                    <Col md={9}>
                      <div className="d-flex align-items-center mb-2">
                        <h5 className="mb-0 me-2">Rạp chiếu:</h5>
                        <Badge color="info" pill className="px-3 py-2">
                          {item.cinema_name}
                        </Badge>
                      </div>
                      <div className="d-flex align-items-center">
                        <h5 className="mb-0 me-2">Loại phòng:</h5>
                        <Badge color="info" pill className="px-3 py-2">
                          {item.type_room_name}
                        </Badge>
                      </div>
                    </Col>
                    <Col md={3}>
                      <Button
                        color="primary"
                        onClick={() => {
                          toggle();
                          setIsEdit(true);
                          setSelectedPriceRule(item);
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom me-1"></i> sửa
                      </Button>
                    </Col>
                  </Row>

                  <div className="pricing-tabs">
                    <Nav tabs className="mb-3">
                      {item?.day_types?.map((dayType) => (
                        <NavItem
                          key={dayType.day_type}
                          style={{ cursor: "pointer" }}
                        >
                          <NavLink
                            className={
                              activeTabDay === dayType.day_type ? "active" : ""
                            }
                            onClick={() => toggleDay(dayType.day_type)}
                          >
                            {dayType.day_type}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>

                    <TabContent activeTab={activeTabDay}>
                      {item?.day_types?.map((dayType) => (
                        <TabPane
                          key={dayType.day_type}
                          tabId={dayType.day_type}
                        >
                          {dayType.time_slots.length > 0 ? (
                            <Table
                              responsive
                              bordered
                              hover
                              className="shadow-sm"
                            >
                              <thead className="bg-light">
                                <tr>
                                  <th>Khoảng thời gian</th>
                                  <th>Giá ghế thường</th>
                                  <th>Phụ thu ghế VIP</th>
                                  <th>Phụ thu ghế đôi</th>
                                  <th>Tổng tiền ghế VIP</th>
                                  <th>Tổng tiền ghế đôi</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dayType.time_slots.map((slot) => (
                                  <tr key={slot.time_slot}>
                                    <td>
                                      <Badge
                                        color="secondary"
                                        className="px-3 py-2"
                                      >
                                        {slot.time_slot}
                                      </Badge>
                                    </td>
                                    <td>{formatVND(slot.base_price)}</td>
                                    <td>{formatVND(slot.surcharge.vip)}</td>
                                    <td>{formatVND(slot.surcharge.double)}</td>
                                    <td className="fw-bold text-success">
                                      {formatVND(
                                        slot.base_price + slot.surcharge.vip
                                      )}
                                    </td>
                                    <td className="fw-bold text-success">
                                      {formatVND(
                                        slot.base_price * 2 +
                                          slot.surcharge.double
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          ) : (
                            <Alert color="info">
                              No time slots available for {dayType.day_type}.
                            </Alert>
                          )}
                        </TabPane>
                      ))}
                    </TabContent>
                  </div>
                </CardBody>
              </Card>
            ))}
          </CardBody>
        </Card>
      </Col>
      <Modal isOpen={modal} toggle={toggle} centered size="xl">
        <ModalHeader className="bg-light p-3" toggle={toggle}>
          {isEdit ? "Sửa quy tắc giá" : "Thêm quy tắc giá"}
        </ModalHeader>
        <Form onSubmit={formik.handleSubmit}>
          <ModalBody>
            {errorMessage && (
              <Alert color="danger" className="mb-3">
                {errorMessage}
              </Alert>
            )}
            <Row>
              <Col md={6}>
                <FormGroup className="mb-3">
                  <Label for="cinema_id">Rạp</Label>
                  <Input
                    type="select"
                    name="cinema_id"
                    id="cinema_id"
                    invalid={
                      formik.touched.cinema_id && !!formik.errors.cinema_id
                    }
                    {...formik.getFieldProps("cinema_id")}
                  >
                    <option value="">Chọn rạp</option>
                    {dataCinema?.map((cinema) => (
                      <option key={cinema.id} value={cinema.id}>
                        {cinema.name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>{formik.errors.cinema_id}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup className="mb-3">
                  <Label for="type_room_id">Loại phòng</Label>
                  <Input
                    type="select"
                    name="type_room_id"
                    id="type_room_id"
                    invalid={
                      formik.touched.type_room_id &&
                      !!formik.errors.type_room_id
                    }
                    {...formik.getFieldProps("type_room_id")}
                  >
                    <option value="">Chọn loại phòng</option>
                    {typeRooms?.data.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>{formik.errors.type_room_id}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            {/* Tabs for Day Types */}
            <Nav tabs className="mb-3">
              {dayTypes.map((dayType) => (
                <NavItem key={dayType.name} style={{ cursor: "pointer" }}>
                  <NavLink
                    className={classnames({
                      active: activeModalTab === dayType.name,
                    })}
                    onClick={() => toggleModalTab(dayType.name)}
                  >
                    {dayType.description}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>

            <TabContent activeTab={activeModalTab}>
              {dayTypes.map((dayType) => (
                <TabPane key={dayType.name} tabId={dayType.name}>
                  <Table responsive bordered className="mb-3">
                    <thead className="bg-light">
                      <tr>
                        <th>Khung giờ</th>
                        <th>Giá ghế thường</th>
                        <th>Phụ phí ghế VIP</th>
                        <th>Phụ phí ghế đôi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((slot) => (
                        <tr key={slot.name}>
                          <td>{slot.description}</td>
                          <td>
                            <FormGroup>
                              <Input
                                type="number"
                                name={`price.${dayType.name}.${slot.name}`}
                                placeholder="Nhập giá vé"
                                invalid={
                                  formik.touched.price?.[dayType.name]?.[
                                    slot.name
                                  ] &&
                                  !!formik.errors.price?.[dayType.name]?.[
                                    slot.name
                                  ]
                                }
                                {...formik.getFieldProps(
                                  `price.${dayType.name}.${slot.name}`
                                )}
                              />
                              <FormFeedback>
                                {
                                  formik.errors.price?.[dayType.name]?.[
                                    slot.name
                                  ]
                                }
                              </FormFeedback>
                            </FormGroup>
                          </td>
                          <td>
                            <FormGroup>
                              <Input
                                type="number"
                                name={`surcharge.${dayType.name}.${slot.name}.vip`}
                                placeholder="Nhập phụ phí VIP"
                                invalid={
                                  formik.touched.surcharge?.[dayType.name]?.[
                                    slot.name
                                  ]?.vip &&
                                  !!formik.errors.surcharge?.[dayType.name]?.[
                                    slot.name
                                  ]?.vip
                                }
                                {...formik.getFieldProps(
                                  `surcharge.${dayType.name}.${slot.name}.vip`
                                )}
                              />
                              <FormFeedback>
                                {
                                  formik.errors.surcharge?.[dayType.name]?.[
                                    slot.name
                                  ]?.vip
                                }
                              </FormFeedback>
                            </FormGroup>
                          </td>
                          <td>
                            <FormGroup>
                              <Input
                                type="number"
                                name={`surcharge.${dayType.name}.${slot.name}.double`}
                                placeholder="Nhập phụ phí Double"
                                invalid={
                                  formik.touched.surcharge?.[dayType.name]?.[
                                    slot.name
                                  ]?.double &&
                                  !!formik.errors.surcharge?.[dayType.name]?.[
                                    slot.name
                                  ]?.double
                                }
                                {...formik.getFieldProps(
                                  `surcharge.${dayType.name}.${slot.name}.double`
                                )}
                              />
                              <FormFeedback>
                                {
                                  formik.errors.surcharge?.[dayType.name]?.[
                                    slot.name
                                  ]?.double
                                }
                              </FormFeedback>
                            </FormGroup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TabPane>
              ))}
            </TabContent>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="light" onClick={toggle}>
              Đóng
            </Button>
            <Button
              type="submit"
              color="success"
              disabled={formik.isSubmitting}
            >
              {isEdit ? "Sửa" : "Thêm"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Row>
  );
};

export default CinemaPrice;
