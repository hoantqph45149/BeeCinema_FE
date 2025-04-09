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

export function Login() {
  const { create: login } = useCRUD(["login"]);
  const [openModalforgot, setOpenModalforgot] = useState(false);
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

  return (
    <section className="mx-8 py-1 flex min-h-screen">
      <div className="w-full xl:w-3/5 mt-24">
        <div className="text-center text-accent">
          <h2 className="font-bold mb-4 text-3xl">Đăng Nhập</h2>
          <p className="text-lg font-normal">
            Nhập email và mật khẩu để đăng nhập.
          </p>
        </div>
        <form
          className="mt-8 mb-2 w-full md:mx-auto max-w-[600px] lg:w-1/2"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <div className="mb-3 flex flex-col gap-2">
              <label
                className="text-sm text-accent font-medium"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent w-full"
                placeholder="name@mail.com"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="mb-3 flex flex-col gap-2">
              <label
                className="text-sm text-accent font-medium"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent w-full"
                placeholder="******"
                autoComplete="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          </div>
          <div
            onClick={() => setOpenModalforgot(true)}
            className="flex items-center mt-4 mb-4 cursor-pointer"
          >
            <span className="text-sm text-accent">Quên mật khẩu ?</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-accent text-white rounded-lg hover:opacity-90"
          >
            Đăng nhập
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex w-full items-center justify-center gap-3.5 rounded-lg border hover:bg-secondary/5 p-4 mt-2"
          >
            <span>
              <img src="/svg/google.svg" alt="" />
            </span>
            <span className="text-sm text-secondary font-medium">
              Đăng nhập với Google
            </span>
          </button>

          <p className="text-center text-gray-900 font-medium mt-4">
            Chưa đăng ký?
            <Link to="/register" className="text-accent ml-1">
              Tạo tài khoản
            </Link>
          </p>
        </form>
      </div>
      <div className="w-2/5 min-h-full hidden xl:block sticky top-10">
        <AuthSlideshow />
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
