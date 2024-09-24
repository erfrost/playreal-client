import { Additional } from "./Service.model";

export interface Offer {
  _id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  gameId: string;
  gameName: string;
  serviceId: string;
  title: string;
  serviceImage: string;
  ratingRange: number[];
  additionals: Additional[];
  status: "Pending" | "AtWork" | "Review" | "Already";
  boosterId?: string;
  boosterName?: string;
  boosterAvatar?: string;
  price: number;
  days: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
