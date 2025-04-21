import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api, { getCsrfToken } from "../../../apis/axios";
import Loading from "../../../Components/Common/Loading";

const GoogleCallback = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          await getCsrfToken();
          await api.get(`/auth/google/callback?code=${code}`);
          nav("/");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [code]);

  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 flex justify-center items-center">
        <Loading />
      </div>
    </div>
  );
};

export default GoogleCallback;
