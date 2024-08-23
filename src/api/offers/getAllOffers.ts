import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getAllOffers = async (selectedGames: string[]) => {
  try {
    const res: AxiosResponse = await axiosInstance.post("offers/all", {
      selectedGames,
    });

    return res.data.offers;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При загрузке заказов произошла ошибка"
    );
  }
};

export default getAllOffers;
