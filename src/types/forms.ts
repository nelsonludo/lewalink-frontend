export type CreateAccountFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};
