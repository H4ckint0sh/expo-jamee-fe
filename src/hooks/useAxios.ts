import { useState, useCallback, useContext } from "react";
import axios, { AxiosRequestHeaders, Method } from "axios";

import { AuthContext } from "../context/auth-context";

interface AxiosError extends Error {
  response?: {
    data: any;
    status: number;
    headers: AxiosRequestHeaders;
  };
}

export const useAxios = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const sendRequest = useCallback(
    async (
      url: string,
      method: Method = "GET",
      body?: any,
      headers?: AxiosRequestHeaders,
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios({
          url,
          method,
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": user?.username,
            ...headers,
          },
          data: body ? JSON.stringify(body) : undefined,
        });
        setIsLoading(false);
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        setIsLoading(false);
        throw axiosError;
      }
    },
    [],
  );

  return { isLoading, error, sendRequest };
};
