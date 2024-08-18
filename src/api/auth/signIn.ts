import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { setCookie } from "cookies-next";

const signIn = async (
  email: string,
  password: string,
  role: "user" | "booster"
) => {
  try {
    const res: AxiosResponse = await axiosInstance.post("auth/signIn", {
      email,
      password,
      role,
    });
    const data = res.data;

    setCookie("access_token", data.access_token);
    setCookie("refresh_token", data.refresh_token);
    setCookie("user_id", data.userId);

    window.location.reload();
  } catch (error: any) {
    console.log(error);
    toastError(
      error?.response?.data?.message || "При авторизации произошла ошибка"
    );
  }
};

export default signIn;
