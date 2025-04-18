import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenderCheckbox from "./GenderCheckbox";
import { useCRUD } from "../../../Hooks/useCRUD";
import AuthSlideshow from "../common/AuthSlideshow";
import { showAlert } from "../../../Components/Common/showAlert";
import api from "../../../apis/axios";
import { Mail, User, Phone, Calendar, Lock, Eye, EyeOff } from "lucide-react";

export function Register() {
  const nav = useNavigate();
  const { create: register } = useCRUD(["register"]);
  const [selectedGender, setSelectedGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGenderChange = (gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
    formik.setFieldValue("gender", selectedGender === gender ? "" : gender);
  };

  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 12,
    today.getMonth(),
    today.getDate()
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      birthday: "",
      password: "",
      password_confirmation: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Họ và tên là bắt buộc")
        .min(6, "Tên tối thiểu 6 ký tự")
        .max(50, "Tên tối đa 50 ký tự"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phone: Yup.string()
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Số điện thoại không hợp lệ"
        )
        .required("Số điện thoại là bắt buộc"),
      birthday: Yup.date()
        .required("Ngày sinh là bắt buộc")
        .max(minDate, "Bạn phải ít nhất 12 tuổi"),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Mật khẩu là bắt buộc"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
        .required("Xác thực mật khẩu là bắt buộc"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
    }),
    onSubmit: (values) => {
      register.mutate(
        {
          url: "/register",
          data: values,
          shouldShowAlert: false,
        },
        {
          onSuccess: () => {
            showAlert("Đăng ký thành công", "Vui lòng đăng nhập", "success");
            formik.resetForm();
            setSelectedGender("");
            nav("/login");
          },
          onError: (error) => {
            showAlert("Đăng ký thất bại", error.response.data.message, "error");
          },
        }
      );
    },
  });

  const handleGoogleRegister = async () => {
    const { data } = await api.get("/auth/google");
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Nhập họ và tên",
      label: "Họ và tên",
      autocomplete: "name",
      icon: <User className="h-5 w-5 text-gray-400" />,
    },
    {
      name: "email",
      type: "email",
      placeholder: "name@mail.com",
      label: "Email",
      autocomplete: "email",
      icon: <Mail className="h-5 w-5 text-gray-400" />,
    },
    {
      name: "phone",
      type: "text",
      placeholder: "Nhập số điện thoại",
      label: "Số điện thoại",
      autocomplete: "tel",
      icon: <Phone className="h-5 w-5 text-gray-400" />,
    },
    {
      name: "birthday",
      type: "date",
      label: "Ngày sinh",
      autocomplete: "bday",
      icon: <Calendar className="h-5 w-5 text-gray-400" />,
    },
  ];

  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-3/5 px-6 md:px-12 py-8 flex flex-col">
        <div className="mb-4 mt-4">
          <div className="flex items-center justify-center md:justify-start">
            <div className="flex items-center">
              <img src="/images/logo/beecinema.png" alt="Logo" />
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-6">
            <h2 className="font-bold mb-2 text-2xl text-gray-800">Đăng Ký</h2>
            <p className="text-gray-600 text-sm">
              Nhập thông tin của bạn để đăng ký tài khoản mới
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
            {formFields.map(
              ({ name, type, placeholder, label, autocomplete, icon }) => (
                <div key={name} className="space-y-1">
                  <label
                    className="text-sm font-medium text-secondary"
                    htmlFor={name}
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      {icon}
                    </div>
                    <input
                      id={name}
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className={`pl-10 w-full py-2.5 px-4 rounded-lg border ${
                        formik.touched[name] && formik.errors[name]
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-accent"
                      } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values[name]}
                      autoComplete={autocomplete}
                    />
                  </div>
                  {formik.touched[name] && formik.errors[name] ? (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors[name]}
                    </p>
                  ) : (
                    <div className="h-4"></div>
                  )}
                </div>
              )
            )}

            {/* Password Field */}
            <div className="space-y-1">
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
                  name="password"
                  placeholder="Nhập mật khẩu"
                  className={`pl-10 w-full py-2.5 px-4 rounded-lg border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-accent"
                  } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  autoComplete="new-password"
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
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              ) : (
                <div className="h-4"></div>
              )}
            </div>

            <div className="space-y-1">
              <label
                className="text-sm font-medium text-secondary"
                htmlFor="password_confirmation"
              >
                Xác thực mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Nhập lại mật khẩu"
                  className={`pl-10 w-full py-2.5 px-4 rounded-lg border ${
                    formik.touched.password_confirmation &&
                    formik.errors.password_confirmation
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-accent"
                  } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_confirmation}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formik.touched.password_confirmation &&
              formik.errors.password_confirmation ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password_confirmation}
                </p>
              ) : (
                <div className="h-4"></div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                Giới tính
              </label>
              <div className="mt-1">
                <GenderCheckbox
                  onCheckboxChange={handleGenderChange}
                  selectedGender={selectedGender}
                />
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.gender}
                </p>
              ) : (
                <div className="h-4"></div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 mt-2"
              disabled={register.isLoading}
            >
              {register.isLoading ? "Đang xử lý..." : "Đăng Ký"}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc đăng ký với
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleRegister}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <img src="/svg/google.svg" alt="Google" className="w-5 h-5" />
              <span className="text-secondary font-medium">
                Đăng ký với Google
              </span>
            </button>

            <p className="text-center text-secondary mt-6">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Slideshow Section */}
      <div className="hidden lg:block lg:w-2/5 bg-emerald-50">
        <div className="h-full sticky top-0">
          <AuthSlideshow />
        </div>
      </div>
    </section>
  );
}

export default Register;
