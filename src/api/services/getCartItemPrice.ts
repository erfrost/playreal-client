import { toastError } from "@/lib/toastifyActions";
import { CartItem } from "@/models/CartItem";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getCartItemPrice = async (service: CartItem) => {
  try {
    const res: AxiosResponse = await axiosInstance.post(
      "services/cartItemPrice",
      {
        service,
      }
    );

    return res.data.price;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При получении стоимости произошла ошибка"
    );
  }
};

export default getCartItemPrice;
