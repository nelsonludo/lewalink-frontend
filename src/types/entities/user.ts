import { Creator } from "./creator";

export enum UserType {
  Admin = "Admin",
  Editor = "Editor",
  Client = "Client",
}

export type User = {
  id: string;
  name: string;
  email: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  isActive?: boolean;
  creator?: Creator;
  accessToken?: string;
  refreshToken?: string;
};
