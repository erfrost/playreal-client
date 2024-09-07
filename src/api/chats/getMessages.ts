import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getMessages = async (chatId: string) => {
  try {
    const res: AxiosResponse = await axiosInstance.get(
      `chats/messages/${chatId}`
    );

    return res.data.messages;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При получении сообщений произошла ошибка"
    );
  }
};

export default getMessages;
