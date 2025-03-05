import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../apis/axios";
import Loading from "../../../Components/Common/Loading";
import { useAuthContext } from "../../../Contexts/auth/UseAuth";

const GoogleCallback = () => {
  const { setAuthUser } = useAuthContext();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          const { data } = await api.get(`/auth/google/callback?code=${code}`);
          localStorage.setItem("user", JSON.stringify(data));
          setAuthUser(data);
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
