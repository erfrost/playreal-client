import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getAllPayment = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("payment/all");

    return res.data.payments;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При получении списка транзакций произошла ошибка"
    );
  }
};

export default getAllPayment;
