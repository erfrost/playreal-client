import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getUserId = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("users/userId");

    return res.data.user_id;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При получении информации о пользователе произошла ошибка"
    );
  }
};

export default getUserId;
