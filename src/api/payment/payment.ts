import { toastError } from "@/lib/toastifyActions";
import { CartItem } from "@/models/CartItem.model";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const payment = async (cartItems: CartItem[], method: "stripe" | "paypal") => {
  try {
    const url: string = "payment/" + method;

    const res: AxiosResponse = await axiosInstance.post(url, {
      items: cartItems,
    });

    return res.data.payment_url;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При оплате заказа произошла ошибка"
    );
  }
};

export default payment;
