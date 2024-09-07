import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const uploadImage = async (file: File) => {
  try {
    const formData: FormData = new FormData();
    formData.append("image", file);

    const res: AxiosResponse = await axiosInstance.post(
      "files/uploadImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.image_url;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При загрузке изображения на сервер произошла ошибка"
    );
  }
};

export default uploadImage;
