"use client";
import { Context, FC, ReactNode, createContext } from "react";
import { Session } from "./types";

/* eslint react/display-name: 0 */
const Provider =
  <T extends Context<U>, U = T extends Context<infer U> ? U : never>(
    context: T,
  ): FC<{ value: U; children?: ReactNode }> =>
  ({ children, value }) => (
    <context.Provider value={value}>{children}</context.Provider>
  );

export const SessionContext = createContext<Session | undefined>(undefined);
export const SessionProvider = Provider(SessionContext);
