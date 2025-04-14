import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCRUD } from "../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { showAlert } from "../../../Components/Common/showAlert";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import Button from "../../../Components/Common/Button";

const ResetPassword = ({ setModal }) => {
  const { authUser } = useAuthContext();
  const { create: resetPassword } = useCRUD(["change-password"]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          onSuccess: () => {
            formik.resetForm();
            setModal(false);
            showAlert("Thành công", "Đổi mật khẩu thành công!", "success");
          },
          onError: () => {
            showAlert("Thất bại", "Đổi mật khẩu thất bại!", "error");
          },
        }
      );
    },
  });

  return (
    <div className="bg-white text-center space-y-6 p-2">
      <div className="mb-6">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <LockKeyhole className="h-6 w-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Đặt lại mật khẩu</h2>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Cập nhật mật khẩu tài khoản của bạn để bảo mật thông tin.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5 text-left">
        {/* Current Password Field */}
        <div className="space-y-1">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="current_password"
          >
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <input
              id="current_password"
              type={showCurrentPassword ? "text" : "password"}
              className={`w-full py-2.5 px-4 rounded-lg border ${
                formik.touched.current_password &&
                formik.errors.current_password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-accent"
              } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
              placeholder="••••••••"
              {...formik.getFieldProps("current_password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {formik.touched.current_password &&
            formik.errors.current_password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.current_password}
              </p>
            )}
        </div>

        {/* New Password Field */}
        <div className="space-y-1">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="new_password"
          >
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="new_password"
              type={showNewPassword ? "text" : "password"}
              className={`w-full py-2.5 px-4 rounded-lg border ${
                formik.touched.new_password && formik.errors.new_password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-accent"
              } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
              placeholder="••••••••"
              {...formik.getFieldProps("new_password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {formik.touched.new_password && formik.errors.new_password && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.new_password}
            </p>
          )}
        </div>

        {/* Confirm New Password Field */}
        <div className="space-y-1">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="new_password_confirmation"
          >
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="new_password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full py-2.5 px-4 rounded-lg border ${
                formik.touched.new_password_confirmation &&
                formik.errors.new_password_confirmation
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-accent"
              } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
              placeholder="••••••••"
              {...formik.getFieldProps("new_password_confirmation")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {formik.touched.new_password_confirmation &&
            formik.errors.new_password_confirmation && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.new_password_confirmation}
              </p>
            )}
        </div>

        <div className="pt-2">
          <Button
            disabled={resetPassword.isLoading}
            className="font-poppins"
            type="submit"
          >
            {resetPassword.isLoading ? "Đang xử lý..." : "Thay đổi mật khẩu"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
