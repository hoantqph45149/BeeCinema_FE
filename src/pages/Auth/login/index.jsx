import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCRUD } from "../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import AuthSlideshow from "../common/AuthSlideshow";
import { showAlert } from "../../../Components/Common/showAlert";

export function Login() {
  const { setAuthUser } = useAuthContext();
  const { create: login } = useCRUD(["login"]);
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
      terms: Yup.boolean().oneOf([true], "Bạn phải đồng ý với điều khoản"),
    }),
    onSubmit: (values) => {
      login.mutate(
        {
          url: "/login",
          data: values,
          shouldShowAlert: false,
        },
        {
          onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setAuthUser(data);
            nav("/");
          },
          onError: (error) => {
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

  return (
    <section className="mx-8 my-4 flex">
      <div className="w-full xl:w-3/5 mt-24">
        <div className="text-center text-accent">
          <h2 className="font-bold mb-4 text-3xl">Đăng Nhập</h2>
          <p className="text-lg font-normal">
            Nhập email và mật khẩu để đăng nhập.
          </p>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
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
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex items-center mt-4 mb-4">
            <input
              id="terms"
              type="checkbox"
              className="mr-2"
              {...formik.getFieldProps("terms")}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Tôi đồng ý với&nbsp;
              <a href="#" className="text-accent hover:text-blue-800 underline">
                Điều khoản và điều kiện
              </a>
            </label>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <p className="text-red-500 text-sm">{formik.errors.terms}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-accent text-white rounded-lg hover:opacity-90"
          >
            Đăng nhập
          </button>

          <p className="text-center text-gray-900 font-medium mt-4">
            Chưa đăng ký?
            <Link to="/register" className="text-gray-900 ml-1">
              Tạo tài khoản
            </Link>
          </p>
        </form>
      </div>
      <div className="w-2/5 min-h-lvh hidden xl:block">
        <AuthSlideshow />
      </div>
    </section>
  );
}

export default Login;
