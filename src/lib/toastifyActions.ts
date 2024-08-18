import { toast } from "react-toastify";

const params: any = {
  position: "bottom-right",
  autoClose: 2000,
};

export const toastSuccess = (message: string) => {
  return toast.success(message, params);
};

export const toastWarning = (message: string) => {
  return toast.warning(message, params);
};

export const toastError = (message: string) => {
  return toast.error(message, params);
};
