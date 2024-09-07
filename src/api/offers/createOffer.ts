import { toastError } from "@/lib/toastifyActions";
import { CartItem } from "@/models/CartItem.model";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const createOffer = async (services: CartItem[]) => {
  try {
    const res: AxiosResponse = await axiosInstance.post("offers/create", {
      services,
    });

    return res.data.offers;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При создании заказа произошла ошибка"
    );
  }
};

export default createOffer;
