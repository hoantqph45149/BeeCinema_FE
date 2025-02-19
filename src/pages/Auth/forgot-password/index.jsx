import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCRUD } from "../../../Hooks/useCRUD";

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
      <div className="flex justify-center items-center px-16 sm:px-44">
        <img
          src="/images/sendmail.webp"
          alt="image-sendmail"
          className="w-28 h-28  lg:w-44 lg:h-44"
        />
      </div>
      {!sendMaillSucces ? (
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
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <h5 className="text-lg text-accent font-medium">
            Email đã được gửi!
          </h5>
          <button
            onClick={() => setSendMailSucces(false)}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/30 transition "
          >
            Gửi lại
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
