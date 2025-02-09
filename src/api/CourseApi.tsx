import { useState } from "react";
import { MultipleItemsResponseType } from "../types/response/success-response-types";
import { Course } from "../types/entities/course";
import { AxiosError } from "axios";
import { ErrorResponseType } from "../types/response/error-response-type";
import useAxios from "../hooks/useAxios";
import { SUCCESS_CODE } from "../types/enums/error-codes";

const API_URL = "/api/course/v1";

type Payload = {
  page?: number;
  itemsPerPage?: number;
  name: string;
};

export const useSuperUserGetCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { axios } = useAxios();

  const superUserGetCourses = async ({ name, page, itemsPerPage }: Payload) => {
    setLoading(true);
    try {
      const { data } = await axios.get<MultipleItemsResponseType<Course>>(
        `${API_URL}/super-user-get-courses?name=${name}&page=${page}&itemsPerPage=${itemsPerPage}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setCourses(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { superUserGetCourses, loading, totalPages, courses, setCourses };
};
