import { toastError } from "@/lib/toastifyActions";
import { CartItem } from "@/models/CartItem.model";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const payment = async (cartItems: CartItem[]) => {
  try {
    const res: AxiosResponse = await axiosInstance.post("payment", {
      items: cartItems,
    });

    return res.data;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При оплате заказа произошла ошибка"
    );
  }
};

export default payment;
