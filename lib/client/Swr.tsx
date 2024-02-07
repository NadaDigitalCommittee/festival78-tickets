"use client";

import { Api } from "@/lib/types";
import { FC, ReactNode } from "react";
import { SWRConfig } from "swr";

type Props = {
  children: ReactNode;
};

export async function fetcher<T>(
  input: string,
  // eslint-disable-next-line no-undef
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`/api${input}`, init);
  const data = (await res.json()) as Api<{}>;

  if (data.ok === false) {
    throw new Error(res.statusText);
  }
  return data.data as T;
}

export const SWR: FC<Props> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
