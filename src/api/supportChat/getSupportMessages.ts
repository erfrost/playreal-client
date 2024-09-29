import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getSupportMessages = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("supportChat/messages");

    return res.data.messages;
  } catch (error: any) {
    console.log(
      error?.response?.data?.message ||
        "При получении сообщений произошла ошибка"
    );
  }
};

export default getSupportMessages;
