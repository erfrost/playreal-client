import { toastError } from "@/lib/toastifyActions";
import { Offer } from "@/models/Offer.model";
import { AxiosResponse } from "axios";
import axiosInstance from "axios.config";

const acceptOffer = async (offer: Offer) => {
  try {
    const res: AxiosResponse = await axiosInstance.post("offers/accept", {
      offer,
    });

    return res.data.offer;
  } catch (error: any) {
    toastError(
      error?.response?.data?.message || "При принятии заказа произошла ошибка"
    );
  }
};

export default acceptOffer;
