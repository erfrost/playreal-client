import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getChats = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("chats");

    return res.data.chats;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При получении чатов произошла ошибка"
    );
  }
};

export default getChats;
