export type ViewOrUpdateOrDeleteType<T> = {
  show: boolean;
  data: T;
};

export type Payload = {
  id?: string;
  page?: number;
  itemsPerPage?: number;
  name?: string;
  type?: string;
  field?: string;
};

export type PayloadForm<T> = Payload & { formData?: T };
