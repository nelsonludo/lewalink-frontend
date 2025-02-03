import { Creator } from "./creator";

export enum UserType {
  Admin = "Admin",
  Client = "Client",
  Editor = "Editor",
}

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  creator?: Creator;
  accessToken?: string;
  refreshToken?: string;
};
