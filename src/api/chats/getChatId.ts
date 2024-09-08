import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getChatId = async (boosterId: string) => {
  try {
    const res: AxiosResponse = await axiosInstance.get(
      `chats/chatId?boosterId=${boosterId}`
    );

    return res.data.chatId;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При получении чата произошла ошибка"
    );
  }
};

export default getChatId;
