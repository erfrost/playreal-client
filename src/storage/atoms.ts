import { CartItem } from "@/models/CartItem";
import { atom } from "recoil";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

export const supportIsOpenState = atom<boolean>({
  key: "supportIsOpenState",
  default: false,
});

export const authIsPendingState = atom<boolean>({
  key: "authIsPendingState",
  default: true,
});
