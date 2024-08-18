import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const mergeInputs = (...inputs: any[]) => {
  return twMerge(clsx(inputs));
};

export default mergeInputs;
