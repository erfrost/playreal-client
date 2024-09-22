import { Additional } from "./Service.model";

export interface CartItem {
  cartId: string;
  serviceId: string;
  ratingRange: number[];
  additionals: Additional[];
}

export interface CartItemWithPrice extends CartItem {
  price: number;
  name: string;
}
