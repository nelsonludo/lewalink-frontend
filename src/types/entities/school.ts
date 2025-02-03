import { Creator } from "./creator";

export enum SchoolType {
  PublicStateUniversity = "PublicStateUniversity",
  PrivateUniversity = "PrivateUniversity",
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
  email: string;
  phoneNumber: string;
  website: string;
  pictures: string[];
  visits: number;
  rating: number;
  imagesUrls: ImageUrl[];

  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
