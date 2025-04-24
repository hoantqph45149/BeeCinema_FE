import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "../../../Components/Common/Button";
import { useCRUD } from "../../../Hooks/useCRUD";

const Contact = () => {
  const { create } = useCRUD(["contacts"]);

  const contactSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    phone: Yup.string().required("Vui lòng nhập số điện thoại"),
    message: Yup.string().required("Vui lòng nhập nội dung tin nhắn"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      create.mutate({
        url: "/contact",
        data: { ...values },
      });

      resetForm();
      setModal(false);
    },
  });
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="absolute top-0 left-0 w-full h-2/3 ">
        <img
          src="/images/contactbeecinema.jpg"
          alt="contact-movie-beecinema"
          className="w-full h-full object-fill"
        />
      </div>

      <div className="relative w-full max-w-7xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden z-1 mt-20">
        <div className="w-full md:w-2/3 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Gửi tin nhắn cho chúng tôi
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nhập họ và tên"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Địa chỉ *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Nhập địa chỉ"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Tin nhắn *
              </label>
              <textarea
                rows="4"
                name="message"
                placeholder="Nhập nội dung tin nhắn"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.message}
                </p>
              )}
            </div>

            <Button type="submit">GỬI TIN NHẮN</Button>
          </form>
        </div>

        <div className="w-full md:w-1/3 bg-accent text-white p-6 md:p-8 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Thông tin liên hệ</h3>
          <p className="text-sm mb-4">CÔNG TY TNHH BEECINEMA VIỆT NAM</p>
          <p className="flex items-center justify-center md:justify-start mb-2">
            <span className="mr-2">📍</span>Tầng 5, Tòa nhà Hanoi Group, 442 Đội
            Cấn, Ba Đình, Hà Nội
          </p>
          <p className="flex items-center justify-center md:justify-start mb-2">
            <span className="mr-2">📞</span> 1900 0000
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <span className="mr-2">✉️</span> www.Beecinema.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
