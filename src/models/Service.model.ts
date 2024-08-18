export interface Requirement {
  _id: string;
  title: string;
  text: string;
}
export interface Additional {
  _id: string;
  title: string;
  price: number;
  days: number;
}

export interface Service {
  _id: string;
  gameId: string;
  name: string;
  basePrice: number;
  coefficientMmr: number;
  params: string[];
  baseMmrPrice: number;
  baseMmrDays: number;
  title: string;
  backgroundCard: string;
  backgroundHeader: string;
  images: string[];
  requirementsTitle: string;
  requirements: Requirement[];
  ratingRange: number[];
  boosterLink: string;
  additionals: Additional[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServiceInfo {
  _id: string;
  name: string;
  params: string[];
  backgroundCard: string;
  basePrice: number;
}
