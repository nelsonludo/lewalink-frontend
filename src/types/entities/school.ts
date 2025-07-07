import { Creator } from "./creator";

export enum SchoolType {
  SECONDARY_SCHOOL = "SECONDARY_SCHOOL",
  PRIMARY_SCHOOL = "PRIMARY_SCHOOL",
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
  email: string;
  phoneNumber: string;
  website: string;
  visits: number;
  rating: number;
  fullAddressName: string;
  distance?: number;

  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;

  
};

