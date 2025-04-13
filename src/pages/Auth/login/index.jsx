import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api, { getCsrfToken } from "../../../apis/axios";
import Modal from "../../../Components/Common/Modal";
import { showAlert } from "../../../Components/Common/showAlert";
import { useCRUD } from "../../../Hooks/useCRUD";
import AuthSlideshow from "../common/AuthSlideshow";
import ForgotPassword from "../forgot-password";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export function Login() {
  const { create: login } = useCRUD(["login"]);
  const [openModalforgot, setOpenModalforgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      await getCsrfToken();
      login.mutate(
        {
          url: "/login",
          data: values,
          shouldShowAlert: false,
        },
        {
          onSuccess: () => {
            nav("/");
          },
          onError: () => {
            showAlert(
              "Đăng nhập thất bại",
              "Sai tài khoản hoặc mật khẩu vui lòng đăng nhập lại",
              "error"
            );
          },
        }
      );
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const { data } = await api.get("/auth/google");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full xl:w-3/5 px-6 md:px-12 py-8 flex flex-col">
        <div className="mb-8 mt-6">
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex items-center">
              <img src="/images/logo/beecinema.png" alt="Logo" />
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="font-bold mb-3 text-3xl text-gray-800">Đăng Nhập</h2>
            <p className="text-gray-600">
              Nhập email và mật khẩu để đăng nhập vào tài khoản của bạn
            </p>
          </div>

          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-secondary"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-accent"
                    } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
                    placeholder="name@mail.com"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-secondary"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`pl-10 w-full py-3 px-4 rounded-lg border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-accent"
                    } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...formik.getFieldProps("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setOpenModalforgot(true)}
                  className="text-sm font-medium text-accent hover:text-accent transition-colors"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                disabled={login.isLoading}
              >
                {login.isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Hoặc đăng nhập với
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <img src="/svg/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-secondary font-medium">
                  Đăng nhập với Google
                </span>
              </button>
            </div>

            <p className="text-center text-secondary mt-8">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-medium text-accent hover:text-accent transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden xl:block xl:w-2/5 bg-emerald-50">
        <div className="h-full sticky top-0">
          <AuthSlideshow />
        </div>
      </div>

      <Modal
        isOpen={openModalforgot}
        onClose={() => setOpenModalforgot(false)}
        onSubmit={() => alert("Submitted!")}
        title="Quên mật khẩu"
        isFooter={false}
      >
        <ForgotPassword />
      </Modal>
    </section>
  );
}

export default Login;
