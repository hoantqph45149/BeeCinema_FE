import axios from "axios";
import { useState } from "react";

const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const uploadImage = async (file) => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "beecinema");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/du2m9ntlf/image/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.secure_url) {
        setImageUrl(response.data.secure_url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setError(
        error.response?.data?.error?.message || "Có lỗi xảy ra khi upload ảnh"
      );
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, imageUrl, loading, error };
};

export default useUploadImage;
