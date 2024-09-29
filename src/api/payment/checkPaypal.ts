import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const checkPaypal = async (
  paymentId: string,
  token: string,
  payerId: string
) => {
  try {
    const res: AxiosResponse = await axiosInstance.post(
      "payment/paypal/check",
      {
        paymentId,
        token,
        payerId,
      }
    );

    return res.data.status;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При проверке оплаты произошла ошибка"
    );
  }
};

export default checkPaypal;
