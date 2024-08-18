export interface GameWithServices {
  _id: string;
  title: string;
  services: {
    _id: string;
    name: string;
  }[];
}

export interface Game {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface GameInfo {
  _id: string;
  title: string;
  image: string;
}
