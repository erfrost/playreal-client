import { selector } from "recoil";
import { authIsPendingState, cartState, supportIsOpenState } from "./atoms";

export const cartSelector = selector({
  key: "cartSelector",
  get: ({ get }) => get(cartState),
  set: ({ set }, value) =>
    set(cartState, (state) => ({ ...state, value: value })),
});

export const supportIsOpenSelector = selector({
  key: "supportIsOpenSelector",
  get: ({ get }) => get(supportIsOpenState),
  set: ({ set }, value) => set(supportIsOpenState, value),
});

export const authIsPendingSelector = selector({
  key: "authIsPendingSelector",
  get: ({ get }) => get(authIsPendingState),
  set: ({ set }, value) => set(authIsPendingState, value),
});
