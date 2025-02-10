import { Creator } from "./creator";

export type Course = {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
