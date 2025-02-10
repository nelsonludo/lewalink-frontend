import { useState } from "react";
import {
  MultipleItemsResponseType,
  SingleItemResponseType,
} from "../types/response/success-response-types";
import { Course } from "../types/entities/course";
import { AxiosError } from "axios";
import { ErrorResponseType } from "../types/response/error-response-type";
import useAxios from "../hooks/useAxios";
import { CODE, SUCCESS_CODE } from "../types/enums/error-codes";
import { failedToast, successToast } from "../utils/toasts";

const API_URL = "/api/course/v1";

type Payload = {
  id?: string;
  page?: number;
  itemsPerPage?: number;
  name?: string;
};

export const useSuperUserGetCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { axios } = useAxios();

  const superUserGetCourses = async ({ name, page, itemsPerPage }: Payload) => {
    try {
      setLoading(true);
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

export const useSuperUserRestoresDeletedCourse = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserRestoresDeletedCourse = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<Course>>(
        `${API_URL}/restore/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Course restored successfully");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { superUserRestoresDeletedCourse, loading };
};

export const useSuperUserDeletesCourse = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserDeletesCourse = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.delete<SingleItemResponseType<Course>>(
        `${API_URL}/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Course restored successfully");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { superUserDeletesCourse, loading };
};

export const useSuperUserGetsCourse = () => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { axios } = useAxios();

  const superUserGetsCourse = async ({ id }: Payload) => {
    setNotFound(false);
    try {
      setLoading(true);
      const { data } = await axios.get<SingleItemResponseType<Course>>(
        `${API_URL}/super-user-get-course/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setCourse(data.data);
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;

      const code = error.response?.data.code;

      console.log(error);

      switch (code) {
        case CODE.NOT_FOUND:
          failedToast("Unable to login");
          setNotFound(true);
          break;

        default:
          failedToast("Something went wrong");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    superUserGetsCourse,
    loading,
    course,
    notFound,
    setCourse,
  };
};
