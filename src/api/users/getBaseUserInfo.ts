import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getBaseUserInfo = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("users/base-info");

    return res.data.user;
  } catch (error: any) {
    console.log(
      error?.response?.data?.message ||
        "При получении информации о пользователе произошла ошибка"
    );
  }
};

export default getBaseUserInfo;
