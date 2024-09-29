import { toastError } from "@/lib/toastifyActions";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const withdrawalCreate = async (amount: string, address: string) => {
  try {
    const res: AxiosResponse = await axiosInstance.post(
      "payment/withdrawal/create",
      {
        amount,
        address,
      }
    );

    return res.data.status;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message ||
        "При создании заявки на вывод средств произошла ошибка"
    );
  }
};

export default withdrawalCreate;
