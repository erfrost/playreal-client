import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getUnreadMessagesCount = async (chatId: string) => {
  try {
    const res: AxiosResponse = await axiosInstance.get(
      `chats/unreadMessagesCount/${chatId}`
    );

    return res.data.unreadMessagesCount;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При получении сообщений произошла ошибка"
    );
  }
};

export default getUnreadMessagesCount;
