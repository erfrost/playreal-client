import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const uploadAudio = async (audio: Blob) => {
  try {
    const formData: FormData = new FormData();
    formData.append("audio", audio, ".webm");

    const res: AxiosResponse = await axiosInstance.post(
      "files/uploadAudio",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.audio_url;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При загрузке аудио на сервер произошла ошибка"
    );
  }
};

export default uploadAudio;
