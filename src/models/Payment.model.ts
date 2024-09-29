import { Additional } from "./Service.model";

export interface PaymentItem {
  serviceId: string;
  name: string;
  image: string;
  amount: number;
  ratingRange: number[];
  additionals: Additional[];
}

export interface Payment {
  _id: string;
  userId: string;
  amount: string;
  address?: string;
  name?: string;
  type: "payment" | "withdrawal" | "receiving";
  items?: PaymentItem[];
  status: "success" | "pending" | "cancelled";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
