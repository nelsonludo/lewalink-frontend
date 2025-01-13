export type User = {
  id: string;
  name: string;
  email: string;
  type: string;
  accessToken?: string;
  refreshToken?: string;
};
