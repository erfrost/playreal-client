import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getRole = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("users/role");

    return res.data.role;
  } catch (error: any) {
    console.log(
      error?.response?.data?.message ||
        "При получении информации о пользователе произошла ошибка"
    );
  }
};

export default getRole;
