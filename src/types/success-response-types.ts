import { SUCCESS_CODE } from "./error-codes";

export type SingleItemResponseType<T> = {
  data: T;
  code: SUCCESS_CODE;
  yo: string;
};

export type SimpleSuccessResponseType = {
  code: SUCCESS_CODE;
};

export type MultipleItemsResponseType<T> = {
  totalPages: number;
  itemsPerPage: number;
  page: number;
  data: T[];
  code: SUCCESS_CODE;
};
