import useSWR from "swr";
import {
  ApiEventsResponse,
  ApiNewsResponse,
  ApiResultResponse,
  ApiUserResponse,
  Event,
} from "../types";
import { Time } from "../time";

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
  const parsed: Event[] | undefined = result?.events.map((e) => {
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      time: e.time.map((t) =>
        Time.fromDate(new Date(t.start), new Date(t.end))
      ),
      location: e.place,
      capacity: e.capacity,
    };
  });
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
