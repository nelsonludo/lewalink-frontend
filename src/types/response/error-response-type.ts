import { CODE } from "../enums/error-codes";

export type ErrorResponseType = {
  code: CODE;
  message: string;
};
