import { useState } from "react";
import {
  MultipleItemsResponseType,
  SingleItemResponseType,
} from "../types/response/success-response-types";
import { AxiosError } from "axios";
import { ErrorResponseType } from "../types/response/error-response-type";
import useAxios from "../hooks/useAxios";
import { SUCCESS_CODE } from "../types/enums/error-codes";

import { displayErrorToastBasedOnCode } from "../utils/display-error-toast-based-on-code";
import { Payload, PayloadForm } from "../types/general";

import { School, SchoolType } from "../types/entities/school";
import { successToast } from "../utils/toasts";
import { SchoolFormType } from "../types/forms";
import { useDispatch } from "react-redux";
import {
  setCurrentSchool,
  setSchools as globalSetSchools,
} from "../store/userHome.slice";
import { ProgramFieldType, ProgramType } from "../types/entities/program";

const API_URL = "/api/school/v1";

export enum OrderByType {
  ASC = "asc",
  DESC = "desc",
}

export type SchoolFilterType = {
  name?: string;
  type?: SchoolType;
  programName?: string;
  programMinPrice?: number;
  programMaxPrice?: number;
  city?: string;
  country?: string;
  orderByRating?: OrderByType;
  orderByVisits?: OrderByType;
  orderByDistance?: OrderByType;

  longitude?: string;
  latitude?: string;
  programType?: ProgramType;
  programField?: ProgramFieldType;
};

export const useSuperUserGetSchools = () => {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { axios } = useAxios();

  const superUserGetSchools = async (payload: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.get<MultipleItemsResponseType<School>>(
        `${API_URL}/super-user-see-schools`,
        {
          params: { ...payload },
        }
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setSchools(data.data);
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

  return { superUserGetSchools, loading, totalPages, schools, setSchools };
};

export const useSuperUserDeletesSchool = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserDeletesSchool = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.delete<SingleItemResponseType<School>>(
        `${API_URL}/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("School deleted successfully");
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

  return { superUserDeletesSchool, loading };
};

export const useSuperUserRestoresDeletedSchool = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserRestoresDeletedSchool = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<School>>(
        `${API_URL}/restore/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("School restored successfully");
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

  return { superUserRestoresDeletedSchool, loading };
};

export const useSuperUserCreatesSchool = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserCreatesSchool = async ({
    formData,
  }: PayloadForm<SchoolFormType>) => {
    try {
      console.log(formData);

      const formDataEntry = new FormData();
      formData = formData as SchoolFormType;

      formDataEntry.append("name", formData.name);
      formDataEntry.append("type", formData.type);
      formDataEntry.append("description", formData.description);
      formDataEntry.append("longitude", formData.longitude);
      formDataEntry.append("latitude", formData.latitude);
      formDataEntry.append("country", formData.country);
      formDataEntry.append("city", formData.city);
      formDataEntry.append("fullAddressName", formData.fullAddressName);

      for (let i = 0; i < Object.values(formData.images).length; i++) {
        formDataEntry.append("images", Object.values(formData.images)[i]);
      }

      if (formData.email) {
        formDataEntry.append("email", formData.email);
      }

      if (formData.phoneNumber) {
        formDataEntry.append("phoneNumber", formData.phoneNumber);
      }

      if (formData.website) {
        formDataEntry.append("website", formData.website);
      }

      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<School>>(
        `${API_URL}`,
        formDataEntry,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Program created successfully");

        return data.data;
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

  return { superUserCreatesSchool, loading };
};

//user Api's
export const useUserGetSchools = () => {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();

  const { axios } = useAxios();

  const userGetSchools = async ({
    filters,
    page,
    pageSize,
  }: {
    filters: SchoolFilterType;
    page: number;
    pageSize: number;
  }) => {
    try {
      setLoading(true);
      const { data } = await axios.get<MultipleItemsResponseType<School>>(
        `${API_URL}/search?page=${page}&itemsPerPage=${pageSize}`,
        {
          params: { ...filters },
        }
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setSchools(data.data);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        dispatch(globalSetSchools(data.data));
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
    userGetSchools,
    loading,
    schools,
    setSchools,
    totalItems,
    totalPages,
  };
};

export const useUserGetSingleSchool = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { axios } = useAxios();

  const userGetSingleSchool = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.get<SingleItemResponseType<School>>(
        `${API_URL}/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        dispatch(setCurrentSchool(data.data));
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

  return { userGetSingleSchool, loading };
};
