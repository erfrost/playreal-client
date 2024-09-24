import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const getBalance = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get("users/balance");

    return res.data.balance;
  } catch (error: any) {
    console.log(
      error?.response?.data?.message ||
        "При получении баланса пользователя произошла ошибка"
    );
  }
};

export default getBalance;
