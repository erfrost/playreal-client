import { toastError } from "@/lib/toastifyActions";
import { Offer } from "@/models/Offer.model";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const completeBoosterOffer = async (offer: Offer) => {
  try {
    const res: AxiosResponse = await axiosInstance.post(
      "offers/complete/booster",
      {
        offer,
      }
    );

    return res.data.offer;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При завершении заказа произошла ошибка"
    );
  }
};

export default completeBoosterOffer;
