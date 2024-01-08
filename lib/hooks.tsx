import useSWR from "swr";
import { ApiEventsResponse, ApiResultResponse } from "./types";

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
  return { events: result?.events, error, mutate };
};
