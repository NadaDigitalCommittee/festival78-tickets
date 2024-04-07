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
  const res = await fetch(`/api${input}`, {
    next: {
      revalidate: 60,
    },
    ...init,
  });
  const data = (await res.json()) as Api<{}>;

  if (data.ok === false) {
    throw new Error(res.statusText);
  }
  return data.data as T;
}

function localStorageProvider() {
  if (typeof window === "undefined") {
    return new Map();
  }
  const map = new Map<any, any>(
    JSON.parse(localStorage.getItem("app-cache") || "[]")
  );

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    if (typeof window === "undefined") return;
    localStorage.setItem("app-cache", appCache);
  });

  return map;
}

export const SWR: FC<Props> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        provider: localStorageProvider,
        // provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );
};
