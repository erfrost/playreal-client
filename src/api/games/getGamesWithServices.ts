import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getGamesWithServices = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("games/withServices");

    return res.data.games;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При получении игр произошла ошибка"
    );
  }
};

export default getGamesWithServices;
