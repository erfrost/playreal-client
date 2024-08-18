import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";
import { setCookie } from "cookies-next";

const updateToken = async (refreshToken: string) => {
  try {
    const res: AxiosResponse = await axiosInstance.post("tokens/update", {
      refresh_token: refreshToken,
    });

    const tokens = res.data;

    setCookie("access_token", tokens.access_token);
    setCookie("refresh_token", tokens.refresh_token);

    return res.data.access_token;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При обновлении токена произошла ошибка"
    );
  }
};

export default updateToken;
