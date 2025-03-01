import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCRUD } from "../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { showAlert } from "../../../Components/Common/showAlert";

const ResetPassword = ({ setModal }) => {
  const { authUser } = useAuthContext();
  const { create: resetPassword } = useCRUD(["change-password"]);

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema: Yup.object({
      current_password: Yup.string().required(
        "Vui lòng nhập mật khẩu hiện tại"
      ),
      new_password: Yup.string()
        .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
        .notOneOf(
          [Yup.ref("current_password")],
          "Mật khẩu mới không được giống mật khẩu hiện tại"
        )
        .required("Vui lòng nhập mật khẩu mới"),
      new_password_confirmation: Yup.string()
        .oneOf([Yup.ref("new_password")], "Mật khẩu xác nhận không khớp")
        .required("Vui lòng nhập lại mật khẩu mới"),
    }),
    onSubmit: (values) => {
      console.log({
        ...values,
        token: authUser.token,
      });

      resetPassword.mutate(
        {
          url: "/change-password",
          data: {
            ...values,
            token: authUser.token,
          },
          shouldShowAlert: false,
        },
        {
          onSuccess: (data) => {
            formik.resetForm();
            setModal(false);
            showAlert("Thành công", "Đổi mật khẩu thành công!", "success");
          },
          onError: (error) => {
            showAlert("Thất bại", "Đổi mật khẩu thất bại!", "error");
          },
        }
      );
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="mx-auto w-[600px]">
        <div className="mb-3 flex flex-col gap-2 px-1">
          <label
            className="text-sm text-accent font-medium"
            htmlFor="current_password"
          >
            Mật khẩu hiện tại
          </label>
          <input
            id="current_password"
            type="password"
            className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent w-full"
            placeholder="*******"
            {...formik.getFieldProps("current_password")}
          />
          {formik.errors.current_password &&
            formik.touched.current_password && (
              <p className="text-red-500 text-sm">
                {formik.errors.current_password}
              </p>
            )}
        </div>

        <div className="mb-3 flex flex-col gap-2 px-1">
          <label
            className="text-sm text-accent font-medium"
            htmlFor="new_password"
          >
            Mật khẩu mới
          </label>
          <input
            id="new_password"
            type="password"
            className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent w-full"
            placeholder="*******"
            {...formik.getFieldProps("new_password")}
          />
          {formik.errors.new_password && formik.touched.new_password && (
            <p className="text-red-500 text-sm">{formik.errors.new_password}</p>
          )}
        </div>

        <div className="mb-3 flex flex-col gap-2 px-1">
          <label
            className="text-sm text-accent font-medium"
            htmlFor="new_password_confirmation"
          >
            Xác nhận mật khẩu mới
          </label>
          <input
            id="new_password_confirmation"
            type="password"
            className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent w-full"
            placeholder="*******"
            {...formik.getFieldProps("new_password_confirmation")}
          />
          {formik.errors.new_password_confirmation &&
            formik.touched.new_password_confirmation && (
              <p className="text-red-500 text-sm">
                {formik.errors.new_password_confirmation}
              </p>
            )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/30 transition w-full"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
