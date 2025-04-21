import { useFormik } from "formik";
import * as Yup from "yup";
import { CheckCircle, LockKeyhole } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Button from "../../../Components/Common/Button";
import { useCRUD } from "../../../Hooks/useCRUD";
import { showAlert } from "../../../Components/Common/showAlert";

export default function FormForgotPassword() {
  const { create: forgotPassword } = useCRUD(["forgot-password"]);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Mật khẩu là bắt buộc"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
        .required("Xác thực mật khẩu là bắt buộc"),
    }),
    onSubmit: (values) => {
      if (!token || !email) {
        return;
      }
      forgotPassword.mutate(
        {
          url: "/reset-password",
          data: {
            email: email,
            token: token,
            password: values.password,
            password_confirmation: values.confirmPassword,
          },
          shouldShowAlert: false,
        },
        {
          onSuccess: () => {
            showAlert(
              "Thành công",
              "Thay đổi mật khẩu thành công !",
              "success"
            );
            nav("/login");
          },
          onError: (err) => {
            if (err.response.data.message === "Invalid token or email.") {
              showAlert(
                "Cảnh báo",
                "Đã hết thời gian có thể đổi mật khẩu",
                "warning"
              );
              nav("/login");
            }
          },
        }
      );
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 bg-white px-4">
      <img src="/images/logo/beecinema.png" alt="" />
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-xl shadow-md text-center space-y-6">
        <div>
          <LockKeyhole className="mx-auto" />
          <h2 className="text-2xl font-bold text-secondary">
            Đặt lại mật khẩu
          </h2>
          <p className="mt-2 text-secondary text-sm leading-relaxed">
            Cập nhật mật khẩu tài khoản của bạn.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4 text-left">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@domain.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-secondary"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-secondary"
            >
              Nhập lại mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <Button
            disabled={forgotPassword.isLoading}
            className="font-poppins"
            type="submit"
          >
            Thay đổi mật khẩu
          </Button>
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
    </div>
  );
}
