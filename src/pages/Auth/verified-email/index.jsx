"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useCRUD } from "../../../Hooks/useCRUD";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../../Components/Common/showAlert";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const VerifiedEmail = () => {
  const { create: verifiedEmail } = useCRUD(["verified-email"]);

  const [sendMailSuccess, setSendMailSuccess] = useState(false);

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
      verifiedEmail.mutate(
        {
          url: "/email/resend",
          data: values,
          shouldShowAlert: false,
        },
        {
          onSuccess: () => {
            setSendMailSuccess(true);
          },
        }
      );
    },
  });

  return (
    <div className="w-full max-w-md bg-white">
      {/* Header with logo */}
      <div className="p-4 bg-accent text-white text-center">
        <h1 className="text-xl font-bold">Xác thực Email</h1>
        <p className="text-emerald-100 mt-1">
          Xác thực email để có thể sử dụng đầy đủ tính năng
        </p>
      </div>

      <div className="p-6">
        {sendMailSuccess && (
          <>
            {" "}
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="mb-6 text-center">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Kiểm tra hộp thư của bạn
              </h2>
              <p className="text-gray-600 text-sm">
                Chúng tôi đã gửi một email xác thực đến địa chỉ email của bạn.
                Vui lòng kiểm tra và nhấp vào liên kết để xác thực tài khoản.
              </p>
            </div>
          </>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-1">
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
                className={`pl-10 w-full py-2.5 px-4 rounded-lg border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-accent"
                } focus:border-transparent focus:outline-none focus:ring-2 transition-all`}
                placeholder="name@mail.com"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={verifiedEmail.isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-accent hover:bg-accent/80 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            {verifiedEmail.isLoading ? (
              "Đang gửi..."
            ) : sendMailSuccess ? (
              <>
                Gửi lại email xác thực <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>Gửi email xác thực</>
            )}
          </button>
        </form>
      </div>
      {sendMailSuccess && (
        <div className="text-center text-sm text-gray-500">
          <p>
            Nếu bạn vẫn không nhận được email sau vài phút, vui lòng kiểm tra
            thư mục spam hoặc liên hệ với bộ phận hỗ trợ.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifiedEmail;
