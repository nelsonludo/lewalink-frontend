import { useState } from "react";
import {
  MultipleItemsResponseType,
  SingleItemResponseType,
} from "../types/response/success-response-types";
import { AxiosError } from "axios";
import { ErrorResponseType } from "../types/response/error-response-type";
import useAxios from "../hooks/useAxios";
import { CODE, SUCCESS_CODE } from "../types/enums/error-codes";

import { displayErrorToastBasedOnCode } from "../utils/display-error-toast-based-on-code";
import { Payload, PayloadForm } from "../types/general";
import { Program } from "../types/entities/program";
import { failedToast, successToast } from "../utils/toasts";
import { ProgramFormType } from "../types/forms";

const API_URL = "/api/program/v1";

export const useSuperUserGetPrograms = () => {
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { axios } = useAxios();

  const superUserGetPrograms = async ({
    name,
    page,
    itemsPerPage,
    type,
    field,
  }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.get<MultipleItemsResponseType<Program>>(
        `${API_URL}/super-user-get-programs?name=${name}&type=${type}&field=${field}&page=${page}&itemsPerPage=${itemsPerPage}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setPrograms(data.data);
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

  return { superUserGetPrograms, loading, totalPages, programs, setPrograms };
};

export const useSuperUserDeletesProgram = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserDeletesProgram = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.delete<SingleItemResponseType<Program>>(
        `${API_URL}/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Program restored successfully");
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

  return { superUserDeletesProgram, loading };
};

export const useSuperUserRestoresDeletedProgram = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserRestoresDeletedProgram = async ({ id }: Payload) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<Program>>(
        `${API_URL}/restore/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Program restored successfully");
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

  return { superUserRestoresDeletedProgram, loading };
};

export const useSuperUserCreatesProgram = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserCreatesProgram = async ({
    formData,
  }: PayloadForm<ProgramFormType>) => {
    try {
      setLoading(true);
      const { data } = await axios.post<SingleItemResponseType<Program>>(
        `${API_URL}`,
        { ...formData }
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

  return { superUserCreatesProgram, loading };
};

export const useSuperUserGetsProgram = () => {
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<Program | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { axios } = useAxios();

  const superUserGetsProgram = async ({ id }: Payload) => {
    setNotFound(false);
    try {
      setLoading(true);
      const { data } = await axios.get<SingleItemResponseType<Program>>(
        `${API_URL}/super-user-get-program/${id}`
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        setProgram(data.data);
      }

      return data.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponseType>;
      const code = error.response?.data.code;

      console.log(error);

      if (code === CODE.NOT_FOUND) {
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
    superUserGetsProgram,
    loading,
    program,
    notFound,
    setProgram,
  };
};

export const useSuperUserUpdatesProgram = () => {
  const [loading, setLoading] = useState(false);

  const { axios } = useAxios();

  const superUserUpdatesProgram = async ({
    formData,
    id,
  }: PayloadForm<ProgramFormType>) => {
    try {
      setLoading(true);
      const { data } = await axios.patch<SingleItemResponseType<Program>>(
        `${API_URL}/${id}`,
        { ...formData }
      );
      if (data.code === SUCCESS_CODE.SUCCESS) {
        successToast("Program updated successfully");

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

  return { superUserUpdatesProgram, loading };
};
