import useSWR from "swr";
import {
  ApiEventsResponse,
  ApiResultResponse,
  ApiUserResponse,
  Event,
} from "../types";
import { convertEvent } from "../utils";
import { useState } from "react";

export const useRaffles = () => {
  const {
    data: result,
    error,
    mutate,
  } = useSWR<ApiResultResponse>(`/result`, {
    refreshInterval: 1 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { raffles: result?.raffle, error, mutate };
};

export const useEvents = () => {
  const {
    data: result,
    error,
    mutate,
  } = useSWR<ApiEventsResponse>(`/events`, {
    refreshInterval: 1 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const parsed: Event[] | undefined = result?.events.map(convertEvent);
  return { events: parsed, error, mutate };
};

export const useUser = () => {
  const {
    data: result,
    error,
    mutate,
  } = useSWR<ApiUserResponse>(`/user`, {
    refreshInterval: 1 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { user: result, error, mutate };
};

export function useFetch<T>(
  url: string,
  method: "POST" | "PUT" | "GET" | "DELETE",
  onError?: () => void
) {
  const [data, setData] = useState<any | undefined>(undefined);
  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const onFetch = async (body?: T) => {
    setIsFetching(true);
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body && JSON.stringify(body),
      });
      setIsFetching(false);
      setResponse(response);
      const data = await response.json();
      setData(data);
      return { response, data };
    } catch (e) {
      onError?.();
      return { response: undefined, data: undefined };
    }
  };
  return { data, response, onFetch, isFetching };
}
