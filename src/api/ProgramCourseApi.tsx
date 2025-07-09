import { useState } from "react";
import {
  MultipleItemsResponseType,
  SingleItemResponseType,
} from "../types/response/success-response-types";
import { AxiosError } from "axios";
import { ErrorResponseType } from "../types/response/error-response-type";
import useAxios from "../hooks/useAxios";
import { CODES, SUCCESS_CODE } from "../types/enums/error-codes";

import { displayErrorToastBasedOnCode } from "../utils/display-error-toast-based-on-code";
import { Payload } from "../types/general";
import { failedToast, successToast } from "../utils/toasts";
import { ProgramCourse } from "../types/entities/program-course";
import { useDispatch } from "react-redux";
import { setCurrentSchoolProgramCourses } from "../store/userHome.slice";

const API_URL = "/api/program-course/v1";

export const useSuperUserGetProgramCourses = () => {
  const [loading, setLoading] = useState(false);
  const [programCourses, setProgramCourses] = useState<ProgramCourse[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { axios } = useAxios();

  const superUserGetProgramCourses = async ({
    page,
    itemsPerPage,
    id,
  }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.get<
        MultipleItemsResponseType<ProgramCourse>
      >(
        `${API_URL}/super-user-get-courses/${id}?page=${page}&itemsPerPage=${itemsPerPage}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setProgramCourses(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      displayErrorToastBasedOnCode(code);
    } finally {
      setLoading(false);
    }
  };

  return {
    superUserGetProgramCourses,
    loading,
    totalPages,
    programCourses,
    setProgramCourses,
  };
};

export const useSuperUserDeletesProgramCourse = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserDeletesProgramCourse = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.delete<
        SingleItemResponseType<ProgramCourse>
      >(`${API_URL}/${id}`);
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Course deleted successfully");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      displayErrorToastBasedOnCode(code);
    } finally {
      setLoading(false);
    }
  };

  return { superUserDeletesProgramCourse, loading };
};

export const useSuperUserRestoresDeletedProgramCourse = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserRestoresDeletedProgramCourse = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<ProgramCourse>>(
        `${API_URL}/restore/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Course restored successfully");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      displayErrorToastBasedOnCode(code);
    } finally {
      setLoading(false);
    }
  };

  return { superUserRestoresDeletedProgramCourse, loading };
};

export const useSuperUserAddsCourseToProgram = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserAddsCourseToProgram = async ({
    programId,
    courseId,
  }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<ProgramCourse>>(
        `${API_URL}`,
        { courseId, programId }
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Course added successfully");
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      displayErrorToastBasedOnCode(code);
    } finally {
      setLoading(false);
    }
  };

  return { superUserAddsCourseToProgram, loading };
};

export const useUserGetCurrentSchoolProgramCourses = () => {
  const [loading, setLoading] = useState(false);

  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();

  const { axios } = useAxios();

  const userGetCurrentSchoolProgramCourses = async ({ id }: Payload) => {
    setNotFound(false);
    try {
      setLoading(true);
      const { data } = await axios.get<SingleItemResponseType<ProgramCourse[]>>(
        `${API_URL}/courses/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        dispatch(setCurrentSchoolProgramCourses(data.data));
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      if (code === CODES.NOT_FOUND) {
        failedToast("Program does not exist");
        setNotFound(true);
        return;
      }

      displayErrorToastBasedOnCode(code);
    } finally {
      setLoading(false);
    }
  };

  return {
    userGetCurrentSchoolProgramCourses,
    loading,
    notFound,
  };
};
