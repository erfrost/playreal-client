import { toastError } from "@/lib/toastifyActions";
import { CartItem } from "@/models/CartItem";
import { getCookie, setCookie } from "cookies-next";

export const getCart = () => {
  const cartCookie: string | undefined = getCookie("cart");
  if (!cartCookie) return [];

  const parseCart: CartItem[] = JSON.parse(cartCookie);
  return parseCart;
};

export const addInCart = (cartItem: CartItem) => {
  const cartCookie: string | undefined = getCookie("cart");

  let cart: CartItem[] = [];

  try {
    if (cartCookie) cart = JSON.parse(cartCookie);
    else cart = [];
  } catch (error) {
    toastError("При добавлении услуги в корзину произошла ошибка");
  }

  cart.push(cartItem);

  setCookie("cart", JSON.stringify(cart));
};

export const removeFromCart = (cartId: string) => {
  const cartCookie: string | undefined = getCookie("cart");
  if (!cartCookie) return;

  let cart: CartItem[] = [];

  try {
    cart = JSON.parse(cartCookie);
    cart = cart.filter((item: CartItem) => item.cartId !== cartId);
  } catch (error) {
    toastError("При удалении услуги из корзины произошла ошибка");
  }

  setCookie("cart", JSON.stringify(cart));
};
