import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./../../../Components/Common/Button";
import GenderCheckbox from "../../Auth/register/GenderCheckbox";
import { useAuthContext } from "./../../../Contexts/auth/UseAuth";
import { Camera } from "lucide-react";
import { useCRUD } from "../../../Hooks/useCRUD";
import useUploadImage from "../../../Hooks/useUploadImage";
import { showAlert } from "../../../Components/Common/showAlert";

const FormUpdateProfile = () => {
  const { patch: updateUser } = useCRUD(["users"]);
  const { uploadImage } = useUploadImage();
  const { authUser, setAuthUser } = useAuthContext();
  const [selectedGender, setSelectedGender] = useState(authUser?.user?.gender);
  const [image, setImage] = useState(
    authUser?.user?.avatar || "/images/defaultavatar.jpg"
  );

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  const handleGenderChange = (gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
    formik.setFieldValue("gender", selectedGender === gender ? "" : gender);
  };

  const formik = useFormik({
    initialValues: {
      name: (authUser && authUser.user.name) || "",
      phone: (authUser && authUser.user.phone) || "",
      birthday: (authUser && authUser.user.birthday) || "",
      email: (authUser && authUser.user.email) || "",
      address: (authUser && authUser.user.address) || "",
      avatar: (authUser && authUser.user.avatar) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Họ tên là bắt buộc"),
      phone: Yup.string()
        .matches(/^\d{10,11}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại là bắt buộc"),
      birthday: Yup.date().required("Ngày sinh là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
    }),
    onSubmit: async (values) => {
      let imgAvatar = authUser.user.avatar;
      if (values.avatar !== authUser.user.avatar) {
        imgAvatar = await uploadImage(values.avatar);
      }

      updateUser.mutate(
        {
          url: `users/${authUser?.user?.id}`,
          data: {
            ...values,
            avatar: imgAvatar,
          },
          shouldShowAlert: false,
        },
        {
          onSuccess: (data) => {
            const user = {
              user: data.user,
              token: authUser.token,
            };
            localStorage.setItem("user", JSON.stringify(user));
            setAuthUser(user);

            showAlert(
              "Thành công",
              "Cập nhật thông tin thành công!",
              "success"
            );
          },
        }
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="lg:min-w-[800px] px-2">
      <div className="flex flex-col gap-3 mb-4">
        <div className="relative">
          <img
            src={image}
            alt="Profile"
            className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4"
          />
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 left-8 md:left-14 p-1 bg-black opacity-50 rounded-full flex items-center justify-center cursor-pointer"
          >
            <span className="text-white">
              {" "}
              <Camera className="w-4 h-4 md:w-6 md:h-6" />
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              handleImageChange(event);
              formik.setFieldValue("avatar", event.target.files[0]);
            }}
            className="hidden"
            id="fileInput"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            name: "address",
            type: "address",
            placeholder: "Nhập địa chỉ",
            label: "Địa chỉ",
            autocomplete: "new-address",
          },
        ].map(({ name, type, placeholder, label, autocomplete }) => (
          <div key={name} className={`mb-2 flex flex-col gap-2`}>
            <label className="text-sm font-medium text-gray-900">{label}</label>
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
        <div className="flex flex-col justify-center ">
          <label className="text-sm font-medium text-gray-900">Giới tính</label>
          <div className="py-4">
            <GenderCheckbox
              onCheckboxChange={handleGenderChange}
              selectedGender={selectedGender}
            />
            {formik.touched.gender && formik.errors.gender ? (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            ) : (
              <p className="min-h-[20px]"></p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button className="!w-60" type="submit">
          Cập nhật
        </Button>
      </div>
    </form>
  );
};

export default FormUpdateProfile;
