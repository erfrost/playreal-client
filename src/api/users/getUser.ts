import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getUser = async (userId: string) => {
  try {
    const res: AxiosResponse = await axiosInstance.get(`users/by_id/${userId}`);

    return res.data.user;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При получении информации о пользователе произошла ошибка"
    );
  }
};

export default getUser;
