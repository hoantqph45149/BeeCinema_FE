import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenderCheckbox from "./GenderCheckbox";
import { useCRUD } from "../../../Hooks/useCRUD";
import AuthSlideshow from "../common/AuthSlideshow";
import { showAlert } from "../../../Components/Common/showAlert";

export function Register() {
  const nav = useNavigate();
  const { create: register } = useCRUD(["register"]);
  const [selectedGender, setSelectedGender] = useState("");

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
      name: Yup.string().required("Họ và tên là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phone: Yup.string()
        .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
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
          onSuccess: (data) => {
            showAlert("Đăng ký thành công", "Vui lý đăng nhập", "success");
            formik.resetForm();
            setSelectedGender("");
            nav("/login");
          },
        }
      );
    },
  });

  return (
    <section className="mx-8 flex min-h-screen">
      <div className="w-2/5 max-h-screen hidden lg:block sticky top-2">
        <AuthSlideshow />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center text-accent">
          <h2 className="font-bold pb-4 text-xl md:text-2xl">Đăng Ký</h2>
          <p className="text-sm md:text-lg font-normal">
            Nhập thông tin của bạn để đăng ký.
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="pt-8 pb-2 w-full md:mx-auto max-w-[600px] lg:w-1/2"
        >
          {[
            {
              name: "name",
              type: "text",
              placeholder: "Nhập họ và tên",
              label: "Họ và tên",
              autocomplete: "name",
            },
            {
              name: "email",
              type: "email",
              placeholder: "name@mail.com",
              label: "Email",
              autocomplete: "email",
            },
            {
              name: "phone",
              type: "text",
              placeholder: "Nhập số điện thoại",
              label: "Số điện thoại",
              autocomplete: "tel",
            },
            {
              name: "birthday",
              type: "date",
              label: "Ngày sinh",
              autocomplete: "bday",
            },
            {
              name: "password",
              type: "password",
              placeholder: "Nhập mật khẩu",
              label: "Mật khẩu",
              autocomplete: "new-password",
            },
            {
              name: "password_confirmation",
              type: "password",
              placeholder: "Nhập lại mật khẩu",
              label: "Xác thực mật khẩu",
              autocomplete: "new-password",
            },
          ].map(({ name, type, placeholder, label, autocomplete }) => (
            <div key={name} className={`pb-2 flex flex-col gap-2`}>
              <label className="text-sm font-medium text-gray-900">
                {label}
              </label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="outline-none p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent w-full"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[name]}
                autoComplete={autocomplete}
              />

              {formik.touched[name] && formik.errors[name] ? (
                <p className="text-red-500 text-sm">{formik.errors[name]}</p>
              ) : (
                <p className="min-h-[20px]"></p>
              )}
            </div>
          ))}
          {/* Gender selection remains the same */}
          <GenderCheckbox
            onCheckboxChange={handleGenderChange}
            selectedGender={selectedGender}
          />
          {formik.touched.gender && formik.errors.gender ? (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          ) : (
            <p className="min-h-[20px]"></p>
          )}

          <button
            type="submit"
            className="w-full py-3 pt-6 bg-accent text-white rounded-lg"
          >
            Đăng Ký
          </button>
        </form>

        <p className="text-center text-gray-900 font-medium pt-4">
          Đã có tài khoản?
          <Link to="/login" className="text-gray-900 ml-1">
            Đăng nhập
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
