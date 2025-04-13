import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCRUD } from "../../../Hooks/useCRUD";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { create: forgotPassword } = useCRUD(["forgot-password"]);
  const [sendMaillSucces, setSendMailSucces] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
    }),
    onSubmit: (values) => {
      forgotPassword.mutate(
        {
          url: "/forgot-password",
          data: values,
          shouldShowAlert: false,
        },
        {
          onSuccess: (data) => {
            setSendMailSucces(true);
          },
        }
      );
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-center items-center px-16 sm:px-44"></div>
      {!sendMaillSucces ? (
        <div className="w-full max-w-md p-8 bg-white text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Đặt lại mật khẩu
            </h2>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên
              kết để đặt lại mật khẩu.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@mail.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-accent text-white font-semibold rounded-lg shadow hover:bg-accent/80 transition"
            >
              Gửi Email
            </button>
          </form>

          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-accent hover:underline transition"
            >
              <span className="mr-1">←</span> Trở về trang đăng nhập
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md p-6 bg-white text-center">
          <h2 className="text-2xl font-bold mb-2">Kiểm tra email của bạn</h2>
          <p className="text-gray-600 mb-1">
            Chúng tôi đã gửi liên kết đặt lại mật khẩu đến
          </p>
          <p className="text-black font-medium mb-4">{formik.values.email}</p>

          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-14 h-14" />
          </div>

          <p className="text-gray-500 mb-6">
            Nếu bạn không thấy email trong hộp thư đến của bạn, vui lòng kiểm
            tra thư mục thư rác của bạn.
          </p>

          <Link
            to="/signin"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-accent hover:bg-gray-50 transition"
          >
            <span className="mr-2">←</span> Trở về trang đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
