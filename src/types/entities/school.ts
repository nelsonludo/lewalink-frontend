import { Creator } from "./creator";

export enum SchoolType {
  PUBLIC_STATE_UNIVERSITY = "PUBLIC_STATE_UNIVERSITY",
  PRIVATE_UNIVERSITY = "PRIVATE_UNIVERSITY",
}

export type ImageUrl = {
  url: string;
  key: string;
};

export type School = {
  id: string;
  name: string;
  description: string;
  type: SchoolType;
  longitude: number;
  latitude: number;
  country: string;
  city: string;
  fullAddressName: string;
  email: string;
  phoneNumber: string;
  website: string;
  pictures?: string[];
  visits: number;
  rating: number;
  imagesUrls?: ImageUrl[];

  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
