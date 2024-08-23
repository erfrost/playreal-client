import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { setCookie } from "cookies-next";

const signUp = async (
  email: string,
  nickname: string,
  password: string,
  role: "user" | "booster"
) => {
  try {
    const res: AxiosResponse = await axiosInstance.post("auth/signUp", {
      email,
      nickname,
      password,
      role,
    });
    const data = res.data;

    setCookie("access_token", data.access_token);
    setCookie("refresh_token", data.refresh_token);
    setCookie("user_id", data.userId);
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При создании аккаунта произошла ошибка"
    );
  }
};

export default signUp;
