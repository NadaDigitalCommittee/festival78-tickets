import useSWR from "swr";
import {
  ApiEventsResponse,
  ApiResultResponse,
  ApiUserResponse,
  Event,
} from "../types";
import { convertEvent } from "../utils";

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
