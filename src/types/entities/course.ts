import { Creator } from "./creator";

export type Course = {
  id: string;
  code: string;
  title: string;
  description: true;
  credits: true;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
};
