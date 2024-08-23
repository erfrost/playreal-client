export interface User {
  _id: string;
  role: "user" | "booster";
  email: string;
  oauth: "Google" | "Discord" | undefined;
  nickname: string;
  description: string;
  avatar_url: string;
  games: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserInfo {
  _id: string;
  email: string;
  nickname: string;
  avatar_url: string;
  role: "user" | "booster";
  games: string[];
}

export interface Booster {
  _id: string;
  nickname: string;
  description: string;
  avatar_url: string;
}
