"use client";

import { apiBase } from "@/lib/constants";
import { Api } from "@/lib/types";
import { FC } from "react";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

export async function fetcher<T>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${apiBase}${input}`, init);
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
