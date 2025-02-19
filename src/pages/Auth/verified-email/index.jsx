import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCRUD } from "../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../../Components/Common/showAlert";

const VerifiedEmail = () => {
  const { create: forgotPassword } = useCRUD(["forgot-password"]);
  const { create: logout } = useCRUD(["logout"]);
  const { setAuthUser } = useAuthContext();
  const nav = useNavigate();

  const handleLogout = () => {
    logout.mutate(
      {
        url: "/logout",
        data: {},
        shouldShowAlert: false,
        shouldShowLoadingAlert: false,
      },
      {
        onSuccess: () => {
          localStorage.removeItem("user");
          setAuthUser(null);
          nav("/login");
          showAlert(
            "Thành công",
            "Gửi email thành công! vui lòng kiểm tra và xác thực Email rồi đăng nhập lại",
            "success"
          );
        },
      }
    );
  };

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
          url: "/email/resend",
          data: values,
          shouldShowAlert: false,
        },
        {
          onSuccess: (data) => {
            handleLogout();
          },
        }
      );
    },
  });

  return (
    <div className="w-full">
      <h5 className="text-lg text-center my-2 text-accent font-medium">
        Xác thực Email để có thể đặt vé
      </h5>
      <div className="flex justify-center items-center px-16 sm:px-44">
        <img
          src="/images/sendmail.webp"
          alt="image-sendmail"
          className="w-28 h-28  lg:w-44 lg:h-44"
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3 flex flex-col gap-2 px-1">
          <label className="text-sm text-accent font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent w-full"
            placeholder="name@mail.com"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/30 transition w-full"
        >
          Gửi Email
        </button>
      </form>
    </div>
  );
};

export default VerifiedEmail;
