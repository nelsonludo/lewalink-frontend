export type Sort = "asc" | "desc";

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
  courseId?: string;
  programId?: string;
  userType?: string;
  city?: string;
  country?: string;
  orderByVisits?: Sort;
  orderByRating?: Sort;
};

export type PayloadForm<T> = Payload & { formData?: T };
